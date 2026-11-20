import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectsList from "./pages/ProjectsList";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
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
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background-color: #001648; color: #ffffff; }
        a { text-decoration: none; color: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #001035; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 3px; }
        input, select, button { font-family: inherit; }

        .global-bg {
          position: fixed;
          inset: 0;
          z-index: -10;
          background: radial-gradient(circle at 50% 0%, #0c2a72 0%, #001648 45%, #000c28 100%);
          pointer-events: none;
        }
        .hex-pattern {
          position: fixed;
          inset: 0;
          z-index: -9;
          pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.923L0 86.603V51.962l30-17.32 30 17.32v34.641l-30 17.32zM30 0L0 17.32v34.642L30 69.282l30-17.32V17.32L30 0z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E");
          background-size: 60px 103.923px;
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
      `}</style>

      {/* Signature Blue Background & Hexagonal Grid */}
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
        <Route path="/du-an" element={<ProjectsList onOpenOrderModal={handleOpenOrderModal} />} />
        <Route path="/du-an/:slug" element={<ProjectDetail />} />
        <Route path="/ve-chung-toi" element={<AboutUs onOpenOrderModal={handleOpenOrderModal} />} />
        <Route path="/gioi-thieu" element={<AboutUs onOpenOrderModal={handleOpenOrderModal} />} />
        <Route path="/lien-he" element={<Contact onOpenOrderModal={handleOpenOrderModal} />} />
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
