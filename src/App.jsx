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
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh", background: "#f4f6fa" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background-color: #f4f6fa; color: #0f172a; }
        a { text-decoration: none; color: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e2e8f0; }
        ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 3px; }
        input, select, button { font-family: inherit; }

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
