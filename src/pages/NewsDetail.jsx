import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { newsArticles } from "../data/news";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = newsArticles.find((n) => n.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | FUJINANO`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", article.excerpt);
    }
    window.scrollTo(0, 0);
    return () => {
      document.title = "FUJINANO - Giải Pháp Sơn & Chống Thấm Cao Cấp Công Nghệ Nhật Bản";
    };
  }, [article, slug]);

  if (!article) {
    return (
      <div
        style={{
          paddingTop: "140px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          404
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px" }}>
          Bài viết không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          to="/tin-tuc"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "#0055cc",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} /> Về Danh Sách Bài Viết
        </Link>
      </div>
    );
  }

  const relatedArticles = newsArticles.filter((n) => n.slug !== slug).slice(0, 2);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .blog-hero {
          position: relative;
          width: 100%;
          min-height: 420px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justifyContent: flex-end;
          padding-top: 100px;
        }
        .blog-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.4);
        }
        .blog-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,10,40,0.2) 0%, rgba(0,10,40,0.88) 100%);
        }
        .blog-hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 32px 48px;
          animation: fadeUp 0.6s ease both;
        }

        .blog-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
        }
        .blog-breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .blog-breadcrumb a:hover { color: rgba(255,255,255,0.85); }

        .blog-hero__tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }

        .blog-hero__title {
          font-family: 'Montserrat', sans-serif;
          font-size: 38px;
          fontWeight: 800;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 14px;
          word-break: break-word;
        }
        .blog-hero__meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .blog-hero__meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .blog-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .blog-columns {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          padding-top: 56px;
          padding-bottom: 80px;
          align-items: start;
        }

        .blog-article {
          animation: fadeUp 0.7s ease 0.1s both;
          min-width: 0;
        }
        .blog-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 32px;
          transition: color 0.2s, gap 0.2s;
        }
        .blog-back-btn:hover { color: #0055cc; gap: 10px; }

        .blog-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
          margin-bottom: 36px;
        }

        .blog-detail-content h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 32px 0 12px;
        }
        .blog-detail-content p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.85;
          margin-bottom: 14px;
        }
        .blog-detail-content ul {
          padding-left: 22px;
          margin-bottom: 16px;
        }
        .blog-detail-content li {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .blog-detail-content strong { color: #fff; font-weight: 700; }

        .blog-cta {
          margin-top: 48px;
          padding: 32px;
          background: rgba(0,85,204,0.1);
          border: 1px solid rgba(0,85,204,0.25);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
        }
        .blog-cta__title {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
        }
        .blog-cta__desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }
        .blog-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #e60012;
          color: #fff;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }
        .blog-cta__btn:hover {
          background: #cc0010;
          transform: translateY(-2px);
        }

        .blog-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .blog-sidebar__card {
          background: rgba(0, 11, 32, 0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
        }
        .blog-sidebar__heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 18px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .related-card {
          display: flex;
          gap: 12px;
          text-decoration: none;
          align-items: center;
          transition: transform 0.2s;
        }
        .related-card:hover { transform: translateX(4px); }
        .related-card__img {
          width: 68px;
          height: 68px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .related-card__title {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .related-card__time {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.4);
        }
        .blog-tag-chip {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .blog-more-grid {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .blog-more-grid__heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 24px;
        }
        .blog-more-grid__cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .blog-more-card {
          display: flex;
          gap: 16px;
          background: rgba(0, 11, 32, 0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s, border-color 0.2s;
        }
        .blog-more-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0,85,204,0.4);
        }
        .blog-more-card img {
          width: 120px;
          height: 90px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .blog-more-card__body {
          padding: 12px 14px 12px 0;
          display: flex;
          flex-direction: column;
          justifyContent: center;
        }
        .blog-more-card__tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .blog-more-card__title {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .blog-columns {
            grid-template-columns: 1fr;
          }
          .blog-more-grid__cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Banner */}
      <div className="blog-hero">
        <img className="blog-hero__img" src={article.img} alt={article.title} />
        <div className="blog-hero__overlay" />
        <div className="blog-hero__inner">
          <div className="blog-breadcrumb">
            <Link to="/">Trang Chủ</Link>
            <span>/</span>
            <Link to="/tin-tuc">Tin Tức</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{article.title}</span>
          </div>

          <div
            className="blog-hero__tag"
            style={{
              background: `${article.tagColor}22`,
              color: article.tagColor,
              border: `1px solid ${article.tagColor}44`,
            }}
          >
            <Tag size={10} /> {article.tag}
          </div>

          <h1 className="blog-hero__title">{article.title}</h1>

          <div className="blog-hero__meta">
            <span>
              <Calendar size={13} /> {article.date}
            </span>
            <span>
              <Clock size={13} /> {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="blog-body">
        <div className="blog-columns">
          {/* Article */}
          <article className="blog-article">
            <button className="blog-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Quay lại
            </button>

            <div
              className="blog-excerpt"
              style={{
                background: `${article.tagColor}10`,
                borderLeft: `4px solid ${article.tagColor}`,
              }}
            >
              {article.excerpt}
            </div>

            <div
              className="blog-detail-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA Box */}
            <div className="blog-cta">
              <div className="blog-cta__title">Bạn cần tư vấn giải pháp cho công trình?</div>
              <p className="blog-cta__desc">
                FUJINANO cung cấp dịch vụ khảo sát và báo giá miễn phí tận nơi trên toàn quốc. Đội ngũ chuyên gia kỹ thuật sẵn sàng hỗ trợ 24/7.
              </p>
              <a href="/#quote" className="blog-cta__btn">
                Nhận Báo Giá Ngay <ArrowRight size={15} />
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="blog-sidebar__card">
              <p className="blog-sidebar__heading">Bài Viết Liên Quan</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/tin-tuc/${rel.slug}`}
                    className="related-card"
                  >
                    <img className="related-card__img" src={rel.img} alt={rel.title} />
                    <div>
                      <p className="related-card__title">{rel.title}</p>
                      <span className="related-card__time">{rel.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="blog-sidebar__card">
              <p className="blog-sidebar__heading">Danh Mục</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {newsArticles.map((item) => (
                  <span
                    key={item.tag}
                    className="blog-tag-chip"
                    style={{
                      background: `${item.tagColor}15`,
                      color: item.tagColor,
                      border: `1px solid ${item.tagColor}30`,
                    }}
                  >
                    {item.tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* More Articles */}
        <div className="blog-more-grid">
          <p className="blog-more-grid__heading">Bài Viết Khác</p>
          <div className="blog-more-grid__cards">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/tin-tuc/${item.slug}`}
                className="blog-more-card"
              >
                <img src={item.img} alt={item.title} />
                <div className="blog-more-card__body">
                  <div
                    className="blog-more-card__tag"
                    style={{
                      color: item.tagColor,
                    }}
                  >
                    <Tag size={9} /> {item.tag}
                  </div>
                  <p className="blog-more-card__title">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
