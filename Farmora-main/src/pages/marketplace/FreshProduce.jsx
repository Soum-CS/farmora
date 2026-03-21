import React, { useState } from "react";
import { 
  Store, 
  Search, 
  MapPin, 
  Heart,
  ShoppingCart,
  Star,
  Map
} from "lucide-react";

const FreshProduce = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["All produce", "Vegetables", "Fruits", "Leafy Greens", "Roots"];

  const produceListings = [
    {
      id: "FP-101",
      name: "Organic Tomatoes",
      farmer: "Ramesh Sahu",
      location: "Kendrapara (5km away)",
      price: "₹40",
      unit: "kg",
      available: "85 kg",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
    },
    {
      id: "FP-102",
      name: "Farm Fresh Potatoes",
      farmer: "Sunil Das",
      location: "Cuttack (12km away)",
      price: "₹25",
      unit: "kg",
      available: "200 kg",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
    },
    {
      id: "FP-103",
      name: "Green Spinach",
      farmer: "Green Roots Farm",
      location: "Bhubaneswar (2km away)",
      price: "₹15",
      unit: "bundle",
      available: "120 bundles",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb"
    },
    {
      id: "FP-104",
      name: "Red Onions",
      farmer: "Mahapatra Farms",
      location: "Khurda (18km away)",
      price: "₹35",
      unit: "kg",
      available: "150 kg",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased text-slate-900 flex flex-col">
      {/* HEADER SECTION */}
      <div className="bg-emerald-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/30 rounded-full translate-x-1/3 -translate-y-1/3 blur-[80px]" />
        
        <main className="p-6 md:p-12 relative z-10 space-y-8 max-w-7xl mx-auto w-full">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/50 text-emerald-100 text-[10px] font-black uppercase tracking-widest border border-emerald-600/50 mb-4">
                    <Store size={14} /> D2C Local Market
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Fresh Farm Produce</h1>
                 <p className="text-emerald-100 font-medium max-w-xl text-lg opacity-90">
                    Buy crisp, organic vegetables and fruits directly from farmers in your community. Healthier for you, better for them.
                 </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                 <button className="py-4 px-8 bg-white text-emerald-900 rounded-2xl font-black w-full flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-50 transition-colors">
                    <Map size={20} /> View Map 
                 </button>
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 text-center">48 active farms nearby</p>
              </div>
           </div>

           <div className="relative max-w-2xl group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
              <input 
                 type="text" 
                 placeholder="Search for tomatoes, onions, spinach..." 
                 className="w-full pl-14 pr-6 py-4 bg-white rounded-[2rem] text-slate-900 font-bold focus:ring-4 focus:ring-emerald-500/30 outline-none shadow-xl border-2 border-transparent transition-all placeholder:text-slate-400"
              />
           </div>
        </main>
      </div>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full space-y-10">
        
        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
           {categories.map((cat, i) => (
             <button 
               key={i} 
               onClick={() => setActiveCategory(cat.toLowerCase())}
               className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all border ${
                 activeCategory === cat.toLowerCase() 
                 ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20' 
                 : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* PRODUCE GRID */}
        <div>
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Nearby Harvests</h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {produceListings.map((item, i) => (
                 <div key={i} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10 hover:border-emerald-200 transition-all duration-300 flex flex-col">
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-4 right-4">
                          <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
                             <Heart size={18} />
                          </button>
                       </div>
                       <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 text-white text-[10px] font-black tracking-widest">
                          <Star size={12} className="text-amber-400 fill-amber-400" /> {item.rating}
                       </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                       <h3 className="text-lg font-black text-slate-900 mb-1">{item.name}</h3>
                       <p className="text-xs font-bold text-slate-500 mb-4">{item.farmer}</p>
                       
                       <div className="mt-auto space-y-4">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             <MapPin size={14} className="text-emerald-500" /> {item.location}
                          </div>
                          
                          <div className="flex justify-between items-end">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available: {item.available}</p>
                                <div className="text-2xl font-black text-emerald-600">
                                   {item.price}<span className="text-sm text-slate-400 ml-1">/{item.unit}</span>
                                </div>
                             </div>
                             <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
                                <ShoppingCart size={20} />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </main>
    </div>
  );
};

export default FreshProduce;
