import StakeholderCard from "./StakeholderCard";
import "./../../styles/features.css";

function Stakeholders() {
  return (
    <section className="stakeholders">

      <div className="stakeholder-container">

        <StakeholderCard
          icon="🚜"
          title="For Farmers"
          items={[
            "Direct marketplace access",
            "Real-time weather insights",
            "Crop disease identification",
            "Government subsidy tracking"
          ]}
        />

        <StakeholderCard
          icon="📋"
          title="For Officers"
          items={[
            "Regional yield analytics",
            "Bulk outreach management",
            "Verification workflows",
            "Data-driven policy planning"
          ]}
          highlight
        />

        <StakeholderCard
          icon="🥗"
          title="For Consumers"
          items={[
            "Farm-to-table traceability",
            "Direct produce purchase",
            "Organic certification verify",
            "Transparent pricing data"
          ]}
        />

      </div>

    </section>
  );
}

export default Stakeholders;