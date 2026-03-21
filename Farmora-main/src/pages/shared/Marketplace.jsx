import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  History, 
  Search, 
  Filter,
  PlusCircle,
  Package,
  ArrowRight,
  LayoutGrid,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderHistory from "../marketplace/features/OrderHistory";
import SupplyChain from "../marketplace/features/SupplyChain";
import PriceTrends from "../marketplace/features/PriceTrends";
import QualityChecks from "../marketplace/features/QualityChecks";
import SellCrops from "../marketplace/features/SellCrops";
import InventoryManagement from "../marketplace/features/InventoryManagement";

const Marketplace = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Robust role initialization
  const [userRole] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.role || "consumer";
    } catch (e) {
      return "consumer";
    }
  });

  const activeTab = searchParams.get("tab") || "explore";
  const setActiveTab = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: "explore", label: "Explore", icon: ShoppingBag },
    ...(userRole === "farmer" ? [
      { id: "sell", label: "Sell Crop", icon: PlusCircle },
      { id: "inventory", label: "Inventory", icon: Package }
    ] : []),
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "orders", label: "Orders", icon: History },
    { id: "supply", label: "Supply Chain", icon: Truck },
    { id: "quality", label: "Quality", icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "trends":
        return <PriceTrends />;
      case "orders":
        return <OrderHistory userRole={userRole} />;
      case "supply":
        return <SupplyChain />;
      case "quality":
        return <QualityChecks />;
      case "sell":
        return <SellCrops />;
      case "inventory":
        return <InventoryManagement />;
      case "explore":
      default:
        return (
          <div className="space-y-10">
            {/* HEROS SECTION */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
               {/* BULK MARKET HERO */}
               <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-blue-900/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform opacity-50 pointer-events-none" />
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                        B2B Wholesale
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bulk Crop Trading</h2>
                      <p className="text-slate-500 font-medium">Direct procurement from verified farmers and FPOs.</p>
                      <div className="flex flex-wrap gap-2">
                        {['Rice', 'Maize', 'Cotton', 'Pulses'].map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-tight">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-3">
                      Open Bulk Market <ArrowRight size={18} />
                    </button>
                  </div>
               </section>

               {/* FRESH PRODUCE HERO */}
               <section className="bg-emerald-900 rounded-[3rem] p-8 shadow-xl shadow-emerald-900/20 relative overflow-hidden text-white group">
                  <div className="absolute inset-0 bg-emerald-800/50 backdrop-blur-3xl pointer-events-none" />
                  <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full -translate-x-1/3 -translate-y-1/3 blur-[80px] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                        D2C Household
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">Fresh Farm Produce</h2>
                      <p className="text-emerald-100/80 font-medium">Daily essentials direct from nearby farms.</p>
                      <div className="flex flex-wrap gap-2">
                        {['Tomatoes', 'Potatoes', 'Spinach', 'Onions'].map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-emerald-800 rounded-xl text-[10px] font-bold text-emerald-100 border border-emerald-700 uppercase tracking-tight">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-4 bg-white text-emerald-900 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-3">
                      Shop Fresh Produce <ArrowRight size={18} />
                    </button>
                  </div>
               </section>
            </div>

            {/* PRICE SNAPSHOT */}
            <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Today's Price Snapshot</h2>
                  <button 
                    onClick={() => setActiveTab("trends")}
                    className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    Details <TrendingUp size={14} />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { crop: "Paddy", price: "₹2,240", change: "+0.5%", up: true, bg: "bg-emerald-50", text: "text-emerald-700" },
                    { crop: "Maize", price: "₹1,980", change: "-1.2%", up: false, bg: "bg-rose-50", text: "text-rose-700" },
                    { crop: "Cotton", price: "₹6,100", change: "+2.4%", up: true, bg: "bg-blue-50", text: "text-blue-700" },
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-3xl border border-transparent ${item.bg} flex items-center justify-between group hover:scale-[1.02] transition-transform`}>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg">{item.crop}</h4>
                        <p className="text-2xl font-black text-slate-800 mt-1">{item.price}<span className="text-xs text-slate-500 font-medium ml-1">/ qtl</span></p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.up ? 'bg-emerald-200/50 text-emerald-700' : 'bg-rose-200/50 text-rose-700'}`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="p-1 md:p-4 space-y-8 min-h-screen">
      {/* PAGE HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Agricultural <span className="text-amber-600">Marketplace</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Transacting trust from soil to shelf.</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search crops, farmers..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none w-64 lg:w-80 transition-all font-medium text-sm"
              />
           </div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-amber-600 shadow-sm transition-colors">
              <Filter size={20} />
           </button>
        </div>
      </header>

      {/* SUB-NAVIGATION */}
      <div className="bg-white/60 backdrop-blur-md p-2 rounded-3xl border border-white/40 flex flex-wrap gap-2 sticky top-0 z-20 shadow-xl shadow-slate-900/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                : "text-slate-500 hover:bg-white hover:text-slate-900"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* DYNAMIC CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;