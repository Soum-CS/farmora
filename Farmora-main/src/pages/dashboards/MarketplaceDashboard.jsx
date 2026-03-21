import React from "react";
import { 
  Leaf, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  History, 
  Search,
  Bell,
  Settings as SettingsIcon,
  Filter,
  ArrowRight,
  TrendingUp,
  Package
} from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderHistory from "../marketplace/features/OrderHistory";
import SupplyChain from "../marketplace/features/SupplyChain";
import PriceTrends from "../marketplace/features/PriceTrends";
import QualityChecks from "../marketplace/features/QualityChecks";

const ProductCard = ({ title, farmer, price, weight, image, badge, t }) => (
  <div className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/10">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute top-4 left-4">
        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
          {badge}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-xs font-bold uppercase tracking-widest opacity-80">{farmer}</p>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-amber-600 font-black text-xl">{price}</p>
      </div>
      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold mb-6">
        <Package size={16} />
        <span>{t("marketplace.minOrder")}: {weight}</span>
      </div>
      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-amber-600 transition-colors">
        {t("marketplace.orderNow")}
        <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

const MarketplaceDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState("browseCrops");

  const sidebarItems = [
    { id: "browseCrops", icon: ShoppingBag, label: t("sidebar.browseCrops") },
    { id: "orderHistory", icon: History, label: t("sidebar.orderHistory") },
    { id: "supplyChain", icon: Truck, label: t("sidebar.supplyChain") },
    { id: "priceTrends", icon: TrendingUp, label: t("sidebar.priceTrends") },
    { id: "qualityChecks", icon: ShieldCheck, label: t("sidebar.qualityChecks") },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "orderHistory":
        return <OrderHistory />;
      case "supplyChain":
        return <SupplyChain />;
      case "priceTrends":
        return <PriceTrends />;
      case "qualityChecks":
        return <QualityChecks />;
      case "browseCrops":
      default:
        return (
          <React.Fragment>
            {/* ROW 1: MARKET OVERVIEW */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Available Crops</p>
                <h3 className="text-3xl font-black text-slate-900">1,240</h3>
                <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1"><TrendingUp size={14}/> +12%</p>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Active Sellers</p>
                <h3 className="text-3xl font-black text-slate-900">458</h3>
                <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1"><TrendingUp size={14}/> +5 New</p>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Today's Avg Price</p>
                <h3 className="text-3xl font-black text-amber-600">₹2,150</h3>
                <p className="text-xs font-bold text-slate-400 mt-2">per quintal</p>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Orders Today</p>
                <h3 className="text-3xl font-black text-slate-900">24</h3>
                <p className="text-xs font-bold text-blue-600 mt-2">Active now</p>
              </div>
            </div>

            {/* ROW 2: BULK CROP MARKET */}
            <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-blue-900/5 relative overflow-hidden group z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform opacity-50 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                    B2B Wholesale
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bulk Crop Trading</h2>
                  <p className="text-slate-500 font-medium">Buy large quantities of crops directly from verified farmers and FPOs.</p>
                  <div className="flex gap-3 pt-2">
                    {['Rice', 'Maize', 'Cotton', 'Pulses'].map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => window.location.href='/dashboard/marketplace/bulk'}
                  className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-3 shrink-0"
                >
                  Open Bulk Market <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* ROW 3: FRESH FARM PRODUCE */}
            <section className="bg-emerald-900 rounded-[3rem] p-8 shadow-xl shadow-emerald-900/20 relative overflow-hidden text-white group z-10">
              <div className="absolute inset-0 bg-emerald-800/50 backdrop-blur-3xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full -translate-x-1/3 -translate-y-1/3 blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                    D2C Household
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">Fresh Farm Produce</h2>
                  <p className="text-emerald-100/80 font-medium font-medium">Buy vegetables and fruits directly from nearby farmers for your daily needs.</p>
                  <div className="flex gap-3 pt-2">
                    {['Tomatoes', 'Potatoes', 'Spinach', 'Onions'].map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-emerald-800 rounded-xl text-xs font-bold text-emerald-100 border border-emerald-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => window.location.href='/dashboard/marketplace/fresh'}
                  className="w-full md:w-auto px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-3 shrink-0"
                >
                  Shop Fresh Produce <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* ROW 4: PRICE SNAPSHOT */}
            <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-xl shadow-slate-200/50 z-10 relative">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Price Snapshot</h2>
                <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-2">
                  View Price Trends <TrendingUp size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { crop: "Paddy", price: "₹2,240", unit: "quintal", change: "+0.5%", up: true, border: "border-emerald-100", bg: "bg-emerald-50" },
                  { crop: "Maize", price: "₹1,980", unit: "quintal", change: "-1.2%", up: false, border: "border-rose-100", bg: "bg-rose-50" },
                  { crop: "Cotton", price: "₹6,100", unit: "quintal", change: "+2.4%", up: true, border: "border-blue-100", bg: "bg-blue-50" },
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-3xl border ${item.border} ${item.bg} flex items-center justify-between`}>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg">{item.crop}</h4>
                      <p className="text-2xl font-black text-slate-800 mt-1">{item.price}<span className="text-xs text-slate-500 font-medium"> / {item.unit}</span></p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.up ? 'bg-emerald-200/50 text-emerald-700' : 'bg-rose-200/50 text-rose-700'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </React.Fragment>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-72 bg-white/50 backdrop-blur-md border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShoppingBag size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black hidden lg:block tracking-tight text-slate-900">Farmora</span>
        </div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'}`}
            >
              <item.icon size={22} />
              <span className="font-bold hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 relative">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[140px] opacity-40 pointer-events-none" />

        <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">{t("dashboard.marketplace.title")}</h1>
            <p className="text-slate-500 font-medium">{t("dashboard.marketplace.subtitle")}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600" size={18} />
              <input 
                type="text" 
                placeholder={t("dashboard.marketplace.searchPlaceholder")}
                className="pl-12 pr-6 py-3 bg-white/70 backdrop-blur border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none w-72 transition-all font-medium"
              />
            </div>
            <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-500 hover:text-amber-600 shadow-sm">
              <Filter size={20} />
            </button>
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <img src="https://ui-avatars.com/api/?name=Market+Buyer&background=d97706&color=fff" alt="Profile" />
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default MarketplaceDashboard;
