import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Leaf, 
  ShoppingBag, 
  ArrowRight, 
  User,
  Phone,
  MapPin,
  Building,
  Briefcase
} from "lucide-react";

const BuyerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phoneNumber: "",
    city: "",
    state: "",
    buyerType: "Retail Buyer",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Mock registration submission
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { 
      ...user, 
      role: "marketplace",
      verificationStatus: "verified", // Buyers don't need doc verification
      details: { ...formData }
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Redirect to dashboard
    navigate("/dashboard/marketplace");
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-amber-100 rounded-full blur-[140px] opacity-40" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-8 lg:px-20 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Leaf size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">Farmora</span>
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold uppercase tracking-widest border border-amber-100">
              <ShoppingBag size={14} /> Marketplace Buyer
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Create Marketplace Account
            </h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              Register to access premium farm-to-door agricultural produce.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-amber-900/5 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-6 py-4 bg-white border ${errors.fullName ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.fullName}</p>}
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Building size={14} /> Business Name
                  </label>
                  <input 
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input 
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full px-6 py-4 bg-white border ${errors.phoneNumber ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.phoneNumber}</p>}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MapPin size={14} /> City
                  </label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white border ${errors.city ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium`}
                  />
                  {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MapPin size={14} /> State
                  </label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white border ${errors.state ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium`}
                  />
                  {errors.state && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.state}</p>}
                </div>

                {/* Buyer Type */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Briefcase size={14} /> Buyer Type
                  </label>
                  <select 
                    name="buyerType"
                    value={formData.buyerType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-slate-700"
                  >
                    <option>Retail Buyer</option>
                    <option>Wholesaler</option>
                    <option>Food Processing Company</option>
                    <option>Exporter</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-amber-600 text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-amber-600/20 hover:bg-amber-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                Create Marketplace Account
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
          Empowering Direct Farm-to-Business Commerce
        </p>
      </footer>
    </div>
  );
};

export default BuyerRegistration;
