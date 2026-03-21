import React from "react";
import { 
  LayoutDashboard, 
  Satellite, 
  Map, 
  ShieldAlert, 
  Users, 
  Send, 
  BarChart3, 
  FileCheck, 
  Database, 
  ClipboardList,
  User,
  Bell,
  Search,
  Menu,
  ArrowRight,
  Leaf
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const OfficerLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t("sidebar.overview") || "Dashboard", path: "/dashboard/officer", exact: true },
    { icon: Map, label: "Regional Intel Map", path: "/dashboard/officer/intel-map" },
    { icon: ShieldAlert, label: "Disease Monitoring", path: "/dashboard/officer/disease-monitoring" },
    { icon: Users, label: "Farmer Support", path: "/dashboard/officer/requests" },
    { icon: Send, label: "Advisory Broadcast", path: "/dashboard/officer/broadcast" },
    { icon: BarChart3, label: "Crop Analytics", path: "/dashboard/officer/analytics" },
    { icon: FileCheck, label: "Government Schemes", path: "/dashboard/officer/schemes" },
    { icon: Database, label: "Farmer Database", path: "/dashboard/officer/database" },
    { icon: ClipboardList, label: "Inspection Reports", path: "/dashboard/officer/inspections" },
    { icon: User, label: "Profile", path: "/dashboard/officer/profile" },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f5] font-sans antialiased text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR - Desktop */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className="hidden lg:flex w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 flex-col p-6 transition-all z-50 overflow-y-auto"
      >
        <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"
          >
            <Satellite size={24} fill="currentColor" />
          </motion.div>
          <span className="text-2xl font-black tracking-tight text-slate-900">Farmora <span className="text-blue-600">HQ</span></span>
        </div>

        <nav className="space-y-1 flex-1">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path}>
              <motion.button 
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${isActive(item.path, item.exact) ? 'text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                {isActive(item.path, item.exact) && (
                  <motion.div 
                    layoutId="activeNavOfficer"
                    className="absolute inset-0 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-4">
                  <item.icon size={20} className={isActive(item.path, item.exact) ? 'text-white' : ''} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              </motion.button>
            </Link>
          ))}
        </nav>

        <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Command Center</p>
            <p className="text-sm font-black mb-3">Regional Security Level: <span className="text-emerald-400">Optimal</span></p>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs transition-colors">Alert Protocol</button>
        </div>
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
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Satellite size={24} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black tracking-tight text-slate-900 capitalize">Officer Center</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400"><ArrowRight className="rotate-180" size={24} /></button>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item, i) => (
                  <Link key={i} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <button className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${isActive(item.path, item.exact) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-blue-50'}`}>
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
              <span className="font-black tracking-tight">HQ</span>
           </div>

           <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
              <div className="relative w-full group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search farmers, villages, or reports..." 
                  className="w-full pl-12 pr-6 py-2.5 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium"
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
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Regional Officer</p>
                   <p className="text-xs font-black text-slate-900">Rakesh Mohanty</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 overflow-hidden shadow-sm cursor-pointer">
                  <img src="https://ui-avatars.com/api/?name=Rakesh+Mohanty&background=2563eb&color=fff" alt="Officer" />
                </div>
              </div>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;
