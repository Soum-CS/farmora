import React from "react";
import { Search, Filter, Download, Package, Clock, CheckCircle, AlertCircle, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";

const OrderHistory = ({ userRole }) => {
  const orders = [
    { id: "ORD-9482", date: "Oct 24, 2025", crop: "Paddy (Swarna)", qty: "500 Quintals", amount: "₹10,75,000", status: "Delivered", farmer: "Laxmi Agrotech", type: "sale" },
    { id: "ORD-9411", date: "Oct 18, 2025", crop: "Organic Tomatoes", qty: "200 kg", amount: "₹8,000", status: "Processing", farmer: "Ramesh Sahu", type: "purchase" },
    { id: "ORD-9390", date: "Oct 12, 2025", crop: "Premium Cotton", qty: "250 Tons", amount: "₹1,52,50,000", status: "In Transit", farmer: "Rao Textiles", type: "purchase" },
    { id: "ORD-9205", date: "Sep 28, 2025", crop: "Maize (Hybrid)", qty: "800 Quintals", amount: "₹15,84,000", status: "Delivered", farmer: "Greenfields FPO", type: "sale" },
  ];

  // Filter based on role if needed, or just show labels
  const filteredOrders = userRole === "farmer" ? orders : orders.filter(o => o.type === "purchase");

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit border border-emerald-200"><CheckCircle size={12} /> Delivered</span>;
      case "Processing":
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit border border-amber-200"><Clock size={12} /> Processing</span>;
      case "In Transit":
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit border border-blue-200"><Package size={12} /> In Transit</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit border border-slate-200"><AlertCircle size={12} /> Unknown</span>;
    }
  };

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Activity</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none w-full md:w-64 transition-all font-medium" />
          </div>
          <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Transaction Details</th>
                <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Total Value</th>
                <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Status</th>
                <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${order.type === 'sale' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {order.type === 'sale' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg">{order.crop}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${order.type === 'sale' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                            {order.type}
                          </span>
                          <span className="text-[10px] font-black text-slate-400">{order.id} • {order.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="font-black text-slate-900 text-lg">{order.amount}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{order.qty}</p>
                  </td>
                  <td className="p-8 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                  <td className="p-8 text-right whitespace-nowrap">
                    <button className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all inline-block">
                      <Eye size={20} />
                    </button>
                    <button className="ml-2 px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-95">
                      Details
                    </button>
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

export default OrderHistory;
