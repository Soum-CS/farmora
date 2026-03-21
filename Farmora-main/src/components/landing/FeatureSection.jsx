import "../../styles/features.css";

function FeatureSection() {
  return (
    <section className="stakeholders-section">

      <div className="section-header">
        <h2>Tailored Experience for Every Stakeholder</h2>

        <p>
          Farmora provides a seamless digital ecosystem designed specifically
          to address the unique needs of India's agricultural landscape,
          empowering everyone from the ground up.
        </p>
      </div>

      <div className="stakeholder-grid">

        {/* Farmers */}

        <div className="stakeholder-card">

          <span className="card-icon">🚜</span>

          <h3>For Farmers</h3>

          <ul className="feature-list">
            <li> Direct marketplace access</li>
            <li> Real-time weather insights</li>
            <li> Crop disease identification</li>
            <li> Government subsidy tracking</li>
          </ul>

        </div>


        {/* Officers (Highlighted Card) */}

        <div className="stakeholder-card highlighted">

          <span className="card-icon">📋</span>

          <h3>For Officers</h3>

          <ul className="feature-list">
            <li>Regional yield analytics</li>
            <li> Bulk outreach management</li>
            <li> Verification workflows</li>
            <li>Data-driven policy planning</li>
          </ul>

        </div>


        {/* Consumers */}

        <div className="stakeholder-card">

          <span className="card-icon">🥗</span>

          <h3>For Consumers</h3>

          <ul className="feature-list">
            <li>Farm-to-table traceability</li>
            <li> Direct produce purchase</li>
            <li>Organic certification verify</li>
            <li>Transparent pricing data</li>
          </ul>

        </div>

      </div>

    </section>
  );
}

export default FeatureSection;