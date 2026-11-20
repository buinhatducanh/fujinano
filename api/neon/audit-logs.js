import { sql, verifyAdminAuth } from "../_lib.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Phương thức không được hỗ trợ" });
    return;
  }

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    res.status(401).json({ success: false, error: "Yêu cầu quyền quản trị viên" });
    return;
  }

  try {
    const logs = await sql`
      SELECT id, action, actor, ip_address, details,
             TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI:SS') as timestamp
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT 40
    `;
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
