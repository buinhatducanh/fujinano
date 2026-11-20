import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { neon } from "@neondatabase/serverless";

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_2QYMxeSimy3T@ep-billowing-fire-a1oie27q-pooler.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

export const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fujinano_ultra_secure_jwt_secret_token_key_2026_lakebase_postgres_b2b_cms";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2b$10$Qz8afCgFh4cJstrAwctVm.J7unczujpLJPt.Jr8FqpLv3zwNvE52m";

export const sql = neon(DATABASE_URL);

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "127.0.0.1";
}

export function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function verifyAdminAuth(req) {
  const authHeader = req.headers["authorization"] || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function logAudit(action, actor, req, details = {}) {
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
