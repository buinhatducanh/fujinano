import { neon } from "@neondatabase/serverless";
import fs from "fs";

// Read DATABASE_URL from .env.local
const envContent = fs.readFileSync(".env.local", "utf8");
const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
if (!dbUrlMatch) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const dbUrl = dbUrlMatch[1];
const sql = neon(dbUrl);

async function migrate() {
  console.log("Creating tables in Neon Lakebase Postgres...");

  // 1. Table inquiries (Khách hàng yêu cầu báo giá / leads)
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      product VARCHAR(255),
      quantity INTEGER DEFAULT 1,
      area VARCHAR(100),
      topic VARCHAR(255),
      status VARCHAR(50) DEFAULT 'pending',
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'inquiries' created / verified");

  // 2. Table site_settings (Thông tin doanh nghiệp & liên hệ)
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key VARCHAR(100) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'site_settings' created / verified");

  // 3. Table products (Danh mục thùng sơn)
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name TEXT NOT NULL,
      short_name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      category_name VARCHAR(255) NOT NULL,
      price NUMERIC NOT NULL,
      original_price NUMERIC,
      discount INTEGER DEFAULT 0,
      stock INTEGER DEFAULT 100,
      images JSONB,
      volumes JSONB,
      colors JSONB,
      specs JSONB,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'products' created / verified");

  // 4. Table articles (Bài viết chuẩn SEO)
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      slug VARCHAR(255) PRIMARY KEY,
      title TEXT NOT NULL,
      focus_keyword VARCHAR(255),
      meta_title VARCHAR(255),
      meta_description TEXT,
      tag VARCHAR(100),
      tag_color VARCHAR(50),
      img TEXT,
      excerpt TEXT,
      content TEXT,
      read_time VARCHAR(50),
      status VARCHAR(50) DEFAULT 'published',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'articles' created / verified");

  // Seed sample inquiry if empty
  const existingInquiries = await sql`SELECT count(*) FROM inquiries`;
  if (parseInt(existingInquiries[0].count) === 0) {
    await sql`
      INSERT INTO inquiries (id, name, phone, email, product, quantity, topic, status, notes)
      VALUES 
      ('lead-1', 'Trần Văn Hưng (KCN Trà Nóc)', '0918.452.889', 'hungtran.xd@gmail.com', 'Sơn Epoxy Tự San Phẳng 18L', 30, 'Báo giá sỉ dự án nhà xưởng', 'pending', 'Cần bảng mã màu xám ghi #7035 test sơn.'),
      ('lead-2', 'Nguyễn Thị Ngọc (Chủ Xưởng Thốt Nốt)', '0939.812.345', 'ngoc.seafood@gmail.com', 'Sơn Chống Thấm Polyurethane PU 18L', 12, 'Chống thấm sàn mái', 'contacted', 'Đã tư vấn định mức 1.5kg/m2.')
    `;
    console.log("✓ Seeded sample inquiries into Neon Postgres");
  }

  // Count check
  const countRes = await sql`SELECT count(*) as total_inquiries FROM inquiries`;
  console.log("Total inquiries in Neon Postgres:", countRes[0].total_inquiries);
}

migrate()
  .then(() => {
    console.log("Neon Postgres migration completed successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
