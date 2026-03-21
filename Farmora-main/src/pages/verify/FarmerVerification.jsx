import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Leaf, 
  ShieldCheck, 
  Upload, 
  ArrowRight, 
  CheckCircle2, 
  User,
  Phone,
  MapPin,
  ClipboardList,
  FileCheck,
  Landmark,
  Zap,
  ChevronDown,
  UploadCloud
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FarmerVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    state: "",
    district: "",
    idType: "PM-Kisan Registration Number",
    idNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t("farmer.onboarding.errors.fullName");
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = t("farmer.onboarding.errors.mobile");
    if (!formData.state.trim()) newErrors.state = t("farmer.onboarding.errors.state");
    if (!formData.district.trim()) newErrors.district = t("farmer.onboarding.errors.district");
    if (!formData.idNumber.trim()) newErrors.idNumber = t("farmer.verification.idNumber"); // Reusing for error
    if (!file) newErrors.file = t("farmer.verification.uploadDocs");
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { 
      ...user, 
      role: "farmer",
      verificationStatus: "verified",
      details: { ...formData }
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    navigate("/dashboard/farmer");
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[140px] opacity-40" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[120px] opacity-30" />
      </div>

      <header className="relative z-10 px-8 lg:px-20 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10 transition-transform group-hover:rotate-12">
            <Leaf size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">{t("app.name")}</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          
          {/* LEFT PANEL: INFO */}
          <div className="lg:col-span-2 bg-slate-900 p-10 md:p-16 text-white relative flex flex-col justify-between">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full" />
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-3xl rotate-12" />
             </div>

             <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-500/20">
                   <ShieldCheck size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-6 leading-tight">{t("farmer.verification.title")}</h2>
                <div className="space-y-6">
                   {[
                     { icon: FileCheck, text: t("hero.trust.farmers") },
                     { icon: Landmark, text: t("hero.card.label") },
                     { icon: Zap, text: t("hero.badge") },
                   ].map((item, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-center gap-4 group"
                     >
                        <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                          <item.icon size={20} />
                        </div>
                        <span className="font-bold text-sm opacity-80">{item.text}</span>
                     </motion.div>
                   ))}
                </div>
             </div>

             <div className="relative z-10 p-6 bg-white/5 backdrop-blur rounded-[2rem] border border-white/10">
                <p className="text-xs font-medium opacity-60 italic leading-relaxed">
                   "{t("farmer.verification.subtitle")}"
                </p>
             </div>
          </div>

          {/* RIGHT PANEL: FORM */}
          <div className="lg:col-span-3 p-10 md:p-16 relative">
            <header className="mb-12">
               <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t("farmer.verification.badge")}</h1>
               <p className="text-slate-500 font-medium">{t("farmer.verification.subtitle")}</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <User size={14} /> {t("farmer.onboarding.fullName")}
                  </label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t("farmer.onboarding.fullNamePlaceholder")}
                    className={`w-full px-6 py-4 bg-slate-50 border ${errors.fullName ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Phone size={14} /> {t("farmer.onboarding.mobileNumber")}
                  </label>
                  <input 
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full px-6 py-4 bg-slate-50 border ${errors.mobileNumber ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MapPin size={14} /> {t("farmer.onboarding.state")}
                  </label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder={t("farmer.onboarding.state")}
                    className={`w-full px-6 py-4 bg-slate-50 border ${errors.state ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MapPin size={14} /> {t("farmer.onboarding.district")}
                  </label>
                  <input 
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder={t("farmer.onboarding.district")}
                    className={`w-full px-6 py-4 bg-slate-50 border ${errors.district ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <ClipboardList size={14} /> {t("farmer.verification.idType")}
                    </label>
                    <select 
                      name="idType"
                      value={formData.idType}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                    >
                      <option>PM-Kisan Registration Number</option>
                      <option>Aadhaar Number</option>
                      <option>Kisan Credit Card Number</option>
                      <option>Land Record ID</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <CheckCircle2 size={14} /> {t("farmer.verification.idNumber")}
                    </label>
                    <input 
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="Enter ID number"
                      className={`w-full px-6 py-4 bg-slate-50 border ${errors.idNumber ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={14} /> {t("farmer.verification.uploadDocs")}
                  </label>
                  <label className="block w-full cursor-pointer group">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setFile(e.target.files[0])}
                      accept="image/*,.pdf"
                    />
                    <div className={`border-2 border-dashed ${errors.file ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50/50'} group-hover:bg-emerald-50 group-hover:border-emerald-200 rounded-[2rem] p-8 transition-all text-center`}>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <UploadCloud className="text-emerald-600" size={24} />
                      </div>
                      <p className="font-bold text-slate-700 mb-1">{file ? file.name : t("farmer.verification.uploadPlaceholder")}</p>
                      <p className="text-xs text-slate-400 font-medium">{t("farmer.verification.uploadHint")}</p>
                    </div>
                  </label>
                  {errors.file && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center">{errors.file}</p>}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button 
                  type="submit"
                  className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
                >
                  {t("farmer.verification.verifyButton")}
                  <ArrowRight size={20} />
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user") || "{}");
                    localStorage.setItem("user", JSON.stringify({ ...user, role: "farmer", verificationStatus: "verified" }));
                    window.location.href = "/dashboard/farmer";
                  }}
                  className="w-full py-4 text-slate-400 font-bold hover:text-emerald-600 transition-colors text-[10px] uppercase tracking-widest"
                >
                  (Dev Bypass: Skip to Dashboard)
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
          {t("farmer.verification.trustedBy")}
        </p>
      </footer>
    </div>
  );
};

export default FarmerVerification;
