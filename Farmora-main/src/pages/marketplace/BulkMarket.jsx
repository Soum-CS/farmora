import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  Filter, 
  PackageCheck, 
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Scale
} from "lucide-react";

const BulkMarket = () => {
  const [activeTab, setActiveTab] = useState("all");

  const bulkListings = [
    {
      id: "BID-8902",
      crop: "Paddy (Swarna)",
      farmer: "Laxmi Agrotech",
      district: "Bargarh",
      quantity: "500 Quintals",
      price: "₹2,150",
      minOrder: "50 Quintals",
      image: "https://images.unsplash.com/photo-1586201327693-86619dadb281",
      verified: true,
      qualityScore: 94
    },
    {
      id: "BID-8903",
      crop: "Maize (Hybrid)",
      farmer: "Greenfields FPO",
      district: "Kalahandi",
      quantity: "1200 Quintals",
      price: "₹1,980",
      minOrder: "100 Quintals",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2",
      verified: true,
      qualityScore: 88
    },
    {
      id: "BID-8904",
      crop: "Premium Cotton",
      farmer: "Rao Textiles Supply",
      district: "Rayagada",
      quantity: "250 Tons",
      price: "₹6,100",
      minOrder: "10 Tons",
      image: "https://images.unsplash.com/photo-1595085352123-b1bf60c235db",
      verified: false,
      qualityScore: 91
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased text-slate-900 flex overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-200 mb-4">
              <Building2 size={14} /> B2B Trading Hub
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Bulk Crop Market</h1>
            <p className="text-slate-500 font-medium mt-2 max-w-xl">
              Source large quantities of verified agricultural commodities directly from FPOs and major producers.
            </p>
          </div>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-amber-600 transition-all">
             Post Buy Request
          </button>
        </header>

        {/* SEARCH & FILTERS */}
        <section className="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row gap-4">
           <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={20} />
              <input 
                 type="text" 
                 placeholder="Search by crop, farmer name, or district..." 
                 className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium"
              />
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-500 font-bold hover:bg-slate-100 flex items-center gap-2">
                 <Filter size={18} /> Filters
              </button>
              <select className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold outline-none cursor-pointer hover:bg-slate-100">
                 <option>Sort by: Newest</option>
                 <option>Sort by: Price (Low - High)</option>
                 <option>Sort by: Volume</option>
              </select>
           </div>
        </section>

        {/* LISTINGS */}
        <section className="space-y-6">
           <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Bulk Listings</h2>
              <span className="text-sm font-bold text-slate-500">{bulkListings.length} Results</span>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bulkListings.map((listing, i) => (
                 <div key={i} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-2xl hover:shadow-amber-900/10 hover:border-amber-200 transition-all group">
                    <div className="w-full sm:w-48 h-48 rounded-[1.5rem] overflow-hidden shrink-0 relative bg-slate-100">
                       <img src={listing.image} alt={listing.crop} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       {listing.verified && (
                         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-blue-600 shadow-sm" title="Verified Seller">
                            <ShieldCheck size={18} />
                         </div>
                       )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                       <div>
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{listing.crop}</h3>
                                <p className="text-sm font-bold text-slate-500">{listing.farmer}</p>
                             </div>
                             <div className="text-right">
                                <span className="text-xl font-black text-amber-600 block">{listing.price}</span>
                                <span className="text-[10px] font-black uppercase text-slate-400">per quintal</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-4">
                             <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                <Scale size={14} className="text-slate-400" />
                                Vol: {listing.quantity}
                             </div>
                             <div className="w-1 h-1 rounded-full bg-slate-300" />
                             <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                <PackageCheck size={14} className="text-slate-400" />
                                Min: {listing.minOrder}
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mt-2">
                             <MapPin size={14} className="text-slate-400" />
                             Location: {listing.district}
                          </div>
                       </div>

                       <div className="flex items-center gap-4 mt-6">
                          <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                             Place Bulk Order
                          </button>
                          <button className="py-3 px-6 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:bg-white transition-colors">
                             Details
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

      </main>
    </div>
  );
};

export default BulkMarket;
