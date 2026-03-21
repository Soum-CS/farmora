import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Leaf, 
  ShieldCheck, 
  Upload, 
  ArrowRight, 
  Mail,
  Phone,
  MapPin,
  Building2,
  BadgeCheck,
  User
} from "lucide-react";

const OfficerVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    officialEmail: "",
    phoneNumber: "",
    state: "",
    district: "",
    employeeId: "",
    departmentName: "",
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
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.officialEmail.trim()) newErrors.officialEmail = "Official Email is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.departmentName.trim()) newErrors.departmentName = "Department is required";
    if (!file) newErrors.file = "Identification document is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Mock verification submission
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { 
      ...user, 
      role: "officer",
      verificationStatus: "verified", // Auto-verify for mock purposes
      details: { ...formData }
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Redirect to dashboard
    navigate("/dashboard/officer");
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans antialiased overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[140px] opacity-40" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-8 lg:px-20 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Leaf size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">Farmora</span>
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-widest border border-blue-100">
              <ShieldCheck size={14} /> Official Governance
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Agriculture Officer Verification
            </h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              Verify your official credentials to access administrative dashboard.
            </p>
            <button 
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                localStorage.setItem("user", JSON.stringify({ ...user, role: "officer", verificationStatus: "verified" }));
                navigate("/dashboard/officer");
              }}
              className="text-[10px] font-black text-blue-400 hover:text-blue-600 uppercase tracking-widest mt-4 transition-colors"
            >
              (Dev Bypass: Skip to Dashboard)
            </button>
          </div>

          {/* FORM CARD */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden">
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
                    placeholder="Official full name"
                    className={`w-full px-6 py-4 bg-white border ${errors.fullName ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.fullName}</p>}
                </div>

                {/* Official Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Mail size={14} /> Official Email
                  </label>
                  <input 
                    type="email"
                    name="officialEmail"
                    value={formData.officialEmail}
                    onChange={handleChange}
                    placeholder="dept@gov.in"
                    className={`w-full px-6 py-4 bg-white border ${errors.officialEmail ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.officialEmail && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.officialEmail}</p>}
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
                    className={`w-full px-6 py-4 bg-white border ${errors.phoneNumber ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.phoneNumber}</p>}
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
                    className={`w-full px-6 py-4 bg-white border ${errors.state ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.state && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.state}</p>}
                </div>
              </div>

              {/* EMPLOYEE INFO */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Building2 size={14} /> Department Name
                  </label>
                  <input 
                    type="text"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                    placeholder="Department of Agriculture"
                    className={`w-full px-6 py-4 bg-white border ${errors.departmentName ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.departmentName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.departmentName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <BadgeCheck size={14} /> Employee ID Number
                  </label>
                  <input 
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="GOV-XXXX-XXXX"
                    className={`w-full px-6 py-4 bg-white border ${errors.employeeId ? 'border-red-300 ring-4 ring-red-500/10' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium`}
                  />
                  {errors.employeeId && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.employeeId}</p>}
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Upload size={14} /> Official Documents
                </label>
                <label className={`block w-full cursor-pointer group`}>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      if (errors.file) setErrors(prev => ({ ...prev, file: "" }));
                    }}
                    accept="image/*,.pdf"
                  />
                  <div className={`border-2 border-dashed ${errors.file ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50/50'} group-hover:bg-blue-50 group-hover:border-blue-200 rounded-[2.5rem] p-8 transition-all text-center`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="text-blue-600" size={24} />
                    </div>
                    <p className="font-bold text-slate-700 mb-1">{file ? file.name : "Click to upload ID Card"}</p>
                    <p className="text-xs text-slate-400 font-medium">Govt ID card or Appointment Letter (Max 5MB)</p>
                  </div>
                </label>
                {errors.file && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center">{errors.file}</p>}
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                Submit Verification
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
          Enforcing Agricultural Integrity & Governance
        </p>
      </footer>
    </div>
  );
};

export default OfficerVerification;
