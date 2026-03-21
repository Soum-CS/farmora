import React from "react";
import { Package, MoreVertical, ExternalLink, Trash2, Edit3, ShieldCheck, Clock } from "lucide-react";

const InventoryManagement = () => {
  const inventory = [
    { id: "INV-001", crop: "Paddy (Swarna)", grade: "Grade A", qty: "450 Qtl", price: "₹2,240", status: "Active", listed: "2 days ago", quality: "Verified" },
    { id: "INV-002", crop: "Premium Cotton", grade: "Extra Long", qty: "120 Qtl", price: "₹6,100", status: "Sold", listed: "1 week ago", quality: "Verified" },
    { id: "INV-003", crop: "Maize (Hybrid)", grade: "Zea May 7", qty: "800 Qtl", price: "₹1,950", status: "Pending", listed: "Today", quality: "Under Review" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-700";
      case "Sold": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock</p>
            <p className="text-3xl font-black text-slate-900">1,370 <span className="text-xs text-slate-400">Qtl</span></p>
          </div>
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
            <Package size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Value</p>
            <p className="text-3xl font-black text-emerald-600">₹24.8L</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Edit3 size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Items Sold</p>
            <p className="text-3xl font-black text-blue-600">14</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <ExternalLink size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden mb-12">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Listings</h2>
          <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700">View History</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Crop Details</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5">Unit Price</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-black text-slate-900">{item.crop}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-500">{item.grade}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-slate-700">{item.qty}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">Listed {item.listed}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-slate-900">{item.price}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                      {item.status === "Pending" ? <Clock size={12} /> : item.quality === "Verified" ? <ShieldCheck size={12} /> : null}
                      {item.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
