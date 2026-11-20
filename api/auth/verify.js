import { verifyAdminAuth } from "../_lib.js";

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
    res.status(401).json({
      success: false,
      error: "Phiên đăng nhập hết hạn hoặc không hợp lệ",
    });
    return;
  }

  res.status(200).json({
    success: true,
    user: authUser,
  });
}
