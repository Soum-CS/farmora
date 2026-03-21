import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Leaf, 
  Sprout, 
  ArrowRight, 
  User,
  Phone,
  MapPin,
  Trees,
  Droplets,
  ClipboardCheck,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const FarmerOnboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    state: "",
    district: "",
    village: "",
    farmSize: "",
    irrigationType: "Monsoon Dependent",
    primaryCrops: [],
  });

  const [errors, setErrors] = useState({});

  const cropsList = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Pulses", "Vegetables", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleCropToggle = (crop) => {
    setFormData(prev => {
      const crops = prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter(c => c !== crop)
        : [...prev.primaryCrops, crop];
      return { ...prev, primaryCrops: crops };
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t("farmer.onboarding.errors.fullName");
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = t("farmer.onboarding.errors.mobile");
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.state.trim()) newErrors.state = t("farmer.onboarding.errors.state");
    if (!formData.district.trim()) newErrors.district = t("farmer.onboarding.errors.district");
    if (!formData.village.trim()) newErrors.village = t("farmer.onboarding.errors.village");
    if (!formData.farmSize.trim()) newErrors.farmSize = t("farmer.onboarding.errors.farmSize");
    if (formData.primaryCrops.length === 0) newErrors.crops = t("farmer.onboarding.errors.crops");
    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { 
      ...user, 
      role: "farmer",
      verificationStatus: "pending",
      onboardingComplete: false,
      personalDetails: {
        fullName: formData.fullName,
        phoneNumber: formData.mobileNumber,
      },
      locationDetails: {
        state: formData.state,
        district: formData.district,
        village: formData.village,
      },
      farmDetails: {
        farmSize: formData.farmSize,
        irrigationType: formData.irrigationType,
        primaryCrops: formData.primaryCrops
      }
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    navigate("/verify/farmer");
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
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-widest border border-emerald-100">
              <Sprout size={14} /> {t("farmer.onboarding.badge")}
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              {t("farmer.onboarding.title", { yourFarm: t("farmer.onboarding.yourFarm") })}
            </h1>
            <p className="description">
              {t("farmer.onboarding.subtitle").split("profile")[0]}
              <strong>{t("farmer.onboarding.subtitle").split("profile")[1]}</strong>
            </p>
            <button 
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                localStorage.setItem("user", JSON.stringify({ ...user, role: "farmer", verificationStatus: "verified" }));
                window.location.href = "/dashboard/farmer";
              }}
              className="dev-bypass-btn"
              style={{ fontSize: '10px', fontWeight: '900', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              (Dev Bypass: Skip to Dashboard)
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-emerald-900/5 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <User size={14} /> {t("farmer.onboarding.fullName")}
                        </label>
                        <input 
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t("farmer.onboarding.fullNamePlaceholder")}
                          className={`w-full px-6 py-4 bg-white border ${errors.fullName ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Phone size={14} /> {t("farmer.onboarding.mobileNumber")}
                        </label>
                        <input 
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className={`w-full px-6 py-4 bg-white border ${errors.mobileNumber ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.mobileNumber}</p>}
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      {t("hero.cta")}
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <MapPin size={14} /> {t("farmer.onboarding.state")}
                        </label>
                        <input 
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder={t("farmer.onboarding.state")}
                          className={`w-full px-6 py-4 bg-white border ${errors.state ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.state && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.state}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <MapPin size={14} /> {t("farmer.onboarding.district")}
                        </label>
                        <input 
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder={t("farmer.onboarding.district")}
                          className={`w-full px-6 py-4 bg-white border ${errors.district ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.district && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.district}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <MapPin size={14} /> {t("farmer.onboarding.village")}
                        </label>
                        <input 
                          type="text"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          placeholder={t("farmer.onboarding.village")}
                          className={`w-full px-6 py-4 bg-white border ${errors.village ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.village && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.village}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Trees size={14} /> {t("farmer.onboarding.farmSize")}
                        </label>
                        <input 
                          type="number"
                          name="farmSize"
                          value={formData.farmSize}
                          onChange={handleChange}
                          placeholder={t("farmer.onboarding.farmSizePlaceholder")}
                          className={`w-full px-6 py-4 bg-white border ${errors.farmSize ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium`}
                        />
                        {errors.farmSize && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.farmSize}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Droplets size={14} /> {t("farmer.onboarding.irrigationType")}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Borewell", "Canal", "Monsoon Dependent"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, irrigationType: type }))}
                            className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all border ${formData.irrigationType === type ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <ClipboardCheck size={14} /> {t("farmer.onboarding.primaryCrops")}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {cropsList.map((crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => handleCropToggle(crop)}
                            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${formData.primaryCrops.includes(crop) ? 'bg-emerald-100 text-emerald-700 border-emerald-300 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'}`}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                      {errors.crops && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.crops}</p>}
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-5 border border-slate-200 rounded-[2rem] text-slate-400 hover:bg-slate-50 transition-colors"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
                      >
                        {t("farmer.onboarding.completeButton")}
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          {t("farmer.onboarding.footer")}
        </p>
      </footer>
    </div>
  );
};

export default FarmerOnboarding;
