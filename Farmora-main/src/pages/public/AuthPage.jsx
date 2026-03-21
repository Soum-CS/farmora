import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Github, Chrome, ArrowRight, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { login as apiLogin, register as apiRegister } from "../../api";
import authBgImage from "../../assets/images/auth-bg.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "farmer") navigate("/dashboard/farmer");
      else if (user.role === "officer") navigate("/dashboard/officer");
      else navigate("/choose-role");
    }
  }, []);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        // Real backend login
        const data = await apiLogin(formData.email, formData.password);
        const userObj = {
          ...data.user,
          token: data.token,
          verificationStatus: "verified"
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", data.token);
        // Navigate based on role
        if (data.user.role === "farmer") navigate("/dashboard/farmer");
        else if (data.user.role === "officer") navigate("/dashboard/officer");
        else navigate("/choose-role");
      } else {
        // Real backend register
        const data = await apiRegister(formData.fullName, formData.email, formData.password, null);
        // After register, auto-login to get token
        const loginData = await apiLogin(formData.email, formData.password);
        const userObj = {
          ...loginData.user,
          token: loginData.token,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", loginData.token);
        navigate("/choose-role");
      }
    } catch (err) {
      console.error("Auth error:", err);
      // Fallback to mock auth if backend is down
      setAuthError("Backend unavailable — using offline mode");
      const mockUser = {
        name: formData.fullName || "User",
        email: formData.email,
        role: null,
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setTimeout(() => navigate("/choose-role"), 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans antialiased overflow-hidden bg-[#fdfcf0]">
      {/* LEFT: Visual Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-forest-900">
        <img
          src={authBgImage}
          alt="Agriculture Tech"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top right, rgba(15, 23, 42, 0.85) 0%, rgba(22, 101, 52, 0.7) 50%, rgba(15, 23, 42, 0.6) 100%)' }} />
        
        <div className="relative z-10 m-auto text-center px-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            AI-Powered Intelligence
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            {t("auth.cultivating")} <br />
            <span className="text-emerald-300">{t("auth.digitalHarvest")}</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed">
            {t("auth.joinThousands")}
          </p>
        </div>
      </div>

      {/* RIGHT: Auth Card Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        {/* Abstract shapes in background */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[10%] w-[300px] h-[300px] bg-amber-100 rounded-full blur-[80px] opacity-50" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Leaf size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">Farmora</span>
            </Link>
            <h2 className="text-3xl font-black text-slate-900 mb-2">{t("auth.welcome")}</h2>
            <p className="text-slate-500 font-medium">{t("auth.subtitle")}</p>
          </div>

          {/* GLASSMORPHISM CARD */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white/30 rounded-[2rem] p-8 shadow-2xl shadow-emerald-900/5">
            <div className="space-y-4 mb-8">
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all hover:border-emerald-300 active:scale-[0.98]">
                <Chrome className="text-emerald-600" size={20} />
                {t("auth.google")}
              </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-slate-200" />
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t("auth.orWithEmail")}</span>
              <div className="flex-1 h-[1px] bg-slate-200" />
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">{t("auth.fullName")}</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">{t("auth.email")}</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">{t("auth.password")}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4"
              >
                {isLogin ? t("auth.signIn") : t("auth.createAccount")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>

            <p className="text-center mt-8 text-slate-500 font-semibold">
              {isLogin ? "Don't have an account?" : t("auth.alreadyHaveAccount")}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 hover:text-emerald-700 font-black decoration-2 underline-offset-4 hover:underline"
              >
                {isLogin ? "Sign up" : t("auth.signIn")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
