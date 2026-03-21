import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Satellite, ShoppingBag, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";

// Role Images
import roleFarmerImg from "../../assets/images/role_farmer.png";
import roleOfficerImg from "../../assets/images/role_officer.png";
import roleMarketplaceImg from "../../assets/images/role_marketplace.png";

const RoleCard = ({ title, description, icon: Icon, image, objectPosition = "center", onClick, colorClass, t }) => (
  <button
    onClick={onClick}
    className="group relative w-full md:w-1/3 bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_22px_70px_rgba(0,0,0,0.06)] hover:bg-white overflow-hidden"
  >
    {/* Gradient Glow */}
    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${colorClass}`} />
    
    {/* Image Container */}
    <div className="relative h-56 -mx-10 -mt-10 mb-8 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        style={{ objectPosition }}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
      
      {/* Icon Badge */}
      <div className={`absolute bottom-4 left-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 shadow-xl ${colorClass} text-white`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
    </div>
    
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-emerald-700 transition-colors">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed mb-8">{description}</p>
    

    {/* Selection border/glow overlay */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/10 rounded-[2.5rem] transition-colors pointer-events-none" />
  </button>
);

const RoleSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      if (user.role === "farmer") navigate("/dashboard/farmer");
      else if (user.role === "officer") navigate("/dashboard/officer");
    }
  }, []);

  const handleSelect = (rolePath) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    // Update local role for the mock session
    const updatedUser = { ...user, role: rolePath.split('/').pop() };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate(rolePath);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased overflow-hidden flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[140px] opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-8 lg:px-20 py-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10 transition-transform group-hover:rotate-12">
            <Leaf size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">Farmora</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm">
            <Globe size={18} className="text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t("role.globalNetwork")}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-[0.2em] border border-emerald-100">
            <CheckCircle2 size={14} /> {t("role.badge")}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">
            {t("role.question")} <br />
            <span className="text-emerald-600">Farmora?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {t("role.description")}
          </p>
        </div>

        {/* ROLE GRID */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 px-4">
          <RoleCard
            title={t("role.farmer.title")}
            description={t("role.farmer.desc")}
            icon={Leaf}
            image={roleFarmerImg}
            objectPosition="center"
            colorClass="bg-emerald-600"
            onClick={() => handleSelect("/onboarding/farmer")}
            t={t}
          />
          <RoleCard
            title={t("role.officer.title")}
            description={t("role.officer.desc")}
            icon={Satellite}
            image={roleOfficerImg}
            objectPosition="center"
            colorClass="bg-blue-600"
            onClick={() => handleSelect("/verify/officer")}
            t={t}
          />
          <RoleCard
            title={t("role.marketplace.title")}
            description={t("role.marketplace.desc")}
            icon={ShoppingBag}
            image={roleMarketplaceImg}
            objectPosition="center"
            colorClass="bg-amber-600"
            onClick={() => handleSelect("/verify/buyer")}
            t={t}
          />
        </div>
      </main>

      {/* FOOTER ACCENT */}
      <div className="relative z-10 py-12 text-center">
        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
          Powered by Sovereign Intelligence Protocol
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;