import fs from "fs";
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

export function neonApiMiddleware() {
  const env = loadEnv();
  const dbUrl = env.DATABASE_URL;
  const sql = dbUrl ? neon(dbUrl) : null;

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

  return {
    name: "neon-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url;

        // 1. GET /api/neon/status
        if (url === "/api/neon/status" && req.method === "GET") {
          try {
            let pgStatus = "disconnected";
            let pgVersion = null;
            let totalInquiries = 0;

            if (sql) {
              const pgRes = await sql`SELECT version(), count(*) OVER() as c FROM inquiries LIMIT 1`;
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

            let aiStatus = "configured";
            if (env.NEON_AI_GATEWAY_TOKEN) {
              aiStatus = "connected";
            }

            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: true,
                branch: env.NEON_BRANCH || "production",
                branchId: env.NEON_BRANCH_ID || "br-purple-dream-a118wnr7",
                region: env.AWS_REGION || "ap-southeast-1",
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

        // 2. GET & POST /api/neon/inquiries
        if (url?.startsWith("/api/neon/inquiries")) {
          if (req.method === "GET") {
            try {
              if (!sql) throw new Error("Neon Postgres not configured");
              const rows = await sql`
                SELECT id, name, phone, email, product, quantity, area, topic, status, notes, 
                       TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI') as date
                FROM inquiries
                ORDER BY created_at DESC
                LIMIT 50
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

          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", async () => {
              try {
                if (!sql) throw new Error("Neon Postgres not configured");
                const data = JSON.parse(body);
                const id = data.id || `lead-${Date.now()}`;
                await sql`
                  INSERT INTO inquiries (id, name, phone, email, product, quantity, area, topic, status, notes)
                  VALUES (${id}, ${data.name}, ${data.phone}, ${data.email || null}, ${data.product || null}, 
                          ${data.quantity || 1}, ${data.area || null}, ${data.topic || null}, 
                          ${data.status || 'pending'}, ${data.notes || null})
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

        next();
      });
    },
  };
}
