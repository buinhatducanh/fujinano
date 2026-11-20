import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH,
  JWT_SECRET,
  parseBody,
  logAudit,
} from "../_lib.js";

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Phương thức không được hỗ trợ" });
    return;
  }

  try {
    const body = parseBody(req);
    const username = (body.username || "").trim();
    const password = body.password || "";
    const rememberMe = Boolean(body.rememberMe);

    // Kiểm tra tên đăng nhập
    const isUserValid = username === ADMIN_USERNAME;

    // Kiểm tra mật khẩu (hỗ trợ cả fujnano@123, fujinano@123 và hash lưu trữ)
    let isPasswordValid = false;
    if (isUserValid) {
      if (password === "fujnano@123" || password === "fujinano@123") {
        isPasswordValid = true;
      } else if (ADMIN_PASSWORD_HASH) {
        try {
          isPasswordValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
        } catch {
          isPasswordValid = false;
        }
      }
    }

    if (!isUserValid || !isPasswordValid) {
      await logAudit("LOGIN_FAILED", username || "unknown", req, {
        reason: !isUserValid ? "Sai username" : "Sai mật khẩu",
      });

      res.status(401).json({
        success: false,
        error: "Tên đăng nhập hoặc mật khẩu không chính xác!",
      });
      return;
    }

    // Đăng nhập thành công -> Ký Token JWT
    const token = jwt.sign(
      {
        role: "admin",
        username: ADMIN_USERNAME,
        iss: "fujinano-auth",
      },
      JWT_SECRET,
      { expiresIn: rememberMe ? "7d" : "24h" }
    );

    await logAudit("LOGIN_SUCCESS", ADMIN_USERNAME, req, { rememberMe });

    res.status(200).json({
      success: true,
      token,
      user: { username: ADMIN_USERNAME, role: "admin" },
      expiresIn: rememberMe ? 604800 : 86400,
    });
  } catch (error) {
    console.error("Auth login error:", error);
    res.status(500).json({
      success: false,
      error: "Lỗi xử lý xác thực từ máy chủ",
    });
  }
}
