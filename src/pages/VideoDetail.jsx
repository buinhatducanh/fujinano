import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play, Clock, Video as VideoIcon } from "lucide-react";
import { videos } from "../data/videos";

export default function VideoDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const video = videos.find((v) => v.slug === slug);

  useEffect(() => {
    if (video) {
      document.title = `${video.title} | FUJINANO`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", video.description || video.title);
    }
    window.scrollTo(0, 0);
    return () => {
      document.title = "FUJINANO - Giải Pháp Sơn & Chống Thấm Cao Cấp Công Nghệ Nhật Bản";
    };
  }, [video, slug]);

  if (!video) {
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
          Video không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          to="/video"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "#e60012",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} /> Về Danh Sách Video
        </Link>
      </div>
    );
  }

  const relatedVideos = videos.filter((v) => v.slug !== slug).slice(0, 2);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .vd-hero {
          position: relative;
          width: 100%;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justifyContent: flex-end;
          overflow: hidden;
          padding-top: 100px;
        }
        .vd-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.35);
        }
        .vd-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,5,20,0.2) 0%, rgba(0,5,20,0.92) 100%);
        }
        .vd-hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 32px 48px;
          animation: fadeUp 0.6s ease both;
        }
        .vd-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
        }
        .vd-breadcrumb a { color: inherit; text-decoration: none; transition: color 0.2s; }
        .vd-breadcrumb a:hover { color: rgba(255,255,255,0.85); }

        .vd-hero__title {
          font-family: 'Be Vietnam Pro', 'Montserrat', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 14px;
          word-break: break-word;
        }
        .vd-hero__meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .vd-hero__meta span { display: flex; align-items: center; gap: 5px; }

        .vd-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .vd-columns {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          padding-top: 52px;
          padding-bottom: 72px;
          align-items: start;
        }

        .vd-player-wrap {
          animation: fadeUp 0.7s ease 0.1s both;
          min-width: 0;
        }
        .vd-back-btn {
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
          margin-bottom: 28px;
          transition: color 0.2s, gap 0.2s;
        }
        .vd-back-btn:hover { color: #e60012; gap: 10px; }

        .vd-embed {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          margin-bottom: 28px;
        }
        .vd-embed__inner {
          position: absolute;
          inset: 0;
        }
        .vd-embed__thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }
        .vd-embed__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(0,0,0,0.45);
        }
        .vd-embed__play-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(230,0,18,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 12px rgba(230,0,18,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vd-embed__play-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 0 18px rgba(230,0,18,0.12);
        }
        .vd-embed__label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          text-align: center;
          padding: 0 20px;
        }

        .vd-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 15.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.8;
          margin-bottom: 36px;
        }

        .vd-cta {
          padding: 30px;
          background: rgba(230,0,18,0.08);
          border: 1px solid rgba(230,0,18,0.2);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }
        .vd-cta__title {
          font-family: 'Montserrat', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #fff;
        }
        .vd-cta__desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }
        .vd-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #e60012;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vd-cta__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(230,0,18,0.4); }

        .vd-sidebar {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeUp 0.7s ease 0.2s both;
        }
        .vd-sidebar__card {
          background: rgba(0,11,32,0.7);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 20px;
        }
        .vd-sidebar__heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 14px;
        }
        .vd-related-card {
          display: flex;
          gap: 12px;
          text-decoration: none;
          align-items: flex-start;
          transition: opacity 0.2s;
        }
        .vd-related-card + .vd-related-card { margin-top: 14px; }
        .vd-related-card:hover { opacity: 0.75; }
        .vd-related-card__thumb-wrap {
          position: relative;
          width: 80px;
          height: 56px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .vd-related-card__thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .vd-related-card__play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
        }
        .vd-related-card__title {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .vd-related-card:hover .vd-related-card__title { color: #e60012; }
        .vd-related-card__dur {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .vd-more { padding-bottom: 72px; }
        .vd-more__heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
        }
        .vd-more__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .vd-more-card {
          display: block;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0,11,32,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .vd-more-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }
        .vd-more-card__thumb {
          position: relative;
          padding-top: 52%;
          overflow: hidden;
        }
        .vd-more-card__thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .vd-more-card:hover .vd-more-card__thumb img { transform: scale(1.05); }
        .vd-more-card__play-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
        }
        .vd-more-card__play-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(230,0,18,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .vd-more-card__dur {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.75);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .vd-more-card__body { padding: 14px 16px; }
        .vd-more-card__title {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .vd-columns { grid-template-columns: 1fr; }
          .vd-more__grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="vd-hero">
        <img className="vd-hero__img" src={video.thumbnail} alt={video.title} />
        <div className="vd-hero__overlay" />
        <div className="vd-hero__inner">
          <div className="vd-breadcrumb">
            <Link to="/">Trang Chủ</Link>
            <span>/</span>
            <Link to="/video">Video</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{video.title}</span>
          </div>

          <h1 className="vd-hero__title">{video.title}</h1>

          <div className="vd-hero__meta">
            <span>
              <Clock size={13} /> {video.duration}
            </span>
            <span>
              <VideoIcon size={13} /> Video thực tế
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="vd-body">
        <div className="vd-columns">
          {/* Player & Content */}
          <div className="vd-player-wrap">
            <button className="vd-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Quay lại
            </button>

            {/* Video Player Box */}
            <div className="vd-embed">
              <div className="vd-embed__inner">
                <img
                  className="vd-embed__thumb"
                  src={video.thumbnail}
                  alt={video.title}
                />
                <div className="vd-embed__overlay">
                  <div className="vd-embed__play-btn">
                    <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: "4px" }} />
                  </div>
                  <div className="vd-embed__label">{video.title}</div>
                </div>
              </div>
            </div>

            <p className="vd-desc">{video.description}</p>

            {/* CTA */}
            <div className="vd-cta">
              <div className="vd-cta__title">Bạn cần thi công giải pháp tương tự?</div>
              <p className="vd-cta__desc">
                FUJINANO cung cấp dịch vụ khảo sát và báo giá miễn phí trong 2 giờ. Liên hệ ngay để nhận phương án thi công tối ưu nhất.
              </p>
              <a href="/#quote" className="vd-cta__btn">
                Nhận Báo Giá Miễn Phí <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="vd-sidebar">
            <div className="vd-sidebar__card">
              <p className="vd-sidebar__heading">Video Liên Quan</p>
              {relatedVideos.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/video/${rel.slug}`}
                  className="vd-related-card"
                >
                  <div className="vd-related-card__thumb-wrap">
                    <img src={rel.thumbnail} alt={rel.title} />
                    <div className="vd-related-card__play">
                      <Play size={16} color="#fff" fill="#fff" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                  <div>
                    <p className="vd-related-card__title">{rel.title}</p>
                    <span className="vd-related-card__dur">
                      <Clock size={10} /> {rel.duration}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* More Videos */}
        <div className="vd-more">
          <p className="vd-more__heading">Video Khác</p>
          <div className="vd-more__grid">
            {relatedVideos.map((item) => (
              <Link
                key={item.slug}
                to={`/video/${item.slug}`}
                className="vd-more-card"
              >
                <div className="vd-more-card__thumb">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="vd-more-card__play-icon">
                    <div className="vd-more-card__play-circle">
                      <Play size={22} color="#fff" fill="#fff" style={{ marginLeft: "3px" }} />
                    </div>
                  </div>
                  <span className="vd-more-card__dur">{item.duration}</span>
                </div>
                <div className="vd-more-card__body">
                  <p className="vd-more-card__title">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
