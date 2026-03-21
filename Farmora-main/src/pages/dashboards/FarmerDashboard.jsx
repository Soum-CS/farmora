import React, { useState, useEffect } from "react";
import { 
  Leaf, 
  Search, 
  Bell, 
  Grid, 
  Sprout, 
  Droplets, 
  TrendingUp, 
  TrendingDown,
  CloudRain,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  ChevronRight,
  Plus,
  IndianRupee,
  Loader2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getFarmerDashboard } from "../../api";

// Icon map for rendering dynamic icons from backend
const ICON_MAP = {
  Grid, Sprout, CloudRain, Droplets, AlertTriangle, TrendingUp, TrendingDown
};

// Hardcoded fallback data (used when backend is down)
const FALLBACK = {
  user: { name: "Farmer" },
  stats: [
    { label: "farmSize", value: "12.5 Acres", icon: "Grid", color: "emerald" },
    { label: "currentCrop", value: "Rice (Paddy)", icon: "Sprout", color: "amber" },
    { label: "weather", value: "28°C / 74%", icon: "CloudRain", color: "blue" },
    { label: "nextIrrigation", value: "In 2 Days", icon: "Droplets", color: "cyan" },
  ],
  marketTrends: [
    { label: "Paddy", price: "₹2240 / quintal", trend: "up" },
    { label: "Wheat", price: "₹2125 / quintal", trend: "up" },
    { label: "Maize", price: "₹1960 / quintal", trend: "down" },
  ],
  schemes: [
    { title: "PM-Kisan Samman Nidhi", dept: "Central Govt", status: "Eligible" },
    { title: "Crop Insurance 2024", dept: "State Govt", status: "Eligible" },
  ],
  communityPosts: [
    { user: "Ramesh K.", action: "posted in Rice Growers", time: "2h ago", preview: "Anyone seeing brown spots on leaves?" },
    { user: "Suresh M.", action: "shared a tip", time: "5h ago", preview: "Try organic mulch for better moisture." },
  ],
  riskAlerts: [
    { type: "pest", title: "Pest Outbreak Warning", description: "Predicted in Village Area", icon: "Droplets", severity: "high" },
    { type: "weather", title: "Heavy Rain Alert", description: "Heavy Rain forecast in 48h", icon: "CloudRain", severity: "medium" },
  ],
  aiInsights: {
    optimalSowing: { description: "Best sowing window opens in 4 days", progress: 70 },
    fertilizerEfficiency: { description: "Reduce urea by 15%", progress: 85 }
  },
  salesSnapshot: { totalEarnings: 184000, activeListings: 3, pendingOrders: 1 }
};

