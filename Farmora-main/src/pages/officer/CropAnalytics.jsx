import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  CloudSun, 
  ShieldAlert, 
  PieChart as PieIcon, 
  Calendar,
  Filter,
  Maximize2,
  ChevronRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";

const cropYieldData = [
  { month: "Jan", yield: 45, predicted: 48 },
  { month: "Feb", yield: 52, predicted: 50 },
  { month: "Mar", yield: 48, predicted: 55 },
  { month: "Apr", yield: 61, predicted: 58 },
  { month: "May", yield: 55, predicted: 62 },
  { month: "Jun", yield: 67, predicted: 65 },
];

const cropDistribution = [
  { name: 'Rice', value: 45, color: '#10b981' },
  { name: 'Maize', value: 25, color: '#f59e0b' },
  { name: 'Cotton', value: 20, color: '#2563eb' },
  { name: 'Others', value: 10, color: '#94a3b8' },
];

const diseaseFrequency = [
  { name: 'Blight', count: 42 },
  { name: 'Blast', count: 28 },
  { name: 'Borer', count: 55 },
  { name: 'Pests', count: 18 },
  { name: 'Rust', count: 12 },
];

const CropAnalytics = () => {
  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Regional Crop Analytics</h1>
          <p className="text-slate-500 font-medium">Deep data insights on regional yields, crop patterns, and risk impacts.</p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Calendar size={18} /> This Season
           </button>
           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 flex items-center gap-2">
              <Filter size={18} /> Advanced Filters
           </button>
        </div>
      </header>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "Yield Prediction", value: "8.4 Tons/ha", trend: "up", delta: "12%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
           { label: "Water stress index", value: "Low", trend: "down", delta: "15%", icon: CloudSun, color: "text-blue-500", bg: "bg-blue-50" },
           { label: "Disease Occurrence", value: "Moderate", trend: "up", delta: "5%", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-blue-900/5 group"
           >
              <div className="flex items-center justify-between mb-4">
                 <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={24} />
                 </div>
                 <span className={`flex items-center gap-1 text-[10px] font-black uppercase ${stat.trend === 'up' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {stat.delta}
                 </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* CHART 1: YIELD PREDICTIONS */}
         <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-10 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <BarChart3 size={24} className="text-blue-600" /> Yield Trends (Actual vs Predicted)
               </h3>
               <button className="p-2.5 text-slate-400 hover:text-blue-600"><Maximize2 size={20} /></button>
            </div>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cropYieldData}>
                     <defs>
                        <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                     <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                     <Area type="monotone" dataKey="yield" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorYield)" />
                     <Line type="monotone" dataKey="predicted" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>

         {/* CHART 2: CROP DISTRIBUTION */}
         <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-10 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <PieIcon size={24} className="text-emerald-600" /> Regional Crop Distribution
               </h3>
               <button className="p-2.5 text-slate-400 hover:text-emerald-600"><Maximize2 size={20} /></button>
            </div>
            <div className="h-[350px] flex items-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={cropDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={8}
                        dataKey="value"
                     >
                        {cropDistribution.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="space-y-5 pr-12">
                  {cropDistribution.map((item, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                           <span className="text-sm font-black text-slate-900">{item.value}%</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CHART 3: DISEASE FREQUENCY */}
         <section className="bg-slate-900 rounded-[3rem] p-10 lg:col-span-2 space-y-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]" />
            <div className="flex items-center justify-between relative z-10">
               <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <ShieldAlert size={24} className="text-rose-400" /> Disease Frequency Index
               </h3>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Regional Index</p>
            </div>
            <div className="h-[300px] relative z-10 pb-10">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diseaseFrequency}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                     <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }} />
                     <Bar dataKey="count" fill="#4ade80" radius={[12, 12, 4, 4]} barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
               <p className="text-xs font-medium text-slate-400 italic">"Stem Borer frequency is at an 18-month high in Central Block."</p>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                  View Distribution Map <ChevronRight size={16} />
               </button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default CropAnalytics;
