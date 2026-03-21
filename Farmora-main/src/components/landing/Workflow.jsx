import { useTranslation } from "react-i18next";
import { 
  Inbox, 
  Cpu, 
  BarChart3, 
  Microscope, 
  ClipboardList 
} from "lucide-react";
import "../../styles/workflow.css";

function Workflow() {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      title: t("workflow.steps.dataInput.title"),
      desc: t("workflow.steps.dataInput.desc"),
      icon: Inbox,
      details: t("workflow.steps.dataInput.details"),
      tag: t("workflow.steps.dataInput.tag")
    },
    {
      id: 2,
      title: t("workflow.steps.aiAnalysis.title"),
      desc: t("workflow.steps.aiAnalysis.desc"),
      icon: Cpu,
      details: t("workflow.steps.aiAnalysis.details"),
      tag: t("workflow.steps.aiAnalysis.tag")
    },
    {
      id: 3,
      title: t("workflow.steps.yieldPrediction.title"),
      desc: t("workflow.steps.yieldPrediction.desc"),
      icon: BarChart3,
      details: t("workflow.steps.yieldPrediction.details"),
      tag: t("workflow.steps.yieldPrediction.tag")
    },
    {
      id: 4,
      title: t("workflow.steps.expertValidation.title"),
      desc: t("workflow.steps.expertValidation.desc"),
      icon: Microscope,
      details: t("workflow.steps.expertValidation.details"),
      tag: t("workflow.steps.expertValidation.tag")
    },
    {
      id: 5,
      title: t("workflow.steps.smartCropPlan.title"),
      desc: t("workflow.steps.smartCropPlan.desc"),
      icon: ClipboardList,
      details: t("workflow.steps.smartCropPlan.details"),
      tag: t("workflow.steps.smartCropPlan.tag")
    }
  ];

  return (
    <section className="workflow-section">
      <div className="workflow-container">
        
        <div className="workflow-header">
          <h2>{t("workflow.title")}</h2>
          <p>{t("workflow.subtitle")}</p>
        </div>

        <div className="workflow-timeline-wrap">
          <div className="workflow-line">
            <div className="workflow-line-progress" />
          </div>

          <div className="workflow-steps">
            {steps.map((step) => (
              <div key={step.id} className={`workflow-step-item ${step.id === 1 ? 'active' : ''}`}>
                
                {/* Step Popup */}
                <div className="step-popup">
                  <span className="popup-tag">{step.tag}</span>
                  <h4>{step.title}</h4>
                  <p>{step.details}</p>
                </div>

                {/* Step Node */}
                <div className="step-node">
                  {step.id}
                </div>

                {/* Step Content */}
                <div className="step-content">
                  <div className="icon-badge" style={{ marginBottom: '1rem' }}>
                    <step.icon />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Workflow;