function StakeholderCard({ icon, title, items, highlight }) {

  return (

    <div className={`stakeholder-card ${highlight ? "highlight" : ""}`}>

      <div className="card-icon">{icon}</div>

      <h3>{title}</h3>

      <ul>
        {items.map((item, index) => (
          <li key={index}>→ {item}</li>
        ))}
      </ul>

    </div>

  );
}

export default StakeholderCard;