import React from "react";
import { 
  LayoutDashboard, 
  Sprout, 
  AlertTriangle, 
  BarChart3, 
  Calendar, 
  ShoppingBag, 
  Settings as SettingsIcon,
  Leaf,
  CloudSun,
  FlaskConical,
  ScanSearch,
  Map,
  FileText,
  Users,
  MessageSquare,
  UserCheck,
  User,
  Bell,
  Search,
  ArrowRight,
  Menu
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const FarmerLayout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t("sidebar.overview"), path: "/dashboard/farmer", active: location.pathname === "/dashboard/farmer" },
    { icon: Sprout, label: t("farmer.tools.placeholders.cropPlanning"), path: "/dashboard/farmer/crop-planning" },
    { icon: BarChart3, label: t("farmer.tools.placeholders.decisionSimulator"), path: "/dashboard/farmer/simulator" },
    { icon: CloudSun, label: t("farmer.tools.placeholders.weatherAdvisory"), path: "/dashboard/farmer/weather" },
    { icon: FlaskConical, label: t("farmer.tools.placeholders.fertilizerOptimization"), path: "/dashboard/farmer/fertilizer" },
    { icon: ScanSearch, label: t("farmer.dashboard.tools.openScanner"), path: "/dashboard/farmer/disease-scanner" },
    { icon: Map, label: t("farmer.dashboard.tools.openMap"), path: "/dashboard/farmer/disease-map" },
    { icon: ShoppingBag, label: t("navbar.marketplace"), path: "/dashboard/farmer/marketplace" },
    { icon: FileText, label: t("farmer.tools.placeholders.govtSchemes"), path: "/dashboard/farmer/schemes" },
    { icon: Users, label: t("farmer.tools.placeholders.community"), path: "/dashboard/farmer/community" },
    { icon: MessageSquare, label: t("farmer.tools.placeholders.aiAssistant"), path: "/dashboard/farmer/ai-assistant" },
    { icon: UserCheck, label: t("farmer.tools.placeholders.expertConsultation"), path: "/dashboard/farmer/experts" },
    { icon: User, label: t("farmer.tools.placeholders.farmProfile"), path: "/dashboard/farmer/profile" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR - Desktop */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className="hidden lg:flex w-72 bg-white/50 backdrop-blur-md border-r border-slate-200 flex-col p-6 transition-all z-50 overflow-y-auto"
      >
        <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg"
          >
            <Leaf size={24} fill="currentColor" />
          </motion.div>
          <span className="text-2xl font-black tracking-tight text-slate-900">{t("app.name")}</span>
        </div>

        <nav className="space-y-1 flex-1">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path}>
              <motion.button 
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${item.active ? 'text-white' : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
              >
                {item.active && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-4">
                  <item.icon size={20} className={item.active ? 'text-white' : ''} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              </motion.button>
            </Link>
          ))}
        </nav>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 text-white text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">{t("dashboard.farmer.upgradePlan")}</p>
          <p className="text-sm font-black mb-4">{t("dashboard.farmer.upgradeDesc")}</p>
          <button className="w-full py-2 bg-white text-emerald-700 rounded-xl font-bold text-sm shadow-lg">{t("dashboard.farmer.upgradeNow")}</button>
        </motion.div>
      </motion.aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl p-6 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Leaf size={24} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black tracking-tight text-slate-900">{t("app.name")}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400"><ArrowRight className="rotate-180" size={24} /></button>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item, i) => (
                  <Link key={i} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <button className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-emerald-50'}`}>
                      <item.icon size={20} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* SHARED HEADER */}
        <header className="h-20 shrink-0 border-b border-slate-200 bg-white/70 backdrop-blur-md px-6 md:px-10 flex items-center justify-between z-40">
           <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Menu size={20} />
              </button>
              <span className="font-black tracking-tight">{t("app.name")}</span>
           </div>

           <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
              <div className="relative w-full group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder={t("dashboard.farmer.searchPlaceholder")} 
                  className="w-full pl-12 pr-6 py-2.5 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <motion.button whileHover={{ scale: 1.05 }} className="relative p-2.5 bg-white rounded-2xl border border-slate-200 text-slate-500 shadow-sm">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </motion.button>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm border border-emerald-200 shadow-sm cursor-pointer">
                FJ
              </div>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>

      {/* PERSISTENT AI ASSISTANT FAB */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100]"
      >
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {}} // Could toggle a panel here
          className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white relative group"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-emerald-400 rounded-full -z-10 opacity-20"
          />
          <MessageSquare size={32} />
          
          {/* TOOLTIP prefix */}
          <div className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shadow-xl">
             {t("farmer.tools.placeholders.aiAssistant")}
          </div>
        </motion.button>
      </motion.div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around px-4 z-[50] lg:hidden">
        {menuItems.slice(0, 5).map((item, i) => (
          <Link key={i} to={item.path} className={`flex flex-col items-center gap-1 ${item.active ? 'text-emerald-600' : 'text-slate-400'}`}>
            <item.icon size={22} />
            <span className="text-[10px] font-bold">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FarmerLayout;
