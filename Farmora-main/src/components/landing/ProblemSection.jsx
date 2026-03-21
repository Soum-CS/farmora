import { useTranslation } from "react-i18next";
import { 
  AlertCircle, 
  CloudOff, 
  FlaskConical, 
  TrendingDown 
} from "lucide-react";
import "../../styles/problem-section.css";

function ProblemSection() {
  const { t } = useTranslation();

  return (
    <section className="problem-section">
      {/* Background Decorations */}
      <div className="organic-blob blob-1" />
      <div className="organic-blob blob-2" />

      <div className="problem-container">
        <div className="problem-header">
          <span className="section-subtitle">{t("problem.eyebrow")}</span>
          <h2>{t("problem.title")}</h2>
          <div className="header-leaf-divider" />
          <p>{t("problem.subtitle")}</p>
        </div>

        <div className="problem-grid">
          <div className="card-organic">
            <div className="organic-icon-wrap">
              <AlertCircle size={32} />
            </div>
            <h3>{t("problem.cards.experience.title")}</h3>
            <p>{t("problem.cards.experience.desc")}</p>
          </div>

          <div className="card-organic">
            <div className="organic-icon-wrap">
              <CloudOff size={32} />
            </div>
            <h3>{t("problem.cards.climate.title")}</h3>
            <p>{t("problem.cards.climate.desc")}</p>
          </div>

          <div className="card-organic">
            <div className="organic-icon-wrap">
              <FlaskConical size={32} />
            </div>
            <h3>{t("problem.cards.soil.title")}</h3>
            <p>{t("problem.cards.soil.desc")}</p>
          </div>

          <div className="card-organic">
            <div className="organic-icon-wrap">
              <TrendingDown size={32} />
            </div>
            <h3>{t("problem.cards.market.title")}</h3>
            <p>{t("problem.cards.market.desc")}</p>
          </div>
        </div>

        <div className="problem-impact">
          <span className="impact-label">{t("problem.impact.label")}</span>
          <div className="impact-tags">
            <div className="tag-natural">{t("problem.impact.tag1")}</div>
            <div className="tag-natural">{t("problem.impact.tag2")}</div>
            <div className="tag-natural">{t("problem.impact.tag3")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
