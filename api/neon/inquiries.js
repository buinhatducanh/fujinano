import { sql, verifyAdminAuth, logAudit, parseBody } from "../_lib.js";

function sanitize(str, max = 255) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim().slice(0, max);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // GET: Lấy danh sách Leads (Yêu cầu đăng nhập Admin)
  if (req.method === "GET") {
    const authUser = verifyAdminAuth(req);
    if (!authUser) {
      res.status(401).json({
        success: false,
        error: "Yêu cầu quyền quản trị viên (Thiếu Bearer Token hợp lệ)",
      });
      return;
    }

    try {
      const rows = await sql`
        SELECT id, name, phone, email, product, quantity, area, topic, status, notes, 
               TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI') as date
        FROM inquiries
        ORDER BY created_at DESC
        LIMIT 100
      `;
      res.status(200).json({ success: true, data: rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
    return;
  }

  // POST: Khách gửi báo giá HOẶC Admin cập nhật trạng thái
  if (req.method === "POST") {
    try {
      const data = parseBody(req);

      // 1. Trường hợp Admin cập nhật trạng thái
      const authUser = verifyAdminAuth(req);
      if (data.status && authUser && data.id) {
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
        res.status(200).json({ success: true, message: "Đã cập nhật trạng thái" });
        return;
      }

      // 2. Trường hợp Khách hàng gửi form yêu cầu báo giá
      if (data.website_trap || data.honeypot) {
        res.status(200).json({ success: true }); // Chặn bot spam âm thầm
        return;
      }

      const cleanName = sanitize(data.name, 100);
      const cleanPhone = sanitize(data.phone, 30);
      const cleanEmail = sanitize(data.email, 100);
      const cleanProduct = sanitize(data.product, 200);
      const cleanTopic = sanitize(data.topic, 200);
      const cleanNotes = sanitize(data.notes, 1000);
      const cleanArea = sanitize(data.area, 50);
      const qty = Math.max(1, Math.min(10000, parseInt(data.quantity) || 1));

      if (!cleanName || !cleanPhone) {
        res.status(400).json({ success: false, error: "Họ tên và Số điện thoại không được để trống" });
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

      res.status(200).json({ success: true, id });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
    return;
  }

  res.status(405).json({ success: false, error: "Phương thức không được hỗ trợ" });
}
