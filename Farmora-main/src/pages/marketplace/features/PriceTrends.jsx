import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

// Mock data for the chart
const data = [
  { name: "Jan", paddy: 2100, maize: 1850, cotton: 5800 },
  { name: "Feb", paddy: 2150, maize: 1900, cotton: 5900 },
  { name: "Mar", paddy: 2180, maize: 1880, cotton: 5950 },
  { name: "Apr", paddy: 2200, maize: 1950, cotton: 6000 },
  { name: "May", paddy: 2220, maize: 1920, cotton: 6050 },
  { name: "Jun", paddy: 2240, maize: 1980, cotton: 6100 },
];

const PriceTrends = () => {
  return (
    <div className="space-y-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Market Price Trends</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
            <option>Last 6 Months</option>
            <option>Last 1 Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-slate-900">Historical Crop Prices</h3>
            <p className="text-sm font-bold text-slate-500 mt-1">Average market rates per quintal</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs font-bold text-slate-600">Paddy</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-xs font-bold text-slate-600">Maize</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-xs font-bold text-slate-600">Cotton</span></div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPaddy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCotton" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: '900' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: '900' }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '16px', fontWeight: 'bold' }}
                itemStyle={{ fontSize: '14px', paddingTop: '4px' }}
              />
              <Area type="monotone" dataKey="paddy" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPaddy)" />
              <Area type="monotone" dataKey="maize" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorMaize)" />
              <Area type="monotone" dataKey="cotton" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCotton)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-amber-600" size={24} />
            <h3 className="text-lg font-black text-amber-900 tracking-tight">Market Insight</h3>
          </div>
          <p className="text-sm font-bold text-amber-800/80 leading-relaxed">
            Cotton prices have seen a sharp 2.4% increase due to unseasonal rains affecting yields in major producing hubs. We recommend securing B2B procurement contracts for cotton immediately to hedge against further price surges in Q3.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4">Top Movers Today</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Mustard Seed</span>
              <span className="flex items-center gap-1 font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"><ArrowUpRight size={16} /> +4.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Groundnut</span>
              <span className="flex items-center gap-1 font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"><ArrowUpRight size={16} /> +1.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Soyabean</span>
              <span className="flex items-center gap-1 font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full"><ArrowDownRight size={16} /> -0.9%</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PriceTrends;
