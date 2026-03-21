import { useTranslation } from "react-i18next";
import { 
  Sprout, 
  Tractor, 
  Satellite, 
  Salad 
} from "lucide-react";
import "../../styles/cta.css";

function CTA() {
  const { t } = useTranslation();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-panel">
          
          {/* Drifting Particles */}
          <div className="cta-particles">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="cta-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 5 + 5}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Icons */}
          <div className="cta-decor decor-1"><Sprout size={32} strokeWidth={1} /></div>
          <div className="cta-decor decor-2"><Tractor size={32} strokeWidth={1} /></div>
          <div className="cta-decor decor-3"><Satellite size={32} strokeWidth={1} /></div>
          <div className="cta-decor decor-4"><Salad size={32} strokeWidth={1} /></div>

          <div className="cta-content">
            <h2>{t("cta.title")}</h2>
            <p>{t("cta.subtitle")}</p>
            
            <div className="cta-actions">
              <button className="btn-cta-main">
                {t("cta.primary")}
              </button>
              <button className="btn-cta-alt">
                {t("cta.secondary")}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;