import React from "react";
import { Users, Search, Filter, Mail, Phone, MapPin, ChevronRight, FileText } from "lucide-react";

const FarmerDatabase = () => (
  <div className="space-y-8">
    <header>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Farmer Database</h1>
      <p className="text-slate-500 font-medium italic">Searchable registry of all regional farmers and their farm profiles.</p>
    </header>

    <div className="flex flex-col md:flex-row gap-4 mb-8">
       <div className="flex-1 relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, Aadhar, or village..." 
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-sm"
          />
       </div>
       <button className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3">
          <Filter size={18} /> Filters
       </button>
       <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
          Register Farmer
       </button>
    </div>

    <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-blue-900/5">
       <table className="w-full text-left">
          <thead>
             <tr className="border-b border-slate-100 italic">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Farmer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Land Size</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
             {[
               { name: "Suresh Mohanty", id: "ARM-824", village: "Bhatli", acreage: "4.5 Acres", phone: "+91 98765 43210" },
               { name: "Priya Das", id: "ARM-892", village: "Ambapali", acreage: "2.1 Acres", phone: "+91 98765 43211" },
               { name: "Gopal Swain", id: "ARM-901", village: "Sohela", acreage: "8.2 Acres", phone: "+91 98765 43212" },
               { name: "Meena Jena", id: "ARM-915", village: "Kendrapara", acreage: "3.4 Acres", phone: "+91 98765 43213" },
               { name: "Rajesh Sahu", id: "ARM-928", village: "Bargarh", acreage: "5.0 Acres", phone: "+91 98765 43214" },
             ].map((f, i) => (
               <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                           {f.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                           <p className="font-black text-slate-900">{f.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {f.id}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <MapPin size={14} className="text-slate-400" /> {f.village}
                     </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-slate-700">{f.acreage}</td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-3">
                        <button className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"><Phone size={14} /></button>
                        <button className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"><Mail size={14} /></button>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center gap-2 ml-auto">
                        Profile <ChevronRight size={14} />
                     </button>
                  </td>
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  </div>
);

export default FarmerDatabase;
