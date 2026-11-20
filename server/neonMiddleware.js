import fs from "fs";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { neon } from "@neondatabase/serverless";
import { S3Client, ListBucketsCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

function loadEnv() {
  const env = {};
  if (fs.existsSync(".env.local")) {
    const content = fs.readFileSync(".env.local", "utf8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
      }
    });
  }
  return env;
}

// In-Memory Rate Limiters (Anti-Brute-Force & Anti-Spam)
const loginAttempts = new Map(); // ip -> { count, lockedUntil }
const inquiryAttempts = new Map(); // ip -> { count, resetAt }

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "127.0.0.1";
}

function sanitizeText(str, maxLen = 255) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, maxLen);
}

export function neonApiMiddleware() {
  const env = loadEnv();
  const dbUrl = env.DATABASE_URL;
  const sql = dbUrl ? neon(dbUrl) : null;
  const jwtSecret = env.JWT_SECRET || "fujinano_default_secret_jwt_key_2026";
  const adminUsername = env.ADMIN_USERNAME || "admin";
  const adminPasswordHash =
    env.ADMIN_PASSWORD_HASH ||
    bcrypt.hashSync("fujnano@123", 10); // Default hash for fujnano@123

  const s3 = env.AWS_ENDPOINT_URL_S3
    ? new S3Client({
        region: env.AWS_REGION || "ap-southeast-1",
        endpoint: env.AWS_ENDPOINT_URL_S3,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true,
      })
    : null;

  async function logAudit(action, actor, req, details = {}) {
    if (!sql) return;
    try {
      const id = `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      const ip = getClientIp(req);
      const userAgent = req.headers["user-agent"] || "";
      await sql`
        INSERT INTO audit_logs (id, action, actor, ip_address, user_agent, details)
        VALUES (${id}, ${action}, ${actor}, ${ip}, ${userAgent}, ${JSON.stringify(details)})
      `;
    } catch (e) {
      console.warn("Audit logging warning:", e.message);
    }
  }

  function verifyAdminAuth(req) {
    const authHeader = req.headers["authorization"] || "";
    if (!authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7);
    try {
      return jwt.verify(token, jwtSecret);
    } catch {
      return null;
    }
  }

  return {
    name: "neon-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url;
        const ip = getClientIp(req);

        // ===================================================================
        // 1. INJECT HTTP SECURITY HEADERS ON EVERY RESPONSE
        // ===================================================================
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

        // ===================================================================
        // 2. AUTHENTICATION APIS (SERVER-SIDE VERIFICATION & BRUTE-FORCE SHIELD)
        // ===================================================================
        
        // POST /api/auth/login
        if (url === "/api/auth/login" && req.method === "POST") {
          // Check Brute-Force Lockout
          const now = Date.now();
          const attemptInfo = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
          if (attemptInfo.lockedUntil > now) {
            const minutesLeft = Math.ceil((attemptInfo.lockedUntil - now) / 60000);
            res.statusCode = 429;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                error: `Tài khoản tạm thời bị khóa do thử sai quá nhiều lần. Vui lòng thử lại sau ${minutesLeft} phút.`,
              })
            );
            return;
          }

          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { username, password, rememberMe } = JSON.parse(body || "{}");

              const isUserValid = username?.trim() === adminUsername;
              const isPasswordValid = isUserValid && bcrypt.compareSync(password || "", adminPasswordHash);

              if (!isPasswordValid) {
                // Record failed attempt
                attemptInfo.count += 1;
                if (attemptInfo.count >= 5) {
                  attemptInfo.lockedUntil = now + 15 * 60 * 1000; // Lock 15 mins
                }
                loginAttempts.set(ip, attemptInfo);

                await logAudit("LOGIN_FAILED", username || "unknown", req, {
                  attempts: attemptInfo.count,
                  locked: attemptInfo.count >= 5,
                });

                res.statusCode = 401;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    success: false,
                    error: "Tên đăng nhập hoặc mật khẩu không chính xác!",
                    remainingAttempts: Math.max(0, 5 - attemptInfo.count),
                  })
                );
                return;
              }

              // Login Success: Reset attempts & Issue JWT
              loginAttempts.delete(ip);

              const token = jwt.sign(
                {
                  role: "admin",
                  username: adminUsername,
                  iss: "fujinano-auth",
                },
                jwtSecret,
                { expiresIn: rememberMe ? "7d" : "24h" }
              );

              await logAudit("LOGIN_SUCCESS", adminUsername, req, { rememberMe });

              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: true,
                  token,
                  user: { username: adminUsername, role: "admin" },
                  expiresIn: rememberMe ? 604800 : 86400,
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: "Yêu cầu không hợp lệ" }));
            }
          });
          return;
        }

        // GET /api/auth/verify
        if (url === "/api/auth/verify" && req.method === "GET") {
          const authUser = verifyAdminAuth(req);
          if (!authUser) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Phiên đăng nhập hết hạn hoặc không hợp lệ" }));
            return;
          }

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true, user: authUser }));
          return;
        }

        // ===================================================================
        // 3. SYSTEM TELEMETRY (GET /api/neon/status)
        // ===================================================================
        if (url === "/api/neon/status" && req.method === "GET") {
          try {
            let pgStatus = "disconnected";
            let pgVersion = null;
            let totalInquiries = 0;

            if (sql) {
              const pgRes = await sql`SELECT version() LIMIT 1`;
              pgStatus = "connected";
              pgVersion = pgRes[0]?.version || "Postgres 18.7";
              const countRes = await sql`SELECT count(*) as total FROM inquiries`;
              totalInquiries = parseInt(countRes[0]?.total || 0);
            }

            let s3Status = "disconnected";
            let buckets = [];
            if (s3) {
              const s3Res = await s3.send(new ListBucketsCommand({}));
              s3Status = "connected";
              buckets = s3Res.Buckets?.map((b) => b.Name) || [];
            }

            let aiStatus = env.NEON_AI_GATEWAY_TOKEN ? "connected" : "configured";

            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: true,
                branch: env.NEON_BRANCH || "production",
                branchId: env.NEON_BRANCH_ID || "br-purple-dream-a118wnr7",
                region: env.AWS_REGION || "ap-southeast-1",
                security: {
                  ssl: "require",
                  authGuard: "active",
                  rateLimiter: "active",
                  bruteForceShield: "active",
                },
                postgres: {
                  status: pgStatus,
                  version: pgVersion,
                  inquiriesCount: totalInquiries,
                },
                objectStorage: {
                  status: s3Status,
                  buckets,
                  endpoint: env.AWS_ENDPOINT_URL_S3,
                },
                aiGateway: {
                  status: aiStatus,
                  baseUrl: env.NEON_AI_GATEWAY_BASE_URL,
                },
              })
            );
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        // ===================================================================
        // 4. LEADS & INQUIRIES APIS (WITH STRICT RBAC & ANTI-SPAM)
        // ===================================================================
        if (url?.startsWith("/api/neon/inquiries")) {
          // GET /api/neon/inquiries -> REQUIRES ADMIN AUTH (CHỐNG LỘ DỮ LIỆU KHÁCH)
          if (req.method === "GET") {
            const authUser = verifyAdminAuth(req);
            if (!authUser) {
              res.statusCode = 401;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  error: "Yêu cầu quyền quản trị viên (Thiếu Bearer Token hợp lệ)",
                })
              );
              return;
            }

            try {
              if (!sql) throw new Error("Neon Postgres chưa được kết nối");
              const rows = await sql`
                SELECT id, name, phone, email, product, quantity, area, topic, status, notes, 
                       TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI') as date
                FROM inquiries
                ORDER BY created_at DESC
                LIMIT 100
              `;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, data: rows }));
              return;
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: err.message }));
              return;
            }
          }

          // POST /api/neon/inquiries -> PUBLIC FOR LEADS OR ADMIN FOR STATUS UPDATES
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", async () => {
              try {
                if (!sql) throw new Error("Neon Postgres chưa được kết nối");
                const data = JSON.parse(body || "{}");

                // Check if this is an Admin updating lead status
                const authUser = verifyAdminAuth(req);
                if (data.status && authUser) {
                  await sql`
                    UPDATE inquiries
                    SET status = ${data.status},
                        notes = COALESCE(${data.notes}, notes)
                    WHERE id = ${data.id}
                  `;
                  await logAudit("LEAD_STATUS_UPDATED", authUser.username, req, {
                    leadId: data.id,
                    newStatus: data.status,
                  });
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, message: "Đã cập nhật trạng thái đơn" }));
                  return;
                }

                // Public Client Lead Submission -> Anti-Spam Rate Limit
                const now = Date.now();
                const clientRate = inquiryAttempts.get(ip) || { count: 0, resetAt: now + 5 * 60 * 1000 };
                if (clientRate.resetAt < now) {
                  clientRate.count = 0;
                  clientRate.resetAt = now + 5 * 60 * 1000;
                }
                clientRate.count += 1;
                inquiryAttempts.set(ip, clientRate);

                if (clientRate.count > 10) {
                  res.statusCode = 429;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: false, error: "Gửi quá thường xuyên. Vui lòng thử lại sau 5 phút." }));
                  return;
                }

                // Honeypot bot protection
                if (data.website_trap || data.honeypot) {
                  // Bot detected -> Silently discard
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true }));
                  return;
                }

                // Strict Input Sanitization
                const cleanName = sanitizeText(data.name, 100);
                const cleanPhone = sanitizeText(data.phone, 30);
                const cleanEmail = sanitizeText(data.email, 100);
                const cleanProduct = sanitizeText(data.product, 200);
                const cleanTopic = sanitizeText(data.topic, 200);
                const cleanNotes = sanitizeText(data.notes, 1000);
                const cleanArea = sanitizeText(data.area, 50);
                const qty = Math.max(1, Math.min(10000, parseInt(data.quantity) || 1));

                if (!cleanName || !cleanPhone) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: false, error: "Họ tên và Số điện thoại không được để trống" }));
                  return;
                }

                const id = data.id || `lead-${Date.now()}`;
                await sql`
                  INSERT INTO inquiries (id, name, phone, email, product, quantity, area, topic, status, notes)
                  VALUES (${id}, ${cleanName}, ${cleanPhone}, ${cleanEmail || null}, ${cleanProduct || null}, 
                          ${qty}, ${cleanArea || null}, ${cleanTopic || null}, 
                          'pending', ${cleanNotes || null})
                  ON CONFLICT (id) DO UPDATE SET
                    status = EXCLUDED.status,
                    notes = EXCLUDED.notes
                `;

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true, id }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
        }

        // ===================================================================
        // 5. AUDIT LOGS API (GET /api/neon/audit-logs -> REQUIRES ADMIN AUTH)
        // ===================================================================
        if (url === "/api/neon/audit-logs" && req.method === "GET") {
          const authUser = verifyAdminAuth(req);
          if (!authUser) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Yêu cầu quyền quản trị viên" }));
            return;
          }

          try {
            if (!sql) throw new Error("Neon Postgres chưa được kết nối");
            const logs = await sql`
              SELECT id, action, actor, ip_address, details,
                     TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI:SS') as timestamp
              FROM audit_logs
              ORDER BY created_at DESC
              LIMIT 40
            `;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, data: logs }));
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        next();
      });
    },
  };
}
