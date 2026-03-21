import React from "react";
import { Camera, Upload, AlertCircle, CheckCircle2, RefreshCw, ScanSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslation } from "react-i18next";

const DiseaseScanner = () => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const startScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        disease: "Leaf Blight (କଳଙ୍କି ରୋଗ)",
        confidence: "94%",
        treatment: "Recommended: Fungicide spray within 48 hours. Apply Carbendazim (12%) + Mancozeb (63%) WP.",
        severity: "Moderate"
      });
    }, 3000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t("farmer.tools.diseaseScanner.title")}</h1>
        <p className="text-slate-500 font-medium italic">{t("farmer.tools.diseaseScanner.subtitle")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200 p-8 rounded-[2.5rem] shadow-xl space-y-6 flex flex-col items-center justify-center min-h-[400px]">
           <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-pulse">
              <Camera size={40} />
           </div>
           <div className="text-center">
              <h3 className="text-xl font-black text-slate-800 mb-2">{t("farmer.tools.diseaseScanner.scanLeaf")}</h3>
              <p className="text-slate-500 text-sm font-medium px-6">{t("farmer.tools.diseaseScanner.scanHint")}</p>
           </div>
           
           <div className="flex flex-col w-full gap-3 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startScan}
                disabled={isScanning}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-emerald-200"
              >
                {isScanning ? <RefreshCw className="animate-spin" /> : <Camera size={20} />}
                {isScanning ? t("farmer.tools.diseaseScanner.analyzing") : t("farmer.tools.diseaseScanner.scanButton")}
              </motion.button>
              <button className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors">
                <Upload size={20} />
                {t("farmer.tools.diseaseScanner.uploadButton")}
              </button>
           </div>
        </div>

        <div className="space-y-6">
           <AnimatePresence mode="wait">
             {result ? (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white/70 backdrop-blur-xl border border-emerald-200 p-8 rounded-[2.5rem] shadow-xl h-full border-l-8 border-l-emerald-500"
               >
                  <div className="flex items-center gap-3 text-emerald-600 mb-6">
                    <CheckCircle2 size={28} />
                    <span className="font-black text-lg">{t("farmer.tools.diseaseScanner.resultTitle")}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{t("farmer.tools.diseaseScanner.detectedDisease")}</label>
                      <p className="text-2xl font-black text-slate-900">{result.disease}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-emerald-50 rounded-2xl">
                         <label className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-1">{t("farmer.tools.diseaseScanner.confidence")}</label>
                         <p className="text-xl font-black text-emerald-800">{result.confidence}</p>
                      </div>
                      <div className="flex-1 p-4 bg-amber-50 rounded-2xl">
                         <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest block mb-1">{t("farmer.tools.diseaseScanner.severity")}</label>
                         <p className="text-xl font-black text-amber-800">{result.severity}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-lg">
                       <div className="flex items-center gap-2 mb-3">
                          <AlertCircle size={18} className="text-amber-400" />
                          <span className="font-black text-sm uppercase tracking-tight">{t("farmer.tools.diseaseScanner.expertAdvice")}</span>
                       </div>
                       <p className="text-sm font-medium leading-relaxed opacity-90">{result.treatment}</p>
                       <button className="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-xs transition-colors">{t("farmer.tools.diseaseScanner.buySpray")}</button>
                    </div>
                  </div>
               </motion.div>
             ) : (
               <div className="bg-slate-100/50 border border-dashed border-slate-300 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 min-h-[400px]">
                  <ScanSearch size={60} className="mb-4 opacity-20" />
                  <p className="font-black text-lg">{t("farmer.tools.diseaseScanner.placeholderTitle")}</p>
                  <p className="text-sm font-medium">{t("farmer.tools.diseaseScanner.placeholderDesc")}</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DiseaseScanner;
