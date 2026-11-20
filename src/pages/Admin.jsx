import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  Settings,
  ShieldCheck,
  PhoneCall,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Eye,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
  Layers,
  ChevronRight,
  Filter,
  Check,
  Globe,
  Tag,
  Lock,
  User,
  LogOut,
  EyeOff,
  ShieldAlert,
  Key,
  Database,
  Activity,
  RefreshCw,
  CheckCircle2,
  Server,
  Cpu,
  Video as VideoIcon,
  Film,
  Zap,
  MessageSquare
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Admin() {
  const {
    products,
    categories,
    articles,
    siteSettings,
    policies,
    inquiries,
    videos,
    updateProduct,
    addProduct,
    deleteProduct,
    updateArticle,
    addArticle,
    deleteArticle,
    updateSiteSettings,
    updatePolicies,
    updateInquiryStatus,
    deleteInquiry,
    addVideo,
    updateVideo,
    deleteVideo,
    resetToDefaults,
    neonStatus,
    adminToken,
    setAdminToken,
    fetchInquiriesFromDb,
  } = useAppContext();

  // =========================================================================
  // 0. AUTHENTICATION & SECURITY SHIELD (BẢO MẬT ĐĂNG NHẬP ADMIN)
  // =========================================================================
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(
      localStorage.getItem("fujinano_admin_token") ||
      sessionStorage.getItem("fujinano_admin_token")
    );
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [loginUsername, setLoginUsername] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [remainingAttempts, setRemainingAttempts] = useState(null);

  // Auto-verify existing token on mount with Neon backend
  useEffect(() => {
    const token =
      localStorage.getItem("fujinano_admin_token") ||
      sessionStorage.getItem("fujinano_admin_token");

    if (token) {
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsAuthenticated(true);
            setAdminToken(token);
            fetchInquiriesFromDb(token);
          } else {
            localStorage.removeItem("fujinano_admin_token");
            sessionStorage.removeItem("fujinano_admin_token");
            setAdminToken("");
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          // Keep existing state if network error
        })
        .finally(() => {
          setIsVerifying(false);
        });
    } else {
      setIsVerifying(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminToken(data.token);
        if (rememberMe) {
          localStorage.setItem("fujinano_admin_token", data.token);
          sessionStorage.removeItem("fujinano_admin_token");
        } else {
          sessionStorage.setItem("fujinano_admin_token", data.token);
          localStorage.removeItem("fujinano_admin_token");
        }
        setLoginPassword("");
        setRemainingAttempts(null);
        showToast("✓ Đăng nhập quản trị an toàn thành công!");
        fetchInquiriesFromDb(data.token);
      } else {
        setLoginError(data.error || "Tên đăng nhập hoặc mật khẩu không chính xác!");
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
      }
    } catch (err) {
      setLoginError("Không thể kết nối đến máy chủ bảo mật. Vui lòng kiểm tra lại mạng!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("fujinano_admin_token");
    sessionStorage.removeItem("fujinano_admin_token");
    setAdminToken("");
    setLoginPassword("");
    showToast("Đã đăng xuất an toàn khỏi hệ thống quản trị!");
  };

  // State for Audit Logs tab
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingAuditLogs, setLoadingAuditLogs] = useState(false);
  const [auditAutoRefresh, setAuditAutoRefresh] = useState(true);

  const fetchAuditLogs = async () => {
    const token =
      adminToken ||
      localStorage.getItem("fujinano_admin_token") ||
      sessionStorage.getItem("fujinano_admin_token");
    if (!token) return;
    setLoadingAuditLogs(true);
    try {
      const res = await fetch("/api/neon/audit-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAuditLogs(data.data);
      }
    } catch (err) {
      console.warn("Audit logs fetch failed:", err);
    } finally {
      setLoadingAuditLogs(false);
    }
  };

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | articles | products | settings | policies | inquiries | security
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // =========================================================================
  // 1. STATE & LOGIC CHO QUẢN TRỊ BÀI VIẾT SEO
  // =========================================================================
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleSearch, setArticleSearch] = useState("");
  const [articleForm, setArticleForm] = useState({
    slug: "",
    title: "",
    focusKeyword: "",
    metaTitle: "",
    metaDescription: "",
    tag: "Epoxy",
    tagColor: "#0055cc",
    img: "",
    excerpt: "",
    content: "",
    readTime: "5 phút đọc",
    status: "published",
    date: new Date().toLocaleDateString("vi-VN"),
  });

  const openNewArticleModal = () => {
    setEditingArticle(null);
    setArticleForm({
      slug: "",
      title: "",
      focusKeyword: "",
      metaTitle: "",
      metaDescription: "",
      tag: "Epoxy",
      tagColor: "#0055cc",
      img: "/images/slider/epoxy_floor.png",
      excerpt: "",
      content: "<p>Nội dung chi tiết bài viết chuẩn SEO...</p>",
      readTime: "5 phút đọc",
      status: "published",
      date: new Date().toLocaleDateString("vi-VN"),
    });
    setArticleModalOpen(true);
  };

  const openEditArticleModal = (art) => {
    setEditingArticle(art);
    setArticleForm({
      slug: art.slug || "",
      title: art.title || "",
      focusKeyword: art.focusKeyword || "",
      metaTitle: art.metaTitle || art.title || "",
      metaDescription: art.metaDescription || art.excerpt || "",
      tag: art.tag || "Epoxy",
      tagColor: art.tagColor || "#0055cc",
      img: art.img || "",
      excerpt: art.excerpt || "",
      content: art.content || "",
      readTime: art.readTime || "5 phút đọc",
      status: art.status || "published",
      date: art.date || new Date().toLocaleDateString("vi-VN"),
    });
    setArticleModalOpen(true);
  };

  // Tự động tạo slug và meta tags khi nhập tiêu đề
  const handleTitleChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setArticleForm((prev) => ({
      ...prev,
      title: val,
      slug: editingArticle ? prev.slug : autoSlug,
      metaTitle: prev.metaTitle === prev.title || !prev.metaTitle ? `${val} | FUJINANO` : prev.metaTitle,
    }));
  };

  // SEO Score Analyzer
  const seoAnalysis = useMemo(() => {
    const kw = (articleForm.focusKeyword || "").toLowerCase().trim();
    const title = (articleForm.title || "").toLowerCase();
    const metaTitle = (articleForm.metaTitle || "").toLowerCase();
    const metaDesc = (articleForm.metaDescription || "").toLowerCase();
    const slug = (articleForm.slug || "").toLowerCase();
    const content = (articleForm.content || "").toLowerCase();
    const wordCount = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;

    const checks = [
      {
        id: "keyword_exists",
        label: "Đã thiết lập Từ Khóa Chính (Focus Keyword)",
        passed: Boolean(kw),
        weight: 15,
        tip: "Nhập từ khóa trọng tâm mà khách hàng hay tìm kiếm trên Google (Ví dụ: 'sơn epoxy sàn xưởng').",
      },
      {
        id: "keyword_in_meta_title",
        label: "Từ khóa xuất hiện trong Thẻ Tiêu Đề SEO (Meta Title)",
        passed: kw ? metaTitle.includes(kw) : false,
        weight: 20,
        tip: "Thẻ Title nên chứa chính xác từ khóa chính, tốt nhất ở phần đầu câu.",
      },
      {
        id: "meta_title_length",
        label: "Độ dài Meta Title chuẩn Google (45 - 65 ký tự)",
        passed: (articleForm.metaTitle || "").length >= 40 && (articleForm.metaTitle || "").length <= 70,
        weight: 15,
        tip: `Hiện tại: ${(articleForm.metaTitle || "").length} ký tự. Google hiển thị tối ưu từ 50-60 ký tự.`,
      },
      {
        id: "keyword_in_meta_desc",
        label: "Từ khóa xuất hiện trong Thẻ Mô Tả (Meta Description)",
        passed: kw ? metaDesc.includes(kw) : false,
        weight: 15,
        tip: "Thẻ Meta Description cần chứa từ khóa để kích thích khách hàng bấm vào bài viết trên Google.",
      },
      {
        id: "meta_desc_length",
        label: "Độ dài Meta Description chuẩn Google (120 - 165 ký tự)",
        passed: (articleForm.metaDescription || "").length >= 110 && (articleForm.metaDescription || "").length <= 170,
        weight: 15,
        tip: `Hiện tại: ${(articleForm.metaDescription || "").length} ký tự. Chuẩn nhất từ 130-160 ký tự.`,
      },
      {
        id: "keyword_in_slug",
        label: "Từ khóa có trong đường dẫn URL (Slug)",
        passed: kw ? slug.includes(kw.replace(/\s+/g, "-")) : false,
        weight: 10,
        tip: "URL ngắn gọn, chứa từ khóa không dấu nối bằng dấu gạch ngang (-).",
      },
      {
        id: "content_length",
        label: "Nội dung bài viết đạt độ dài tối thiểu (> 250 từ)",
        passed: wordCount >= 200,
        weight: 10,
        tip: `Hiện tại: ~${wordCount} từ. Bài viết kỹ thuật chuyên sâu nên đạt trên 500 từ để xếp hạng tốt.`,
      },
    ];

    const score = checks.reduce((acc, curr) => acc + (curr.passed ? curr.weight : 0), 0);
    return { score, checks, wordCount };
  }, [articleForm]);

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.slug) {
      alert("Vui lòng điền tiêu đề và đường dẫn (slug) bài viết");
      return;
    }

    if (editingArticle) {
      updateArticle(editingArticle.slug, articleForm);
      showToast("✓ Đã cập nhật bài viết chuẩn SEO thành công!");
    } else {
      // Check trùng slug
      if (articles.some((a) => a.slug === articleForm.slug)) {
        alert("Đường dẫn (slug) này đã tồn tại, vui lòng chọn slug khác!");
        return;
      }
      addArticle(articleForm);
      showToast("✓ Đã thêm bài viết mới chuẩn SEO vào hệ thống!");
    }
    setArticleModalOpen(false);
  };

  const handleDeleteArticle = (slug, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      deleteArticle(slug);
      showToast("✓ Đã xóa bài viết khỏi hệ thống!");
    }
  };

  // =========================================================================
  // 2. STATE & LOGIC CHO QUẢN TRỊ SẢN PHẨM
  // =========================================================================
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [productForm, setProductForm] = useState({
    id: "",
    shortName: "",
    name: "",
    category: "epoxy",
    categoryName: "Sơn Epoxy Sàn",
    price: 0,
    originalPrice: 0,
    stock: 100,
    rating: 5.0,
    reviewsCount: 100,
    soldCount: "1.2k",
    flashSale: false,
    images: [],
    specs: {},
    description: "",
  });

  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      ...prod,
      specs: prod.specs || {},
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.shortName || !productForm.price) {
      alert("Vui lòng nhập tên ngắn và giá bán của sản phẩm");
      return;
    }

    const calculatedDiscount = productForm.originalPrice > productForm.price
      ? Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100)
      : 0;

    const updated = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice),
      stock: Number(productForm.stock),
      discount: calculatedDiscount,
    };

    updateProduct(editingProduct.id, updated);
    showToast(`✓ Đã cập nhật giá và thông tin thùng sơn "${productForm.shortName}"!`);
    setProductModalOpen(false);
  };

  // =========================================================================
  // 3. STATE CHO THÔNG TIN DOANH NGHIỆP & LIÊN HỆ
  // =========================================================================
  const [siteForm, setSiteForm] = useState(siteSettings);
  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(siteForm);
    showToast("✓ Đã lưu thông tin liên hệ và doanh nghiệp thành công!");
  };

  // =========================================================================
  // 4. STATE CHO CHÍNH SÁCH & BẢO HÀNH
  // =========================================================================
  const [policyForm, setPolicyForm] = useState(policies);
  const handleSavePolicies = (e) => {
    e.preventDefault();
    updatePolicies(policyForm);
    showToast("✓ Đã cập nhật chính sách bảo hành & đổi trả trên toàn hệ thống!");
  };

  // =========================================================================
  // 4b. STATE & LOGIC CHO QUẢN TRỊ VIDEO & YOUTUBE SHORTS
  // =========================================================================
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoSearch, setVideoSearch] = useState("");
  const [videoTypeFilter, setVideoTypeFilter] = useState("all");
  const [videoForm, setVideoForm] = useState({
    title: "",
    type: "horizontal",
    youtubeUrl: "",
    youtubeId: "",
    thumbnail: "",
    duration: "03:30",
    category: "Sơn Sàn Epoxy",
    views: "1.2K",
    author: "Kỹ Sư Fuji Nano",
    description: "",
  });

  const parseYoutubeUrl = (url) => {
    if (!url) return { id: "", type: "horizontal" };
    let id = "";
    let type = "horizontal";

    if (url.includes("/shorts/")) {
      type = "short";
      const match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
      if (match) id = match[1];
    } else if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (match) id = match[1];
    } else if (url.includes("watch?v=")) {
      const match = url.match(/v=([a-zA-Z0-9_-]+)/);
      if (match) id = match[1];
    } else if (url.includes("/embed/")) {
      const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
      if (match) id = match[1];
    } else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
      id = url.trim();
    }

    return { id, type };
  };

  const handleYoutubeUrlChange = (val) => {
    const { id, type } = parseYoutubeUrl(val);
    setVideoForm((prev) => ({
      ...prev,
      youtubeUrl: val,
      youtubeId: id || prev.youtubeId,
      type: type || prev.type,
      thumbnail: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : prev.thumbnail,
    }));
  };

  const openNewVideoModal = () => {
    setEditingVideo(null);
    setVideoForm({
      title: "",
      type: "horizontal",
      youtubeUrl: "",
      youtubeId: "",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      duration: "03:30",
      category: "Sơn Sàn Epoxy",
      views: "1.2K",
      author: "Kỹ Sư Fuji Nano",
      description: "",
    });
    setVideoModalOpen(true);
  };

  const openEditVideoModal = (vid) => {
    setEditingVideo(vid);
    setVideoForm({
      title: vid.title || "",
      type: vid.type || "horizontal",
      youtubeUrl: vid.youtubeUrl || (vid.youtubeId ? `https://www.youtube.com/watch?v=${vid.youtubeId}` : ""),
      youtubeId: vid.youtubeId || "",
      thumbnail: vid.thumbnail || "",
      duration: vid.duration || "03:30",
      category: vid.category || "Sơn Sàn Epoxy",
      views: vid.views || "1.2K",
      author: vid.author || "Kỹ Sư Fuji Nano",
      description: vid.description || "",
    });
    setVideoModalOpen(true);
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoForm.title.trim()) {
      alert("Vui lòng nhập tiêu đề video!");
      return;
    }
    const slug = videoForm.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const vidPayload = {
      ...videoForm,
      id: editingVideo ? editingVideo.id : `vid-${Date.now()}`,
      slug: editingVideo ? editingVideo.slug : slug,
      date: editingVideo ? editingVideo.date : new Date().toLocaleDateString("vi-VN"),
    };

    if (editingVideo) {
      updateVideo(editingVideo.id, vidPayload);
      showToast("✓ Đã cập nhật video thành công!");
    } else {
      addVideo(vidPayload);
      showToast("✓ Đã thêm video mới thành công!");
    }
    setVideoModalOpen(false);
  };

  const filteredAdminVideos = (videos || []).filter((v) => {
    const matchType = videoTypeFilter === "all" || v.type === videoTypeFilter;
    const matchSearch =
      v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      (v.category && v.category.toLowerCase().includes(videoSearch.toLowerCase()));
    return matchType && matchSearch;
  });

  // =========================================================================
  // 4c. STATE & LOGIC CHO QUẢN TRỊ LEADS / YÊU CẦU BÁO GIÁ
  // =========================================================================
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryNotesText, setInquiryNotesText] = useState("");
  const [inquiryStatusSelect, setInquiryStatusSelect] = useState("pending");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState("all");

  const openInquiryModal = (inq) => {
    setSelectedInquiry(inq);
    setInquiryNotesText(inq.notes || "");
    setInquiryStatusSelect(inq.status || "pending");
    setInquiryModalOpen(true);
  };

  const handleSaveInquiryNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, inquiryStatusSelect, inquiryNotesText);
    showToast(`✓ Đã lưu cập nhật cho: ${selectedInquiry.name}`);
    setInquiryModalOpen(false);
  };

  const filteredInquiries = useMemo(() => {
    return (inquiries || []).filter((item) => {
      const q = (inquirySearch || "").toLowerCase().trim();
      const matchSearch =
        q === "" ||
        (item.name || "").toLowerCase().includes(q) ||
        (item.phone || "").includes(q) ||
        (item.product || "").toLowerCase().includes(q) ||
        (item.topic || "").toLowerCase().includes(q) ||
        (item.notes || "").toLowerCase().includes(q);
      const matchStatus =
        inquiryFilterStatus === "all" || item.status === inquiryFilterStatus;
      return matchSearch && matchStatus;
    });
  }, [inquiries, inquirySearch, inquiryFilterStatus]);

  const contactedInquiriesCount = useMemo(() => {
    return (inquiries || []).filter((i) => i.status === "contacted").length;
  }, [inquiries]);

  const completedInquiriesCount = useMemo(() => {
    return (inquiries || []).filter((i) => i.status === "completed").length;
  }, [inquiries]);

  const cancelledInquiriesCount = useMemo(() => {
    return (inquiries || []).filter((i) => i.status === "cancelled").length;
  }, [inquiries]);

  // =========================================================================
  // 5. THỐNG KÊ DASHBOARD
  // =========================================================================
  const pendingInquiriesCount = inquiries.filter((i) => i.status === "pending").length;
  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      (a.focusKeyword && a.focusKeyword.toLowerCase().includes(articleSearch.toLowerCase()))
  );
  const filteredProducts = products.filter((p) => {
    const matchCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
    const matchSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.shortName.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // =========================================================================
  // GIAO DIỆN ĐĂNG NHẬP BẢO MẬT ADMIN
  // =========================================================================
  if (isVerifying) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at 50% 25%, #08215e 0%, #001237 55%, #00081d 100%)",
          color: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            border: "3px solid rgba(56, 189, 248, 0.2)",
            borderTopColor: "#38bdf8",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "14px", color: "#94a3b8" }}>
          Đang xác thực phiên quản trị bảo mật (JWT &amp; SSL)...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at 50% 25%, #08215e 0%, #001237 55%, #00081d 100%)",
          color: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "24px",
              zIndex: 99999,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CheckCircle size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            background: "rgba(3, 16, 48, 0.95)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "16px",
            padding: "36px 32px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Logo Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#fff",
                fontSize: "24px",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.4)",
                marginBottom: "14px",
              }}
            >
              FN
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.5px" }}>
              ĐĂNG NHẬP HỆ THỐNG
            </h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              Cổng Quản Trị B2B &amp; Bài Viết Chuẩn SEO FUJINANO
            </p>
          </div>

          {/* Form Đăng Nhập */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {loginError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "#fca5a5",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            {remainingAttempts !== null && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#f59e0b",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldAlert size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span>Cảnh báo Brute-force: Còn lại {remainingAttempts} lần thử trước khi IP bị khóa 15 phút.</span>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                Tài Khoản (Username)
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(2, 12, 38, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                  padding: "0 12px",
                }}
              >
                <User size={16} color="#64748b" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    setLoginError("");
                  }}
                  style={{
                    width: "100%",
                    padding: "11px 10px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                Mật Khẩu (Password)
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(2, 12, 38, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                  padding: "0 12px",
                }}
              >
                <Lock size={16} color="#64748b" style={{ flexShrink: 0 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Nhập mật khẩu quản trị..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  style={{
                    width: "100%",
                    padding: "11px 10px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12.5px", color: "#94a3b8" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: "#2563eb" }}
                />
                <span>Ghi nhớ phiên đăng nhập (7 ngày)</span>
              </label>
              <span style={{ color: "#64748b" }}>Cấp quản trị viên</span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: loginLoading ? "not-allowed" : "pointer",
                opacity: loginLoading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(37, 99, 235, 0.4)",
                marginTop: "6px",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => !loginLoading && (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} />
                  <span>ĐANG KIỂM TRA BẢO MẬT...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>ĐĂNG NHẬP QUẢN TRỊ AN TOÀN</span>
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#64748b",
                marginTop: "6px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "12px",
              }}
            >
              <ShieldCheck size={13} color="#10b981" />
              <span>Bảo vệ bởi Bcrypt Salted Hashing &amp; Signed JWT Token</span>
            </div>

            <div style={{ textAlign: "center", marginTop: "4px" }}>
              <Link
                to="/"
                style={{
                  fontSize: "12.5px",
                  color: "#38bdf8",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>← Quay về Trang Chủ Website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#010d29",
        color: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 960px) {
          .admin-main-layout { flex-direction: column !important; }
          .admin-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
        }
      `}</style>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "24px",
            zIndex: 99999,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            padding: "12px 22px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* HEADER QUẢN TRỊ VIÊN                                                  */}
      {/* ===================================================================== */}
      <header
        style={{
          background: "rgba(3, 16, 48, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "0 28px",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#fff",
                fontSize: "16px",
              }}
            >
              FN
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: "15px", letterSpacing: "0.5px" }}>
                FUJINANO
              </span>
              <span
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "2px 6px",
                  borderRadius: "4px",
                  marginLeft: "6px",
                }}
              >
                ADMIN CMS
              </span>
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>
            Hệ Thống Quản Trị Toàn Diện B2B / Báo Giá
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Bạn có chắc muốn khôi phục toàn bộ dữ liệu (Sản phẩm, Bài viết, Cài đặt) về mặc định ban đầu?"
                )
              ) {
                resetToDefaults();
                showToast("✓ Đã khôi phục toàn bộ dữ liệu về trạng thái ban đầu!");
                window.location.reload();
              }
            }}
            style={{
              background: "rgba(239, 68, 68, 0.12)",
              color: "#f87171",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "6px",
              padding: "7px 12px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RotateCcw size={13} />
            <span>Khôi Phục Gốc</span>
          </button>

          <Link
            to="/"
            target="_blank"
            style={{
              background: "rgba(59, 130, 246, 0.2)",
              color: "#38bdf8",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "6px",
              padding: "7px 14px",
              fontSize: "12.5px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <Globe size={14} />
            <span>Xem Website</span>
            <ExternalLink size={12} />
          </Link>

          {/* User profile & Logout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingLeft: "10px",
              borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <User size={13} color="#38bdf8" />
              <span style={{ fontWeight: 700, color: "#ffffff" }}>admin</span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "background 0.15s ease",
              }}
              title="Đăng xuất khỏi hệ thống"
            >
              <LogOut size={13} />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* BODY LAYOUT: SIDEBAR + MAIN CONTENT AREA                             */}
      {/* ===================================================================== */}
      <div className="admin-main-layout" style={{ display: "flex", flex: 1, minHeight: "calc(100vh - 65px)" }}>
        {/* SIDEBAR NAVIGATION */}
        <aside
          className="admin-sidebar"
          style={{
            width: "260px",
            background: "rgba(2, 12, 38, 0.98)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#64748b",
              padding: "8px 12px",
            }}
          >
            Menu Quản Trị
          </div>

          {[
            {
              id: "dashboard",
              label: "Tổng Quan Dashboard",
              icon: LayoutDashboard,
              badge: null,
            },
            {
              id: "articles",
              label: "Bài Viết Chuẩn SEO",
              icon: FileText,
              badge: `${articles.length} bài`,
            },
            {
              id: "products",
              label: "Quản Lý Sản Phẩm",
              icon: Package,
              badge: `${products.length} SP`,
            },
            {
              id: "inquiries",
              label: "Yêu Cầu Báo Giá",
              icon: PhoneCall,
              badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} mới` : null,
              badgeColor: "#ef4444",
            },
            {
              id: "videos",
              label: "Video & Shorts",
              icon: VideoIcon,
              badge: `${(videos || []).length} video`,
              badgeColor: "#ef4444",
            },
            {
              id: "settings",
              label: "Thông Tin & Liên Hệ",
              icon: Settings,
              badge: null,
            },
            {
              id: "policies",
              label: "Chính Sách & Bảo Hành",
              icon: ShieldCheck,
              badge: null,
            },
            {
              id: "security",
              label: "An Ninh & Kiểm Toán",
              icon: ShieldAlert,
              badge: "Bảo Vệ",
              badgeColor: "#10b981",
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive
                    ? "linear-gradient(90deg, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.1) 100%)"
                    : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  textAlign: "left",
                  borderLeft: isActive ? "3px solid #38bdf8" : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={17} color={isActive ? "#38bdf8" : "#64748b"} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      background: item.badgeColor || "rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div
            style={{
              marginTop: "auto",
              padding: "16px 12px",
              background: "rgba(8, 22, 54, 0.6)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              fontSize: "12px",
            }}
          >
            <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: "4px" }}>
              Kho Hàng Cần Thơ
            </div>
            <div style={{ color: "#94a3b8", lineHeight: 1.4 }}>
              Hotline: <strong style={{ color: "#22c55e" }}>{siteSettings.hotline}</strong>
              <br />
              MST: <strong>{siteSettings.taxId}</strong>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT CONTAINER */}
        <main style={{ flex: 1, padding: "28px 36px", overflowY: "auto", maxWidth: "1280px" }}>
          {/* =================================================================== */}
          {/* TAB 1: 📊 DASHBOARD TỔNG QUAN                                       */}
          {/* =================================================================== */}
          {activeTab === "dashboard" && (
            <div>
              <div style={{ marginBottom: "26px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>
                  Bảng Điều Khiển Tổng Quan
                </h1>
                <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                  Theo dõi số lượng hàng hóa, bài viết SEO trên Google và tiếp nhận yêu cầu báo giá của nhà thầu.
                </p>
              </div>

              {/* Neon Cloud Infrastructure Status Banner */}
              <div
                style={{
                  background: "rgba(6, 20, 52, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "rgba(56, 189, 248, 0.12)",
                      border: "1px solid rgba(56, 189, 248, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#38bdf8",
                    }}
                  >
                    <Database size={20} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 800, fontSize: "15px", color: "#ffffff" }}>
                        Hạ Tầng Neon Cloud Backend
                      </span>
                      <span
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          color: "#34d399",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        ● Đang Hoạt Động
                      </span>
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "3px" }}>
                      Branch: <strong style={{ color: "#38bdf8" }}>{neonStatus?.branch || "production"}</strong> ({neonStatus?.branchId || "br-purple-dream-a118wnr7"}) · Region: <strong>{neonStatus?.region || "ap-southeast-1"} (Singapore)</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>LAKEBASE POSTGRES</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#34d399", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>✓ Connected (Pooler)</span>
                    </div>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>OBJECT STORAGE (S3)</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>✓ fujinano-media</span>
                    </div>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>AI GATEWAY</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fbbf24", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>✓ Token Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Cards Thống Kê */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "18px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.8)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Thùng Sơn Đang Bán</span>
                    <Package size={20} color="#38bdf8" />
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
                    {products.length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#34d399", marginTop: "4px" }}>
                    Tồn kho sẵn tại kho 45 Mậu Thân
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.8)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Bài Viết Chuẩn SEO</span>
                    <FileText size={20} color="#34d399" />
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
                    {articles.length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#38bdf8", marginTop: "4px" }}>
                    Tối ưu thẻ Title, Meta, Slug
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.8)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Yêu Cầu Báo Giá</span>
                    <PhoneCall size={20} color="#f87171" />
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
                    {inquiries.length}{" "}
                    {pendingInquiriesCount > 0 && (
                      <span style={{ fontSize: "14px", color: "#f87171", fontWeight: 700 }}>
                        ({pendingInquiriesCount} mới)
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>
                    Khách cần gọi lại tư vấn
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.8)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Hotline Hoạt Động</span>
                    <Phone size={20} color="#fbbf24" />
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e" }}>
                    {siteSettings.hotline}
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                    Kỹ sư tiếp nhận cuộc gọi 24/7
                  </div>
                </div>
              </div>

              {/* Bảng Yêu Cầu Báo Giá Mới Nhất Trên Dashboard */}
              <div
                style={{
                  background: "rgba(8, 22, 54, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "22px",
                  marginBottom: "28px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <PhoneCall size={18} color="#38bdf8" />
                    <span>Khách Hàng Để Lại SĐT Báo Giá Gần Đây</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#38bdf8",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>Xem tất cả ({inquiries.length})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", textAlign: "left" }}>
                        <th style={{ padding: "10px 12px" }}>Khách Hàng / Đơn Vị</th>
                        <th style={{ padding: "10px 12px" }}>Số Điện Thoại</th>
                        <th style={{ padding: "10px 12px" }}>Sản Phẩm Quan Tâm</th>
                        <th style={{ padding: "10px 12px" }}>Thời Gian</th>
                        <th style={{ padding: "10px 12px" }}>Trạng Thái</th>
                        <th style={{ padding: "10px 12px", textAlign: "right" }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 6).map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            transition: "background 0.15s ease",
                          }}
                        >
                          <td style={{ padding: "12px 14px", fontWeight: 600 }}>
                            <div style={{ color: "#ffffff" }}>{item.name}</div>
                            {item.email && (
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{item.email}</div>
                            )}
                          </td>
                          <td style={{ padding: "12px 14px", fontWeight: 700 }}>
                            <a
                              href={`tel:${(item.phone || "").replace(/[^0-9+]/g, "")}`}
                              style={{
                                color: "#22c55e",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                              title="Bấm để gọi trực tiếp cho khách hàng"
                            >
                              <Phone size={12} />
                              <span>{item.phone}</span>
                            </a>
                          </td>
                          <td style={{ padding: "12px 14px", color: "#cbd5e1" }}>
                            <div style={{ color: "#38bdf8", fontWeight: 600 }}>
                              {item.product || item.topic || "Tư vấn sơn công nghiệp"}
                            </div>
                            {(item.quantity || item.area) && (
                              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                                {item.quantity ? `${item.quantity} thùng` : ""}
                                {item.quantity && item.area ? " • " : ""}
                                {item.area ? `Diện tích: ${item.area}` : ""}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "12px 14px", color: "#94a3b8", fontSize: "12px", whiteSpace: "nowrap" }}>
                            {item.date}
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <select
                              value={item.status || "pending"}
                              onChange={(e) => {
                                updateInquiryStatus(item.id, e.target.value);
                                const statusMap = {
                                  pending: "Chờ gọi lại",
                                  contacted: "Đã tư vấn",
                                  completed: "Đã chốt đơn",
                                  cancelled: "Hủy yêu cầu",
                                };
                                showToast(`✓ Đã đổi trạng thái sang "${statusMap[e.target.value]}": ${item.name}`);
                              }}
                              style={{
                                background:
                                  item.status === "pending"
                                    ? "rgba(239, 68, 68, 0.18)"
                                    : item.status === "contacted"
                                    ? "rgba(245, 158, 11, 0.18)"
                                    : item.status === "completed"
                                    ? "rgba(16, 185, 129, 0.18)"
                                    : "rgba(148, 163, 184, 0.18)",
                                color:
                                  item.status === "pending"
                                    ? "#f87171"
                                    : item.status === "contacted"
                                    ? "#fbbf24"
                                    : item.status === "completed"
                                    ? "#34d399"
                                    : "#94a3b8",
                                border:
                                  item.status === "pending"
                                    ? "1px solid rgba(239, 68, 68, 0.35)"
                                    : item.status === "contacted"
                                    ? "1px solid rgba(245, 158, 11, 0.35)"
                                    : item.status === "completed"
                                    ? "1px solid rgba(16, 185, 129, 0.35)"
                                    : "1px solid rgba(148, 163, 184, 0.35)",
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "11.5px",
                                fontWeight: 700,
                                cursor: "pointer",
                                outline: "none",
                              }}
                            >
                              <option value="pending" style={{ background: "#061434", color: "#f87171" }}>Chờ gọi lại</option>
                              <option value="contacted" style={{ background: "#061434", color: "#fbbf24" }}>Đã tư vấn</option>
                              <option value="completed" style={{ background: "#061434", color: "#34d399" }}>Đã chốt đơn</option>
                              <option value="cancelled" style={{ background: "#061434", color: "#94a3b8" }}>Hủy</option>
                            </select>
                          </td>
                          <td style={{ padding: "12px 14px", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "6px" }}>
                              <a
                                href={`tel:${(item.phone || "").replace(/[^0-9+]/g, "")}`}
                                style={{
                                  background: "#16a34a",
                                  color: "#ffffff",
                                  padding: "5px 11px",
                                  borderRadius: "6px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  textDecoration: "none",
                                  transition: "background 0.15s ease",
                                }}
                                title={`Gọi trực tiếp cho ${item.name} (${item.phone})`}
                              >
                                <Phone size={12} />
                                <span>Gọi Khách</span>
                              </a>

                              <button
                                onClick={() => openInquiryModal(item)}
                                style={{
                                  background: "rgba(59, 130, 246, 0.15)",
                                  color: "#38bdf8",
                                  border: "1px solid rgba(59, 130, 246, 0.3)",
                                  padding: "5px 8px",
                                  borderRadius: "6px",
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                                title="Xem chi tiết & ghi chú trao đổi"
                              >
                                <FileText size={12} />
                                <span>Ghi Chú</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lối Tắt Nhanh */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                }}
                className="grid-2"
              >
                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.7)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h4 style={{ fontSize: "14.5px", fontWeight: 700, margin: "0 0 8px", color: "#38bdf8" }}>
                    Viết Bài Kỹ Thuật Chuẩn SEO Mới
                  </h4>
                  <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: "0 0 14px" }}>
                    Thêm bài viết hướng dẫn thi công sơn Epoxy, chống thấm để tăng lưu lượng truy cập tìm kiếm tự nhiên từ Google.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab("articles");
                      openNewArticleModal();
                    }}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Plus size={14} />
                    <span>Tạo Bài Viết SEO Ngay</span>
                  </button>
                </div>

                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.7)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h4 style={{ fontSize: "14.5px", fontWeight: 700, margin: "0 0 8px", color: "#34d399" }}>
                    Cập Nhật Giá Sỉ &amp; Chiết Khấu Thùng Sơn
                  </h4>
                  <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: "0 0 14px" }}>
                    Điều chỉnh bảng giá bán lẻ và giá sỉ cho 8 dòng sơn chủ lực, thay đổi lập tức hiển thị ra trang chủ.
                  </p>
                  <button
                    onClick={() => setActiveTab("products")}
                    style={{
                      background: "#059669",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Edit size={14} />
                    <span>Chỉnh Sửa Bảng Giá</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: 📝 BÀI VIẾT CHUẨN SEO (SEO ARTICLES CMS)                     */}
          {/* =================================================================== */}
          {activeTab === "articles" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>
                    Quản Trị Bài Viết &amp; Tin Tức Chuẩn SEO
                  </h1>
                  <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                    Tích hợp bộ kiểm tra tiêu chuẩn Google: Meta Title, Meta Description, Từ Khóa Chính và SERP Preview.
                  </p>
                </div>

                <button
                  onClick={openNewArticleModal}
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
                  }}
                >
                  <Plus size={16} />
                  <span>Thêm Bài Viết Mới</span>
                </button>
              </div>

              {/* Thanh Tìm Kiếm Bài Viết */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(8, 22, 54, 0.8)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: "20px",
                  maxWidth: "460px",
                }}
              >
                <Search size={16} color="#64748b" />
                <input
                  type="text"
                  placeholder="Tìm theo tiêu đề hoặc từ khóa chính..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    padding: "6px 10px",
                    fontSize: "13px",
                    flex: 1,
                  }}
                />
              </div>

              {/* Bảng Danh Sách Bài Viết */}
              <div
                style={{
                  background: "rgba(8, 22, 54, 0.85)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
                  <thead>
                    <tr
                      style={{
                        background: "rgba(2, 14, 42, 0.95)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#94a3b8",
                        textAlign: "left",
                      }}
                    >
                      <th style={{ padding: "14px 16px" }}>Bài Viết</th>
                      <th style={{ padding: "14px 16px" }}>Từ Khóa Chính</th>
                      <th style={{ padding: "14px 16px" }}>Chuyên Mục</th>
                      <th style={{ padding: "14px 16px" }}>Ngày Đăng</th>
                      <th style={{ padding: "14px 16px" }}>Điểm SEO</th>
                      <th style={{ padding: "14px 16px", textAlign: "right" }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((art) => (
                      <tr
                        key={art.slug}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          transition: "background 0.15s ease",
                        }}
                      >
                        <td style={{ padding: "14px 16px", maxWidth: "340px" }}>
                          <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                            {art.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            slug: /{art.slug}
                          </div>
                        </td>

                        <td style={{ padding: "14px 16px" }}>
                          {art.focusKeyword ? (
                            <span
                              style={{
                                background: "rgba(59, 130, 246, 0.15)",
                                color: "#38bdf8",
                                padding: "3px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {art.focusKeyword}
                            </span>
                          ) : (
                            <span style={{ color: "#64748b", fontSize: "12px" }}>Chưa đặt</span>
                          )}
                        </td>

                        <td style={{ padding: "14px 16px" }}>
                          <span
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                            }}
                          >
                            {art.tag}
                          </span>
                        </td>

                        <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "12.5px" }}>
                          {art.date}
                        </td>

                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: "rgba(16, 185, 129, 0.2)",
                                color: "#34d399",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 800,
                                fontSize: "12px",
                              }}
                            >
                              95
                            </div>
                            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>Tốt</span>
                          </div>
                        </td>

                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "8px" }}>
                            <Link
                              to={`/tin-tuc/${art.slug}`}
                              target="_blank"
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                color: "#cbd5e1",
                                padding: "6px 9px",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                              }}
                              title="Xem trên web"
                            >
                              <Eye size={14} />
                            </Link>

                            <button
                              onClick={() => openEditArticleModal(art)}
                              style={{
                                background: "rgba(59, 130, 246, 0.2)",
                                color: "#38bdf8",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                padding: "6px 9px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                              }}
                              title="Chỉnh sửa bài viết"
                            >
                              <Edit size={14} />
                            </button>

                            <button
                              onClick={() => handleDeleteArticle(art.slug, art.title)}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                color: "#f87171",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                padding: "6px 9px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                              }}
                              title="Xóa bài viết"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: 📦 QUẢN TRỊ SẢN PHẨM (PRODUCTS CMS)                          */}
          {/* =================================================================== */}
          {activeTab === "products" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>
                    Quản Lý Danh Mục Thùng Sơn &amp; Bảng Giá
                  </h1>
                  <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                    Chỉnh sửa giá bán lẻ, giá gốc, tồn kho, quy cách lon/thùng/phuy và thông số kỹ thuật.
                  </p>
                </div>
              </div>

              {/* Lọc & Tìm Kiếm Sản Phẩm */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(8, 22, 54, 0.8)",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    width: "320px",
                  }}
                >
                  <Search size={16} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên sơn..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      padding: "6px 10px",
                      fontSize: "13px",
                      flex: 1,
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setProductCategoryFilter("all")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "none",
                      background: productCategoryFilter === "all" ? "#2563eb" : "rgba(255,255,255,0.08)",
                      color: "#ffffff",
                    }}
                  >
                    Tất cả ({products.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setProductCategoryFilter(c.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        background: productCategoryFilter === c.id ? "#2563eb" : "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bảng Sản Phẩm */}
              <div
                style={{
                  background: "rgba(8, 22, 54, 0.85)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr
                      style={{
                        background: "rgba(2, 14, 42, 0.95)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#94a3b8",
                        textAlign: "left",
                      }}
                    >
                      <th style={{ padding: "12px 14px", width: "70px" }}>Hình Ảnh</th>
                      <th style={{ padding: "12px 14px" }}>Tên Thùng Sơn</th>
                      <th style={{ padding: "12px 14px" }}>Danh Mục</th>
                      <th style={{ padding: "12px 14px" }}>Giá Bán Sỉ (VNĐ)</th>
                      <th style={{ padding: "12px 14px" }}>Giá Gốc (VNĐ)</th>
                      <th style={{ padding: "12px 14px" }}>Chiết Khấu</th>
                      <th style={{ padding: "12px 14px" }}>Tồn Kho</th>
                      <th style={{ padding: "12px 14px", textAlign: "right" }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((prod) => (
                      <tr
                        key={prod.id}
                        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
                      >
                        <td style={{ padding: "12px 14px" }}>
                          <img
                            src={prod.images?.[0] || "/images/products/fn-epoxy-18l.jpg"}
                            alt={prod.shortName}
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "contain",
                              background: "#ffffff",
                              borderRadius: "6px",
                              padding: "2px",
                            }}
                          />
                        </td>

                        <td style={{ padding: "12px 14px", maxWidth: "260px" }}>
                          <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: "2px" }}>
                            {prod.shortName}
                          </div>
                          <div style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {prod.name}
                          </div>
                        </td>

                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              background: "rgba(59, 130, 246, 0.15)",
                              color: "#38bdf8",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "11.5px",
                            }}
                          >
                            {prod.categoryName}
                          </span>
                        </td>

                        <td style={{ padding: "12px 14px", fontWeight: 800, color: "#38bdf8" }}>
                          {prod.price.toLocaleString("vi-VN")} ₫
                        </td>

                        <td style={{ padding: "12px 14px", color: "#94a3b8", textDecoration: "line-through" }}>
                          {prod.originalPrice.toLocaleString("vi-VN")} ₫
                        </td>

                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              background: "rgba(220, 38, 38, 0.2)",
                              color: "#f87171",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            -{prod.discount}%
                          </span>
                        </td>

                        <td style={{ padding: "12px 14px", fontWeight: 700, color: prod.stock > 20 ? "#34d399" : "#fbbf24" }}>
                          {prod.stock} thùng
                        </td>

                        <td style={{ padding: "12px 14px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <Link
                              to={`/san-pham/${prod.slug}`}
                              target="_blank"
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                color: "#cbd5e1",
                                padding: "6px 8px",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                              }}
                              title="Xem chi tiết"
                            >
                              <Eye size={13} />
                            </Link>
                            <button
                              onClick={() => openEditProductModal(prod)}
                              style={{
                                background: "#2563eb",
                                color: "#fff",
                                border: "none",
                                padding: "6px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Edit size={12} />
                              <span>Sửa Giá</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: 📥 YÊU CẦU BÁO GIÁ (LEADS / INQUIRIES)                       */}
          {/* =================================================================== */}
          {activeTab === "inquiries" && (
            <div>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "14px",
                  marginBottom: "22px",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      margin: "0 0 6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <PhoneCall size={24} color="#38bdf8" />
                    <span>Quản Lý Yêu Cầu Báo Giá &amp; Lead B2B</span>
                  </h1>
                  <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                    Tiếp nhận và xử lý lead từ các nút "Đặt Mua / Báo Giá Nhanh" trên website. Tự động đồng bộ với Neon Lakebase Postgres.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => {
                      if (adminToken) {
                        fetchInquiriesFromDb(adminToken);
                        showToast("✓ Đã đồng bộ dữ liệu mới nhất từ Neon Postgres!");
                      }
                    }}
                    style={{
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#38bdf8",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <RefreshCw size={14} />
                    <span>Đồng Bộ Neon DB</span>
                  </button>
                </div>
              </div>

              {/* 5 Thống Kê CRM Pipeline */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>Tổng Lead Yêu Cầu</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", marginTop: "4px" }}>
                    {inquiries.length}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#f87171" }}>Chờ Gọi Lại (Mới)</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#f87171", marginTop: "4px" }}>
                    {pendingInquiriesCount}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#fbbf24" }}>Đã Liên Hệ Tư Vấn</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#fbbf24", marginTop: "4px" }}>
                    {contactedInquiriesCount}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#34d399" }}>Đã Chốt Đơn</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#34d399", marginTop: "4px" }}>
                    {completedInquiriesCount}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>Hủy / Không Nhu Cầu</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#94a3b8", marginTop: "4px" }}>
                    {cancelledInquiriesCount}
                  </div>
                </div>
              </div>

              {/* Toolbar: Tìm kiếm & Lọc Trạng Thái */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(6, 20, 52, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    width: "100%",
                    maxWidth: "340px",
                  }}
                >
                  <Search size={15} color="#64748b" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Tìm theo tên, SĐT, sản phẩm..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      padding: "4px 8px",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  />
                  {inquirySearch && (
                    <button
                      onClick={() => setInquirySearch("")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#94a3b8",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: `Tất Cả (${inquiries.length})` },
                    { id: "pending", label: `Chờ Gọi (${pendingInquiriesCount})` },
                    { id: "contacted", label: `Đã Tư Vấn (${contactedInquiriesCount})` },
                    { id: "completed", label: `Đã Chốt (${completedInquiriesCount})` },
                    { id: "cancelled", label: `Đã Hủy (${cancelledInquiriesCount})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setInquiryFilterStatus(tab.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        background:
                          inquiryFilterStatus === tab.id
                            ? "#2563eb"
                            : "rgba(255, 255, 255, 0.08)",
                        color: inquiryFilterStatus === tab.id ? "#ffffff" : "#94a3b8",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bảng Danh Sách Leads */}
              <div
                style={{
                  background: "rgba(6, 20, 52, 0.85)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr
                        style={{
                          background: "rgba(2, 14, 42, 0.95)",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#94a3b8",
                          textAlign: "left",
                        }}
                      >
                        <th style={{ padding: "12px 14px" }}>Họ Tên / Đơn Vị</th>
                        <th style={{ padding: "12px 14px" }}>Số Điện Thoại</th>
                        <th style={{ padding: "12px 14px" }}>Sản Phẩm &amp; Quy Cách</th>
                        <th style={{ padding: "12px 14px" }}>Ghi Chú Báo Giá</th>
                        <th style={{ padding: "12px 14px" }}>Thời Gian</th>
                        <th style={{ padding: "12px 14px" }}>Trạng Thái</th>
                        <th style={{ padding: "12px 14px", textAlign: "right" }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: "36px", textAlign: "center", color: "#94a3b8" }}>
                            Không tìm thấy yêu cầu báo giá nào phù hợp với bộ lọc hiện tại.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((item) => (
                          <tr
                            key={item.id}
                            style={{
                              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                              transition: "background 0.15s ease",
                            }}
                          >
                            <td style={{ padding: "12px 14px", fontWeight: 700 }}>
                              <div style={{ color: "#ffffff" }}>{item.name}</div>
                              {item.email && (
                                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 400 }}>
                                  {item.email}
                                </div>
                              )}
                            </td>

                            <td style={{ padding: "12px 14px" }}>
                              <a
                                href={`tel:${(item.phone || "").replace(/[^0-9+]/g, "")}`}
                                style={{
                                  color: "#22c55e",
                                  fontWeight: 800,
                                  textDecoration: "none",
                                  fontSize: "13.5px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                                title="Bấm để gọi trực tiếp cho khách hàng"
                              >
                                <Phone size={13} />
                                <span>{item.phone}</span>
                              </a>
                            </td>

                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ fontWeight: 600, color: "#38bdf8" }}>
                                {item.product || item.topic || "Tư vấn sơn công nghiệp"}
                              </div>
                              {(item.quantity || item.area) && (
                                <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                                  {item.quantity ? `SL: ${item.quantity} thùng` : ""}{" "}
                                  {item.area ? `• Diện tích: ${item.area}` : ""}
                                </div>
                              )}
                            </td>

                            <td
                              style={{
                                padding: "12px 14px",
                                color: "#cbd5e1",
                                maxWidth: "220px",
                                fontSize: "12px",
                              }}
                            >
                              <div
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={item.notes || "Khách yêu cầu gọi lại báo giá chiết khấu"}
                              >
                                {item.notes || "Chưa có ghi chú trao đổi"}
                              </div>
                            </td>

                            <td style={{ padding: "12px 14px", color: "#94a3b8", fontSize: "12px", whiteSpace: "nowrap" }}>
                              {item.date}
                            </td>

                            <td style={{ padding: "12px 14px" }}>
                              <select
                                value={item.status || "pending"}
                                onChange={(e) => {
                                  updateInquiryStatus(item.id, e.target.value);
                                  const statusMap = {
                                    pending: "Chờ gọi lại",
                                    contacted: "Đã tư vấn",
                                    completed: "Đã chốt đơn",
                                    cancelled: "Hủy yêu cầu",
                                  };
                                  showToast(`✓ Đã đổi trạng thái sang "${statusMap[e.target.value]}": ${item.name}`);
                                }}
                                style={{
                                  background:
                                    item.status === "pending"
                                      ? "rgba(239, 68, 68, 0.18)"
                                      : item.status === "contacted"
                                      ? "rgba(245, 158, 11, 0.18)"
                                      : item.status === "completed"
                                      ? "rgba(16, 185, 129, 0.18)"
                                      : "rgba(148, 163, 184, 0.18)",
                                  color:
                                    item.status === "pending"
                                      ? "#f87171"
                                      : item.status === "contacted"
                                      ? "#fbbf24"
                                      : item.status === "completed"
                                      ? "#34d399"
                                      : "#94a3b8",
                                  border:
                                    item.status === "pending"
                                      ? "1px solid rgba(239, 68, 68, 0.35)"
                                      : item.status === "contacted"
                                      ? "1px solid rgba(245, 158, 11, 0.35)"
                                      : item.status === "completed"
                                      ? "1px solid rgba(16, 185, 129, 0.35)"
                                      : "1px solid rgba(148, 163, 184, 0.35)",
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  outline: "none",
                                }}
                              >
                                <option value="pending" style={{ background: "#061434", color: "#f87171" }}>Chờ gọi lại</option>
                                <option value="contacted" style={{ background: "#061434", color: "#fbbf24" }}>Đã tư vấn</option>
                                <option value="completed" style={{ background: "#061434", color: "#34d399" }}>Đã chốt đơn</option>
                                <option value="cancelled" style={{ background: "#061434", color: "#94a3b8" }}>Hủy</option>
                              </select>
                            </td>

                            <td style={{ padding: "12px 14px", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", gap: "6px" }}>
                                <a
                                  href={`tel:${(item.phone || "").replace(/[^0-9+]/g, "")}`}
                                  style={{
                                    background: "#16a34a",
                                    color: "#ffffff",
                                    padding: "5px 10px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    textDecoration: "none",
                                    transition: "background 0.15s ease",
                                  }}
                                  title={`Gọi điện trực tiếp cho ${item.name}`}
                                >
                                  <Phone size={13} />
                                  <span>Gọi Khách</span>
                                </a>

                                <button
                                  onClick={() => openInquiryModal(item)}
                                  style={{
                                    background: "rgba(59, 130, 246, 0.15)",
                                    color: "#38bdf8",
                                    border: "1px solid rgba(59, 130, 246, 0.3)",
                                    padding: "5px 8px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                  title="Xem chi tiết & ghi chú trao đổi"
                                >
                                  <FileText size={13} />
                                  <span>Ghi Chú</span>
                                </button>

                                <button
                                  onClick={() => {
                                    if (window.confirm(`Xóa yêu cầu báo giá của ${item.name}?`)) {
                                      deleteInquiry(item.id);
                                      showToast("✓ Đã xóa yêu cầu báo giá!");
                                    }
                                  }}
                                  style={{
                                    background: "rgba(239, 68, 68, 0.15)",
                                    color: "#f87171",
                                    border: "none",
                                    padding: "5px 8px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                  }}
                                  title="Xóa yêu cầu"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 5: ⚙️ THÔNG TIN DOANH NGHIỆP & LIÊN HỆ                          */}
          {/* =================================================================== */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: "800px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>
                  Chỉnh Sửa Thông Tin Doanh Nghiệp &amp; Liên Hệ
                </h1>
                <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                  Thông tin này xuất hiện trên toàn bộ Header, Footer, Trang Liên Hệ và Báo Giá.
                </p>
              </div>

              <form
                onSubmit={handleSaveSiteSettings}
                style={{
                  background: "rgba(8, 22, 54, 0.85)",
                  borderRadius: "12px",
                  padding: "28px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Tên Doanh Nghiệp / Công Ty Đầy Đủ
                  </label>
                  <input
                    type="text"
                    value={siteForm.companyName}
                    onChange={(e) => setSiteForm({ ...siteForm, companyName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.8)",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Mã Số Thuế (MST)
                    </label>
                    <input
                      type="text"
                      value={siteForm.taxId}
                      onChange={(e) => setSiteForm({ ...siteForm, taxId: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Người Đại Diện Pháp Luật
                    </label>
                    <input
                      type="text"
                      value={siteForm.representative}
                      onChange={(e) => setSiteForm({ ...siteForm, representative: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Hotline Kỹ Sư 24/7 (Hiển thị)
                    </label>
                    <input
                      type="text"
                      value={siteForm.hotline}
                      onChange={(e) =>
                        setSiteForm({
                          ...siteForm,
                          hotline: e.target.value,
                          hotlineRaw: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#22c55e",
                        fontWeight: 800,
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Số Zalo Tư Vấn Nhanh
                    </label>
                    <input
                      type="text"
                      value={siteForm.zalo}
                      onChange={(e) => setSiteForm({ ...siteForm, zalo: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#38bdf8",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Email Tiếp Nhận Báo Giá
                    </label>
                    <input
                      type="email"
                      value={siteForm.email}
                      onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Giờ Mở Cửa Kho Hàng
                    </label>
                    <input
                      type="text"
                      value={siteForm.workingHours}
                      onChange={(e) => setSiteForm({ ...siteForm, workingHours: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Địa Chỉ Trụ Sở &amp; Showroom Trưng Bày Sơn
                  </label>
                  <input
                    type="text"
                    value={siteForm.address}
                    onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.8)",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    URL Nhúng Bản Đồ Google Maps (iframe src)
                  </label>
                  <input
                    type="text"
                    value={siteForm.googleMapsEmbed}
                    onChange={(e) => setSiteForm({ ...siteForm, googleMapsEmbed: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.8)",
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "10px",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                  }}
                >
                  <Save size={16} />
                  <span>Lưu Toàn Bộ Thông Tin Doanh Nghiệp</span>
                </button>
              </form>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 6: 📜 CHÍNH SÁCH & BẢO HÀNH                                     */}
          {/* =================================================================== */}
          {activeTab === "policies" && (
            <div style={{ maxWidth: "880px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>
                  Chỉnh Sửa Chính Sách, Bảo Hành &amp; Đổi Trả
                </h1>
                <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
                  Nội dung cam kết hiển thị trên trang chủ và trang chi tiết thùng sơn.
                </p>
              </div>

              <form
                onSubmit={handleSavePolicies}
                style={{
                  background: "rgba(8, 22, 54, 0.85)",
                  borderRadius: "12px",
                  padding: "28px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                }}
              >
                {/* 1. Bảo Hành */}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <ShieldCheck size={20} color="#34d399" />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                      1. Chính Sách Bảo Hành Sơn
                    </h3>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "#94a3b8", marginBottom: "4px" }}>
                      Tóm tắt ngắn (Hiển thị trang chủ)
                    </label>
                    <input
                      type="text"
                      value={policyForm.warranty.summary}
                      onChange={(e) =>
                        setPolicyForm({
                          ...policyForm,
                          warranty: { ...policyForm.warranty, summary: e.target.value },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "13.5px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", color: "#94a3b8", marginBottom: "4px" }}>
                      Các điều khoản bảo hành chi tiết (Mỗi dòng một điều khoản)
                    </label>
                    <textarea
                      rows={4}
                      value={policyForm.warranty.terms.join("\n")}
                      onChange={(e) =>
                        setPolicyForm({
                          ...policyForm,
                          warranty: {
                            ...policyForm.warranty,
                            terms: e.target.value.split("\n").filter(Boolean),
                          },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#cbd5e1",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                </div>

                {/* 2. Đổi Trả */}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <RotateCcw size={20} color="#fbbf24" />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                      2. Chính Sách Đổi Trả Trong 7 Ngày
                    </h3>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "#94a3b8", marginBottom: "4px" }}>
                      Tóm tắt ngắn (Hiển thị trang chủ)
                    </label>
                    <input
                      type="text"
                      value={policyForm.returns.summary}
                      onChange={(e) =>
                        setPolicyForm({
                          ...policyForm,
                          returns: { ...policyForm.returns, summary: e.target.value },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#fff",
                        fontSize: "13.5px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", color: "#94a3b8", marginBottom: "4px" }}>
                      Điều kiện đổi trả hàng (Mỗi dòng một điều kiện)
                    </label>
                    <textarea
                      rows={4}
                      value={policyForm.returns.terms.join("\n")}
                      onChange={(e) =>
                        setPolicyForm({
                          ...policyForm,
                          returns: {
                            ...policyForm.returns,
                            terms: e.target.value.split("\n").filter(Boolean),
                          },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#cbd5e1",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                </div>

                {/* 3. Vận chuyển */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Globe size={20} color="#38bdf8" />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                      3. Chính Sách Vận Chuyển &amp; Giao Nhận
                    </h3>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={policyForm.shipping.terms.join("\n")}
                      onChange={(e) =>
                        setPolicyForm({
                          ...policyForm,
                          shipping: {
                            ...policyForm.shipping,
                            terms: e.target.value.split("\n").filter(Boolean),
                          },
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.8)",
                        color: "#cbd5e1",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  <Save size={16} />
                  <span>Lưu Cập Nhật Chính Sách &amp; Bảo Hành</span>
                </button>
              </form>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 7: AN NINH & NHẬT KÝ KIỂM TOÁN (SECURITY SHIELD & AUDIT LOGS) */}
          {/* =============================================================== */}
          {activeTab === "security" && (
            <div style={{ maxWidth: "1150px" }}>
              {/* Header Tab */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      margin: "0 0 6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <ShieldAlert size={24} color="#38bdf8" />
                    <span>TRUNG TÂM BẢO MẬT &amp; NHẬT KÝ KIỂM TOÁN</span>
                  </h1>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                    Hệ thống phòng thủ đa tầng: Mã hóa mật khẩu Bcrypt, Phân quyền JWT, Khóa Brute-Force, Lọc XSS &amp; Truy vết thời gian thực
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => setAuditAutoRefresh(!auditAutoRefresh)}
                    style={{
                      background: auditAutoRefresh
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(255, 255, 255, 0.05)",
                      color: auditAutoRefresh ? "#34d399" : "#94a3b8",
                      border: `1px solid ${
                        auditAutoRefresh ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.1)"
                      }`,
                      borderRadius: "6px",
                      padding: "8px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Activity size={14} />
                    <span>{auditAutoRefresh ? "Tự Động Cập Nhật (8s)" : "Tự Động (Tắt)"}</span>
                  </button>

                  <button
                    onClick={fetchAuditLogs}
                    disabled={loadingAuditLogs}
                    style={{
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#38bdf8",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <RefreshCw
                      size={14}
                      style={{
                        animation: loadingAuditLogs ? "spin 0.8s linear infinite" : "none",
                      }}
                    />
                    <span>Làm Mới Log</span>
                  </button>
                </div>
              </div>

              {/* 6 LÁ CHẮN BẢO MẬT HỆ THỐNG */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "16px",
                  marginBottom: "28px",
                }}
              >
                {/* 1. Mật Khẩu Admin Bcrypt */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Key size={18} color="#f59e0b" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Mã Hóa Mật Khẩu Đơn
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#34d399",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      Bcrypt (10 Salt)
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Mật khẩu quản trị viên được băm 1 chiều bằng giải thuật Blowfish Salt. Không bao giờ lưu hay gửi mật khẩu dạng plain text.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "monospace" }}>
                    Tài khoản: admin | Mật khẩu: •••••••••••• (Bcrypt Blowfish 10 Salt Rounds)
                  </div>
                </div>

                {/* 2. Phiên Làm Việc JWT */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Lock size={18} color="#38bdf8" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Xác Thực Phiên JWT
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(56, 189, 248, 0.15)",
                        color: "#38bdf8",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                      }}
                    >
                      HMAC-SHA256
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Token có chữ ký mật mã bảo vệ chống giả mạo, tự động hết hạn (24h mặc định / 7 ngày khi ghi nhớ). Mọi API nhạy cảm đều cần Bearer Header.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#34d399", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle size={13} />
                    <span>Phiên hiện tại: Đã xác thực hợp lệ</span>
                  </div>
                </div>

                {/* 3. Lá Chắn Chống Brute-Force */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <ShieldCheck size={18} color="#ef4444" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Khóa Dò Mật Khẩu IP
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(239, 68, 68, 0.15)",
                        color: "#f87171",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                      }}
                    >
                      Khóa 15 Phút
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Giới hạn tối đa 5 lần thử sai trên mỗi IP. Tự động trả về HTTP 429 Too Many Requests và khóa chặn đăng nhập tức thời.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                    Cơ chế: Sliding window memory rate limiter
                  </div>
                </div>

                {/* 4. Khử Mã Độc XSS & Input Sanitizer */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={18} color="#10b981" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Lọc Độc Hại XSS Sanitizer
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#34d399",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      XSS Cleaned
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Tẩy sạch toàn bộ thẻ HTML, script độc hại và javascript: trong tên, điện thoại, địa chỉ của khách hàng trước khi lưu vào DB.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                    Bảo vệ chống: Stored XSS &amp; HTML Injection
                  </div>
                </div>

                {/* 5. Bẫy Bot Honeypot & Anti-Spam */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Sparkles size={18} color="#c084fc" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Bẫy Honeypot &amp; Chống Spam
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(192, 132, 252, 0.15)",
                        color: "#c084fc",
                        border: "1px solid rgba(192, 132, 252, 0.3)",
                      }}
                    >
                      Rate: 10 req/5m
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Trường bẫy tàng hình trên form đặt hàng giúp nhận diện bot tự động cào dữ liệu và tiêu diệt thầm lặng mà không tốn tài nguyên DB.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                    Tích hợp: OrderModal + Public Inquiries API
                  </div>
                </div>

                {/* 6. Neon Cloud Postgres & S3 TLS/SSL */}
                <div
                  style={{
                    background: "rgba(3, 16, 48, 0.7)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Database size={18} color="#60a5fa" />
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                        Mã Hóa Đường Truyền SSL
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: "rgba(59, 130, 246, 0.15)",
                        color: "#60a5fa",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      TLS / SSL Require
                    </span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.5 }}>
                    Postgres Lakebase Connection Pooler và S3 Media Bucket chạy trên đường truyền TLS 1.3 bảo mật tại cụm máy chủ AWS ap-southeast-1.
                  </p>
                  <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                    Branch: {neonStatus?.branch || "production"} (Postgres 18.7)
                  </div>
                </div>
              </div>

              {/* BẢNG NHẬT KÝ KIỂM TOÁN THỜI GIAN THỰC (AUDIT TRAIL) */}
              <div
                style={{
                  background: "rgba(3, 16, 48, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(2, 10, 28, 0.8)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Activity size={18} color="#38bdf8" />
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                        Nhật Ký Truy Vết &amp; Kiểm Toán An Ninh (Audit Trail)
                      </h3>
                      <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>
                        Ghi nhận toàn bộ sự kiện đăng nhập, cập nhật đơn hàng và cảnh báo từ hệ thống
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#38bdf8",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    Tổng {auditLogs.length} sự kiện gần nhất
                  </span>
                </div>

                {loadingAuditLogs && auditLogs.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "13.5px" }}>
                    <RefreshCw size={24} style={{ animation: "spin 1s linear infinite", margin: "0 auto 10px" }} />
                    <p>Đang tải nhật ký kiểm toán từ Neon Postgres...</p>
                  </div>
                ) : auditLogs.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "13.5px" }}>
                    Chưa có nhật ký kiểm toán nào được ghi nhận.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "rgba(2, 12, 38, 0.9)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                          <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>
                            Thời Gian
                          </th>
                          <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>
                            Hành Động
                          </th>
                          <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>
                            Tài Khoản / IP
                          </th>
                          <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>
                            Chi Tiết Kỹ Thuật
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map((log) => {
                          const isSuccess = log.action === "LOGIN_SUCCESS";
                          const isFailed = log.action === "LOGIN_FAILED";
                          const isLeadUpdate = log.action === "LEAD_STATUS_UPDATED";

                          return (
                            <tr
                              key={log.id}
                              style={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              <td style={{ padding: "12px 16px", color: "#94a3b8", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                                {log.timestamp}
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                {isSuccess && (
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "5px",
                                      background: "rgba(16, 185, 129, 0.15)",
                                      color: "#34d399",
                                      padding: "3px 8px",
                                      borderRadius: "4px",
                                      fontWeight: 700,
                                      fontSize: "11.5px",
                                    }}
                                  >
                                    <CheckCircle size={12} /> Đăng nhập thành công
                                  </span>
                                )}
                                {isFailed && (
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "5px",
                                      background: "rgba(239, 68, 68, 0.15)",
                                      color: "#f87171",
                                      padding: "3px 8px",
                                      borderRadius: "4px",
                                      fontWeight: 700,
                                      fontSize: "11.5px",
                                    }}
                                  >
                                    <AlertTriangle size={12} /> Đăng nhập thất bại (Sai MK)
                                  </span>
                                )}
                                {isLeadUpdate && (
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "5px",
                                      background: "rgba(59, 130, 246, 0.15)",
                                      color: "#38bdf8",
                                      padding: "3px 8px",
                                      borderRadius: "4px",
                                      fontWeight: 700,
                                      fontSize: "11.5px",
                                    }}
                                  >
                                    <Edit size={12} /> Cập nhật trạng thái đơn
                                  </span>
                                )}
                                {!isSuccess && !isFailed && !isLeadUpdate && (
                                  <span
                                    style={{
                                      background: "rgba(255, 255, 255, 0.1)",
                                      color: "#cbd5e1",
                                      padding: "3px 8px",
                                      borderRadius: "4px",
                                      fontWeight: 600,
                                      fontSize: "11.5px",
                                    }}
                                  >
                                    {log.action}
                                  </span>
                                )}
                              </td>
                              <td style={{ padding: "12px 16px", color: "#cbd5e1" }}>
                                <div style={{ fontWeight: 600, fontSize: "13px" }}>{log.actor}</div>
                                <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>
                                  IP: {log.ip_address}
                                </div>
                              </td>
                              <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: "12px" }}>
                                {log.details ? (
                                  <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>
                                    {typeof log.details === "object"
                                      ? JSON.stringify(log.details)
                                      : String(log.details)}
                                  </span>
                                ) : (
                                  "-"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 8: QUẢN LÝ VIDEO THI CÔNG & YOUTUBE SHORTS                   */}
          {/* =============================================================== */}
          {activeTab === "videos" && (
            <div>
              {/* Header Tab */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      margin: "0 0 6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <VideoIcon size={24} color="#ef4444" />
                    <span>QUẢN LÝ VIDEO THI CÔNG &amp; YOUTUBE SHORTS</span>
                  </h1>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                    Hỗ trợ quản lý video dự án thi công và video ngắn (Shorts). Dán link YouTube để tự động lấy ID và ảnh thu nhỏ.
                  </p>
                </div>

                <button
                  onClick={openNewVideoModal}
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <Plus size={16} />
                  <span>Thêm Video / Shorts Mới</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: `Tất Cả (${(videos || []).length})` },
                    { id: "horizontal", label: `Video Dự Án (${(videos || []).filter((v) => v.type === "horizontal").length})` },
                    { id: "short", label: `Video Ngắn Shorts (${(videos || []).filter((v) => v.type === "short").length})` },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setVideoTypeFilter(btn.id)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "20px",
                        fontSize: "12.5px",
                        fontWeight: videoTypeFilter === btn.id ? 700 : 500,
                        border: videoTypeFilter === btn.id ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                        background: videoTypeFilter === btn.id ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 12, 38, 0.6)",
                        color: videoTypeFilter === btn.id ? "#38bdf8" : "#cbd5e1",
                        cursor: "pointer",
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(2, 12, 38, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    width: "100%",
                    maxWidth: "320px",
                  }}
                >
                  <Search size={15} color="#64748b" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Tìm theo tiêu đề, danh mục..."
                    value={videoSearch}
                    onChange={(e) => setVideoSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  />
                  {videoSearch && (
                    <button
                      onClick={() => setVideoSearch("")}
                      style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Videos Table */}
              <div
                style={{
                  background: "rgba(3, 16, 48, 0.85)",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "rgba(2, 12, 38, 0.95)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700, width: "120px" }}>
                        Ảnh / Loại
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700 }}>
                        Tiêu Đề &amp; YouTube ID
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700, width: "160px" }}>
                        Hạng Mục &amp; Thời Lượng
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700, width: "120px" }}>
                        Lượt Xem
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "right", color: "#94a3b8", fontWeight: 700, width: "120px" }}>
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdminVideos.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
                          Không có video nào trong danh sách.
                        </td>
                      </tr>
                    ) : (
                      filteredAdminVideos.map((vid) => {
                        const isShort = vid.type === "short";
                        return (
                          <tr
                            key={vid.id}
                            style={{
                              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                              transition: "background 0.15s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td style={{ padding: "12px 16px" }}>
                              <div
                                style={{
                                  position: "relative",
                                  width: isShort ? "56px" : "90px",
                                  aspectRatio: isShort ? "9 / 16" : "16 / 9",
                                  borderRadius: "6px",
                                  overflow: "hidden",
                                  background: "#01081a",
                                }}
                              >
                                <img
                                  src={vid.thumbnail}
                                  alt={vid.title}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: "2px",
                                    left: "2px",
                                    fontSize: "9px",
                                    fontWeight: 800,
                                    padding: "1px 4px",
                                    borderRadius: "3px",
                                    background: isShort ? "#ef4444" : "#2563eb",
                                    color: "#ffffff",
                                  }}
                                >
                                  {isShort ? "SHORTS" : "VIDEO"}
                                </div>
                              </div>
                            </td>

                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: "4px", lineHeight: 1.35 }}>
                                {vid.title}
                              </div>
                              <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "monospace" }}>
                                ID: {vid.youtubeId || "Chưa có"} | Slug: /video/{vid.slug}
                              </div>
                            </td>

                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ color: "#38bdf8", fontWeight: 600, marginBottom: "3px" }}>
                                {vid.category}
                              </div>
                              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                                {vid.duration}
                              </div>
                            </td>

                            <td style={{ padding: "12px 16px", color: "#cbd5e1", fontWeight: 600 }}>
                              {vid.views}
                            </td>

                            <td style={{ padding: "12px 16px", textAlign: "right" }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                                <Link
                                  to={`/video/${vid.slug}`}
                                  target="_blank"
                                  title="Xem trước trên website"
                                  style={{
                                    background: "rgba(59, 130, 246, 0.15)",
                                    color: "#38bdf8",
                                    border: "1px solid rgba(59, 130, 246, 0.3)",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                  }}
                                >
                                  <ExternalLink size={14} />
                                </Link>

                                <button
                                  onClick={() => openEditVideoModal(vid)}
                                  title="Chỉnh sửa video"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.08)",
                                    color: "#cbd5e1",
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Edit size={14} />
                                </button>

                                <button
                                  onClick={() => {
                                    if (window.confirm(`Bạn có chắc muốn xóa video "${vid.title}"?`)) {
                                      deleteVideo(vid.id);
                                      showToast("✓ Đã xóa video thành công!");
                                    }
                                  }}
                                  title="Xóa video"
                                  style={{
                                    background: "rgba(239, 68, 68, 0.15)",
                                    color: "#f87171",
                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: SOẠN THẢO / CHỈNH SỬA BÀI VIẾT CHUẨN SEO                     */}
      {/* ===================================================================== */}
      {articleModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              background: "#031030",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "1050px",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                background: "#031030",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={20} color="#38bdf8" />
                <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "#fff" }}>
                  {editingArticle ? "Chỉnh Sửa Bài Viết Chuẩn SEO" : "Soạn Bài Viết Mới Chuẩn SEO"}
                </h3>
              </div>
              <button
                onClick={() => setArticleModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: 2 Cột (Form Nội Dung + Trợ Lý Phân Tích SEO) */}
            <form onSubmit={handleSaveArticle} style={{ padding: "24px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px" }}>
              {/* CỘT TRÁI: FORM NỘI DUNG */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Tiêu Đề Bài Viết (H1) <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Quy Trình Thi Công Sơn Epoxy Tự San Phẳng Chuẩn Nhật Bản"
                    value={articleForm.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Từ Khóa Chính (Focus Keyword) <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: sơn epoxy tự san phẳng"
                      value={articleForm.focusKeyword}
                      onChange={(e) => setArticleForm({ ...articleForm, focusKeyword: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(59, 130, 246, 0.4)",
                        background: "rgba(2, 14, 42, 0.9)",
                        color: "#38bdf8",
                        fontWeight: 700,
                        fontSize: "13.5px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Đường Dẫn URL (Slug) <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={articleForm.slug}
                      onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.9)",
                        color: "#94a3b8",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Chuyên Mục / Tag
                    </label>
                    <select
                      value={articleForm.tag}
                      onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "#020e2a",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    >
                      <option value="Epoxy">Sơn Epoxy</option>
                      <option value="Chống Thấm">Chống Thấm PU</option>
                      <option value="Chống Cháy">Chống Cháy Kết Cấu</option>
                      <option value="Sân Thể Thao">Sân Thể Thao / Tennis</option>
                      <option value="Kỹ Thuật">Kỹ Thuật &amp; Tiêu Chuẩn</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                      Ảnh Bìa Đại Diện (URL)
                    </label>
                    <input
                      type="text"
                      value={articleForm.img}
                      onChange={(e) => setArticleForm({ ...articleForm, img: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(2, 14, 42, 0.9)",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>

                {/* Đoạn trích dẫn tóm tắt */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Tóm Tắt Ngắn Bài Viết
                  </label>
                  <textarea
                    rows={2}
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    placeholder="Mô tả súc tích nội dung bài viết..."
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                </div>

                {/* Nội dung chi tiết (HTML) */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Nội Dung Chi Tiết (Hỗ trợ định dạng thẻ HTML: h2, h3, p, ul, li)
                  </label>
                  <textarea
                    rows={8}
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#cbd5e1",
                      fontSize: "13px",
                      fontFamily: "monospace",
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  <Save size={16} />
                  <span>{editingArticle ? "Cập Nhật Bài Viết SEO" : "Xuất Bản Bài Viết Mới"}</span>
                </button>
              </div>

              {/* CỘT PHẢI: TRỢ LÝ PHÂN TÍCH SEO GOOGLE & SERP PREVIEW */}
              <div
                style={{
                  background: "rgba(2, 12, 38, 0.8)",
                  borderRadius: "10px",
                  padding: "18px",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Điểm SEO Tổng Quan */}
                <div
                  style={{
                    background: "rgba(8, 22, 54, 0.9)",
                    borderRadius: "8px",
                    padding: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "11.5px", color: "#94a3b8", fontWeight: 600 }}>ĐIỂM CHUẨN SEO GOOGLE</div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: seoAnalysis.score >= 80 ? "#34d399" : seoAnalysis.score >= 50 ? "#fbbf24" : "#f87171" }}>
                      {seoAnalysis.score >= 80 ? "Xuất sắc (Top Google)" : seoAnalysis.score >= 50 ? "Khá (Cần bổ sung)" : "Cần tối ưu thêm"}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: seoAnalysis.score >= 80 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                      border: `2px solid ${seoAnalysis.score >= 80 ? "#34d399" : "#fbbf24"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "16px",
                      color: seoAnalysis.score >= 80 ? "#34d399" : "#fbbf24",
                    }}
                  >
                    {seoAnalysis.score}
                  </div>
                </div>

                {/* Google SERP Snippet Preview */}
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={13} />
                    <span>Xem Trước Kết Quả Tìm Kiếm Google</span>
                  </div>
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      color: "#202124",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <div style={{ fontSize: "12px", color: "#202124", marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontWeight: 600 }}>fujinano.vn</span>
                      <span style={{ color: "#5f6368" }}>› tin-tuc › {articleForm.slug || "url-bai-viet"}</span>
                    </div>
                    <div style={{ fontSize: "16px", color: "#1a0dab", fontWeight: 500, lineHeight: 1.3, marginBottom: "4px" }}>
                      {articleForm.metaTitle || articleForm.title || "Tiêu Đề Bài Viết Chuẩn SEO"}
                    </div>
                    <div style={{ fontSize: "13px", color: "#4d5156", lineHeight: 1.4 }}>
                      {articleForm.metaDescription || articleForm.excerpt || "Đoạn văn trích dẫn hiển thị trên trang tìm kiếm Google..."}
                    </div>
                  </div>
                </div>

                {/* Thẻ Meta Title Input */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#cbd5e1" }}>Thẻ Tiêu Đề SEO (Meta Title)</span>
                    <span style={{ color: (articleForm.metaTitle || "").length >= 40 && (articleForm.metaTitle || "").length <= 65 ? "#34d399" : "#fbbf24" }}>
                      {(articleForm.metaTitle || "").length}/65 ký tự
                    </span>
                  </div>
                  <input
                    type="text"
                    value={articleForm.metaTitle}
                    onChange={(e) => setArticleForm({ ...articleForm, metaTitle: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#fff",
                      fontSize: "12.5px",
                    }}
                  />
                </div>

                {/* Thẻ Meta Description Input */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#cbd5e1" }}>Thẻ Mô Tả (Meta Description)</span>
                    <span style={{ color: (articleForm.metaDescription || "").length >= 120 && (articleForm.metaDescription || "").length <= 165 ? "#34d399" : "#fbbf24" }}>
                      {(articleForm.metaDescription || "").length}/165 ký tự
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={articleForm.metaDescription}
                    onChange={(e) => setArticleForm({ ...articleForm, metaDescription: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#cbd5e1",
                      fontSize: "12.5px",
                    }}
                  />
                </div>

                {/* Checklist Các Tiêu Chí SEO */}
                <div style={{ marginTop: "4px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginBottom: "8px" }}>
                    TIÊU CHÍ ĐÁNH GIÁ GOOGLE:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {seoAnalysis.checks.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          color: c.passed ? "#34d399" : "#94a3b8",
                        }}
                      >
                        {c.passed ? (
                          <CheckCircle size={14} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                        ) : (
                          <AlertTriangle size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: "2px" }} />
                        )}
                        <div>
                          <div style={{ fontWeight: c.passed ? 600 : 400 }}>{c.label}</div>
                          {!c.passed && (
                            <div style={{ fontSize: "11px", color: "#fbbf24", opacity: 0.85 }}>
                              {c.tip}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: CHỈNH SỬA SẢN PHẨM & GIÁ SỈ                                  */}
      {/* ===================================================================== */}
      {productModalOpen && editingProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              background: "#031030",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "720px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Package size={20} color="#38bdf8" />
                <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0 }}>
                  Sửa Giá &amp; Thông Tin: {editingProduct.shortName}
                </h3>
              </div>
              <button
                onClick={() => setProductModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                  Tên Ngắn Gọn (Hiển thị trên Card)
                </label>
                <input
                  type="text"
                  required
                  value={productForm.shortName}
                  onChange={(e) => setProductForm({ ...productForm, shortName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(2, 14, 42, 0.9)",
                    color: "#fff",
                    fontSize: "13.5px",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                  Tên Đầy Đủ &amp; Tính Năng
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(2, 14, 42, 0.9)",
                    color: "#fff",
                    fontSize: "13.5px",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Giá Bán Sỉ Thực Tế (VNĐ) <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(59, 130, 246, 0.4)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#38bdf8",
                      fontWeight: 800,
                      fontSize: "15px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Giá Gốc Niêm Yết (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#94a3b8",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Số Lượng Tồn Kho (Thùng)
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#34d399",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Danh Mục Sơn
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.id === e.target.value);
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        categoryName: cat ? cat.name : productForm.categoryName,
                      });
                    }}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "#020e2a",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <Save size={16} />
                <span>Lưu Thay Đổi Thùng Sơn</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: THÊM / CHỈNH SỬA VIDEO THI CÔNG & YOUTUBE SHORTS             */}
      {/* ===================================================================== */}
      {videoModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              background: "#031030",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(2, 8, 22, 0.9)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <VideoIcon size={20} color="#ef4444" />
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
                  {editingVideo ? "CHỈNH SỬA VIDEO / SHORTS" : "THÊM VIDEO / SHORTS MỚI"}
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveVideo} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* YouTube URL input with auto-parser */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                  Đường Dẫn YouTube (URL) *
                </label>
                <input
                  type="text"
                  placeholder="Dán link YouTube (VD: https://www.youtube.com/watch?v=... hoặc https://www.youtube.com/shorts/...)"
                  value={videoForm.youtubeUrl}
                  onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(2, 14, 42, 0.9)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                  }}
                />
                <span style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "4px", display: "block" }}>
                  Hệ thống tự động phát hiện Video Dự Án hoặc Video Ngắn (Shorts) và trích xuất YouTube ID.
                </span>
              </div>

              {/* Type and YouTube ID */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Định Dạng Video *
                  </label>
                  <select
                    value={videoForm.type}
                    onChange={(e) => setVideoForm({ ...videoForm, type: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "13.5px",
                    }}
                  >
                    <option value="horizontal">🎬 Video Dự Án (Quy trình, Công trình toàn cảnh)</option>
                    <option value="short">⚡ Video Ngắn Shorts (Thử nghiệm nhanh dưới 60s)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Mã YouTube ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: V1bFr2KGq1g"
                    value={videoForm.youtubeId}
                    onChange={(e) =>
                      setVideoForm({
                        ...videoForm,
                        youtubeId: e.target.value.trim(),
                        thumbnail: `https://img.youtube.com/vi/${e.target.value.trim()}/hqdefault.jpg`,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#38bdf8",
                      fontFamily: "monospace",
                      fontSize: "13.5px",
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                  Tiêu Đề Video *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề video thi công hoặc mẹo kỹ thuật..."
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(2, 14, 42, 0.9)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                  }}
                />
              </div>

              {/* Category, Duration, Views */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Hạng Mục
                  </label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  >
                    <option value="Sơn Sàn Epoxy">Sơn Sàn Epoxy</option>
                    <option value="Chống Thấm PU">Chống Thấm PU</option>
                    <option value="Sân Thể Thao">Sân Thể Thao</option>
                    <option value="Sơn Chống Cháy">Sơn Chống Cháy</option>
                    <option value="Sơn Kẻ Vạch">Sơn Kẻ Vạch</option>
                    <option value="Thử Nghiệm Kỹ Thuật">Thử Nghiệm Kỹ Thuật</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Thời Lượng (VD: 04:30)
                  </label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Lượt Xem Hiển Thị
                  </label>
                  <input
                    type="text"
                    value={videoForm.views}
                    onChange={(e) => setVideoForm({ ...videoForm, views: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              {/* Thumbnail URL & Author */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Ảnh Thu Nhỏ (Thumbnail URL)
                  </label>
                  <input
                    type="text"
                    value={videoForm.thumbnail}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "12.5px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                    Tác Giả / Người Quay
                  </label>
                  <input
                    type="text"
                    value={videoForm.author}
                    onChange={(e) => setVideoForm({ ...videoForm, author: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(2, 14, 42, 0.9)",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                  Mô Tả Kỹ Thuật Chi Tiết
                </label>
                <textarea
                  rows={4}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Mô tả các bước thi công, tiêu chuẩn kiểm nghiệm hoặc kết quả thử nghiệm đạt được..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(2, 14, 42, 0.9)",
                    color: "#ffffff",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Thumbnail Live Preview */}
              {videoForm.thumbnail && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(2, 10, 28, 0.6)", padding: "10px", borderRadius: "8px" }}>
                  <img
                    src={videoForm.thumbnail}
                    alt="Preview"
                    style={{
                      width: videoForm.type === "short" ? "45px" : "80px",
                      aspectRatio: videoForm.type === "short" ? "9 / 16" : "16 / 9",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    <div>Preview ảnh thu nhỏ: <strong style={{ color: "#ffffff" }}>{videoForm.type === "short" ? "Video Ngắn (Shorts)" : "Video Dự Án"}</strong></div>
                    <div>YouTube ID: <code style={{ color: "#38bdf8" }}>{videoForm.youtubeId || "chưa nhập"}</code></div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "6px",
                    fontSize: "13.5px",
                    cursor: "pointer",
                  }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 22px",
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <Save size={15} />
                  <span>{editingVideo ? "Lưu Cập Nhật Video" : "Thêm Video Mới"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ===================================================================== */}
      {/* MODAL 4: CHI TIẾT LEAD & GHI CHÚ TƯ VẤN KHÁCH HÀNG                    */}
      {/* ===================================================================== */}
      {inquiryModalOpen && selectedInquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              background: "#021438",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "560px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(6, 20, 52, 0.6)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#38bdf8",
                  }}
                >
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                    Chi Tiết Yêu Cầu Báo Giá
                  </h3>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Tiếp nhận lúc: {selectedInquiry.date}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInquiryModalOpen(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: "#94a3b8",
                  borderRadius: "6px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Customer Info Card */}
              <div
                style={{
                  background: "rgba(6, 20, 52, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Họ Tên / Đơn Vị
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginTop: "3px" }}>
                    {selectedInquiry.name}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Số Điện Thoại
                  </div>
                  <div style={{ marginTop: "3px" }}>
                    <a
                      href={`tel:${(selectedInquiry.phone || "").replace(/[^0-9+]/g, "")}`}
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: "#22c55e",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      title="Bấm để gọi điện ngay"
                    >
                      <Phone size={13} />
                      <span>{selectedInquiry.phone}</span>
                    </a>
                  </div>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Sản Phẩm Quan Tâm
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#38bdf8", marginTop: "3px" }}>
                    {selectedInquiry.product || selectedInquiry.topic || "Tư vấn sơn công nghiệp"}
                    {selectedInquiry.quantity ? ` (${selectedInquiry.quantity} thùng)` : ""}
                    {selectedInquiry.area ? ` • Diện tích: ${selectedInquiry.area}` : ""}
                  </div>
                </div>

                {selectedInquiry.email && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                      Email
                    </div>
                    <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "2px" }}>
                      {selectedInquiry.email}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Trạng Thái Xử Lý:
                </label>
                <select
                  value={inquiryStatusSelect}
                  onChange={(e) => setInquiryStatusSelect(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(6, 20, 52, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    outline: "none",
                  }}
                >
                  <option value="pending" style={{ background: "#061434" }}>🔴 Chờ gọi lại (Khách mới)</option>
                  <option value="contacted" style={{ background: "#061434" }}>🟡 Đã liên hệ tư vấn / Gửi bảng giá</option>
                  <option value="completed" style={{ background: "#061434" }}>🟢 Đã chốt đơn thành công</option>
                  <option value="cancelled" style={{ background: "#061434" }}>⚪ Hủy yêu cầu / Sai số</option>
                </select>
              </div>

              {/* Notes Textarea */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Ghi Chú Trao Đổi Bán Hàng:
                </label>
                <textarea
                  rows={4}
                  value={inquiryNotesText}
                  onChange={(e) => setInquiryNotesText(e.target.value)}
                  placeholder="Ví dụ: Đã gọi lúc 9h30, tư vấn sơn sàn Epoxy 18L cho công trình 400m2. Khách hẹn gửi mẫu màu và báo giá chiết khấu thầu thợ qua Zalo..."
                  style={{
                    width: "100%",
                    background: "rgba(6, 20, 52, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#ffffff",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    resize: "vertical",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 22px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(6, 20, 52, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <a
                href={`tel:${(selectedInquiry.phone || "").replace(/[^0-9+]/g, "")}`}
                style={{
                  background: "#16a34a",
                  color: "#ffffff",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} />
                <span>Gọi Khách ({selectedInquiry.phone})</span>
              </a>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#cbd5e1",
                    border: "none",
                    borderRadius: "8px",
                    padding: "9px 16px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleSaveInquiryNotes}
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "9px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Save size={14} />
                  <span>Lưu Ghi Chú</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