// Translation key map for stat labels
const STAT_LABEL_MAP = {
  farmSize: "farmer.dashboard.stats.farmSize",
  currentCrop: "farmer.dashboard.stats.currentCrop",
  weather: "farmer.dashboard.stats.weather",
  nextIrrigation: "farmer.dashboard.stats.nextIrrigation"
};

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        const token = stored.token || localStorage.getItem("token");
        if (token) {
          const data = await getFarmerDashboard(token);
          setDashboardData(data);
        } else {
          // No token — use fallback
          setDashboardData(FALLBACK);
        }
      } catch (err) {
        console.warn("Dashboard API unavailable, using fallback data:", err.message);
        setError(err.message);
        setDashboardData(FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Use API data or fallback
  const data = dashboardData || FALLBACK;
  const userName = data.user?.name || "Farmer";
  const stats = data.stats || FALLBACK.stats;
  const marketTrends = data.marketTrends || FALLBACK.marketTrends;
  const schemes = data.schemes || FALLBACK.schemes;
  const communityPosts = data.communityPosts || FALLBACK.communityPosts;
  const riskAlerts = data.riskAlerts || FALLBACK.riskAlerts;
  const aiInsights = data.aiInsights || FALLBACK.aiInsights;
  const salesSnapshot = data.salesSnapshot || FALLBACK.salesSnapshot;

  // Format earnings display
  const formatEarnings = (amount) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 size={40} className="text-emerald-500 animate-spin" />
          <p className="text-slate-500 font-bold text-sm">Loading your farm dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* WELCOME SECTION */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Leaf size={300} className="text-emerald-500 translate-x-1/2 -translate-y-1/2 rotate-12" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
            <ShieldCheck size={14} /> {t("farmer.verification.badge")}
          </div>
          
          {/* Error banner */}
          {error && (
            <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
              ⚠ Using offline data — backend unavailable
            </div>
          )}

          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              {t("farmer.dashboard.welcome")}, <span className="text-emerald-400">{userName}</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-lg">
              {t("farmer.dashboard.readyToOptimize")}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate("disease-scanner")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/40 active:scale-95"
            >
              {t("farmer.dashboard.tools.scanDisease")} <ArrowRight size={18} />
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl font-bold border border-white/10 transition-all active:scale-95">
              {t("farmer.dashboard.aiInsights.openPlanning")}
            </button>
            <button 
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                localStorage.setItem("user", JSON.stringify({ ...user, role: "officer", verificationStatus: "verified" }));
                window.location.href = "/dashboard/officer";
              }}
              className="px-6 py-3 text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              (Dev Bypass: Skip to Officer)
            </button>
          </div>
        </div>
      </section>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const IconComponent = ICON_MAP[stat.icon] || Grid;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 hover:border-emerald-200 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                <IconComponent size={24} />
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                {STAT_LABEL_MAP[stat.label] ? t(STAT_LABEL_MAP[stat.label]) : stat.label}
              </p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN INSIGHTS */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI INSIGHTS CARD */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 p-8 relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <Grid size={20} />
                   </div>
                   <h2 className="text-xl font-black text-slate-900 tracking-tight">{t("farmer.dashboard.aiInsights.title")}</h2>
                </div>
                <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                   {t("platform.aiRecommendation")} <ChevronRight size={14} />
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-3">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("farmer.dashboard.aiInsights.optimalSowing")}</p>
                   <p className="text-sm font-bold text-slate-700">
                     {aiInsights.optimalSowing?.description || t("farmer.dashboard.aiInsights.sowingWindowDesc", { days: 4 })}
                   </p>
                   <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${aiInsights.optimalSowing?.progress || 70}%` }} />
                   </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-3">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("farmer.dashboard.aiInsights.fertilizerEfficiency")}</p>
                   <p className="text-sm font-bold text-slate-700">
                     {aiInsights.fertilizerEfficiency?.description || t("farmer.dashboard.aiInsights.fertilizerDesc", { percent: 15 })}
                   </p>
                   <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${aiInsights.fertilizerEfficiency?.progress || 85}%` }} />
                   </div>
                </div>
             </div>
          </section>

          {/* RISK ALERTS */}
          <section className="bg-rose-50 rounded-[3rem] border border-rose-100 p-8 space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-rose-700">
                   <AlertTriangle size={24} />
                   <h2 className="text-xl font-black tracking-tight">{t("farmer.dashboard.riskAlerts.title")}</h2>
                </div>
                <span className="px-3 py-1 bg-rose-200 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                   {riskAlerts.length} {t("farmer.dashboard.riskAlerts.title")}
                </span>
             </div>
             
             <div className="space-y-3">
                {riskAlerts.map((alert, i) => {
                  const AlertIcon = ICON_MAP[alert.icon] || AlertTriangle;
                  const bgColor = alert.type === 'pest' ? 'rose' : 'amber';
                  return (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-rose-100 hover:shadow-md transition-all cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-${bgColor}-50 rounded-xl flex items-center justify-center text-${bgColor}-500`}>
                             <AlertIcon size={20} />
                          </div>
                          <div>
                             <p className="font-bold text-slate-900">{alert.title}</p>
                             <p className="text-xs text-slate-500">{alert.description}</p>
                          </div>
                       </div>
                       <ChevronRight size={18} className="text-slate-300" />
                    </div>
                  );
                })}
             </div>
          </section>

          {/* SALES SNAPSHOT */}
          <section className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-[60px] group-hover:scale-110 transition-transform" />
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10">
                         <IndianRupee size={20} />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Sales Snapshot</h2>
                   </div>
                   <button 
                     onClick={() => navigate("marketplace?tab=inventory")}
                     className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors"
                   >
                     Management <ChevronRight size={14} className="inline ml-1" />
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Earnings</p>
                      <p className="text-2xl font-black text-white">{formatEarnings(salesSnapshot.totalEarnings)}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Listings</p>
                      <p className="text-2xl font-black text-emerald-400">{String(salesSnapshot.activeListings).padStart(2, '0')}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Orders</p>
                      <p className="text-2xl font-black text-amber-500">{String(salesSnapshot.pendingOrders).padStart(2, '0')}</p>
                   </div>
                </div>

                <div className="mt-8">
                   <button 
                     onClick={() => navigate("marketplace?tab=sell")}
                     className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-900/40"
                   >
                     List New Harvest +
                   </button>
                </div>
             </div>
          </section>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-8">
           {/* MARKET WATCH */}
           <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 p-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                 <TrendingUp size={20} className="text-emerald-500" /> {t("farmer.dashboard.market.title")}
              </h2>
              <div className="space-y-5">
                 {marketTrends.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <span className="font-bold text-slate-600">{item.label}</span>
                       <div className="text-right">
                          <p className="font-black text-slate-900">{item.price}</p>
                          <p className={`text-[10px] font-black flex items-center justify-end gap-1 ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                             {item.trend.toUpperCase()}
                          </p>
                       </div>
                    </div>
                 ))}
                 <button 
                  onClick={() => navigate("marketplace")}
                  className="w-full py-4 mt-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-100 hover:border-emerald-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                 >
                    {t("farmer.dashboard.market.sellCrop")}
                 </button>
              </div>
           </section>

           {/* GOVT SCHEMES */}
           <section className="bg-emerald-900 rounded-[3rem] p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-black tracking-tight">{t("farmer.dashboard.schemes.title")}</h2>
                 <Calendar size={18} className="text-emerald-400" />
              </div>
              <div className="space-y-4">
                 {schemes.map((scheme, i) => (
                    <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10 group hover:bg-white/20 transition-all cursor-pointer">
                       <p className="font-bold text-sm mb-1">{scheme.title}</p>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] opacity-60 uppercase font-black tracking-tighter">{scheme.dept}</span>
                          <span className="text-[10px] font-black bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full">{scheme.status}</span>
                       </div>
                    </div>
                 ))}
                 <button className="w-full pt-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                    {t("farmer.dashboard.schemes.viewAll")} <ArrowRight size={14} />
                 </button>
              </div>
           </section>

           {/* COMMUNITY */}
           <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 p-8">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-black text-slate-900 tracking-tight">{t("farmer.dashboard.community.title")}</h2>
                 <Users size={20} className="text-indigo-500" />
              </div>
              <div className="space-y-6">
                 {communityPosts.map((post, i) => (
                    <div key={i} className="space-y-1">
                       <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-slate-800">{post.user}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{post.time}</span>
                       </div>
                       <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{post.preview}</p>
                    </div>
                 ))}
                 <div className="flex gap-3 pt-2">
                    <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                       {t("farmer.dashboard.community.openCommunity")}
                    </button>
                    <button className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all">
                       <Plus size={20} />
                    </button>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;