import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", yield: 2.5 },
  { month: "Feb", yield: 2.8 },
  { month: "Mar", yield: 3.1 },
  { month: "Apr", yield: 3.6 },
  { month: "May", yield: 4.2 },
];

function YieldChart() {
  return (
    <div className="yield-chart">

      <p className="chart-title">Yield Prediction</p>

      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="month" hide />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="yield"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default YieldChart;