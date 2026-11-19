import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProjectDetail from "./pages/ProjectDetail";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import VideoList from "./pages/VideoList";
import VideoDetail from "./pages/VideoDetail";
import OrderModal from "./components/OrderModal";

export default function App() {
  const [orderModalData, setOrderModalData] = useState({
    isOpen: false,
    product: null,
    variant: "",
    color: "",
    quantity: 1,
  });

  const handleOpenOrderModal = (product = null, variant = "", color = "", quantity = 1) => {
    setOrderModalData({
      isOpen: true,
      product,
      variant,
      color,
      quantity,
    });
  };

  const handleCloseOrderModal = () => {
    setOrderModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background-color: #001A5C; color: #fff; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #001A5C; }
        ::-webkit-scrollbar-thumb { background: #0055cc; border-radius: 3px; }
        input, select, button { font-family: inherit; }

        .global-bg {
          position: fixed;
          inset: 0;
          z-index: -10;
          background: radial-gradient(circle at 50% 0%, #0044AA 0%, #001A5C 40%, #000E3A 100%);
          pointer-events: none;
        }
        .hex-pattern {
          position: fixed;
          inset: 0;
          z-index: -9;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.923L0 86.603V51.962l30-17.32 30 17.32v34.641l-30 17.32zM30 0L0 17.32v34.642L30 69.282l30-17.32V17.32L30 0z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E");
          background-size: 60px 103.923px;
        }
        .metallic-border {
          border: 1.5px solid transparent;
          background: 
            linear-gradient(rgba(0, 20, 70, 0.75), rgba(0, 20, 70, 0.75)) padding-box,
            linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.05) 20%, rgba(0,85,204,0.4) 50%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0.6) 100%) border-box;
        }

        @media (max-width: 960px) {
          .grid-3 { grid-template-columns: repeat(2,1fr) !important; }
          .grid-4 { grid-template-columns: repeat(2,1fr) !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-footer { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-footer { grid-template-columns: 1fr !important; }
        }
        @keyframes orbMove1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 100px) scale(1.2); }
        }
        @keyframes orbMove2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-80px, -50px) scale(1.1); }
        }
      `}</style>

      {/* Global Background Visuals */}
      <div className="global-bg" />
      <div className="hex-pattern" />

      {/* Header Navigation */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Scroll to hash / top helper */}
      <ScrollToTop />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home onOpenOrderModal={handleOpenOrderModal} />} />
        <Route path="/san-pham/:slug" element={<ProductDetail onOpenOrderModal={handleOpenOrderModal} />} />
        <Route path="/du-an/:slug" element={<ProjectDetail />} />
        <Route
          path="/video"
          element={
            <div style={{ paddingTop: "100px", minHeight: "80vh" }}>
              <VideoList />
            </div>
          }
        />
        <Route path="/video/:slug" element={<VideoDetail />} />
        <Route
          path="/tin-tuc"
          element={
            <div style={{ paddingTop: "100px", minHeight: "80vh" }}>
              <NewsList />
            </div>
          }
        />
        <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
      </Routes>

      {/* Footer */}
      <Footer onOpenOrderModal={handleOpenOrderModal} />

      {/* Shopee-style 2-Method Fast Order / Quotation Modal */}
      <OrderModal
        isOpen={orderModalData.isOpen}
        onClose={handleCloseOrderModal}
        product={orderModalData.product}
        initialVariant={orderModalData.variant}
        initialColor={orderModalData.color}
        initialQuantity={orderModalData.quantity}
      />
    </div>
  );
}
