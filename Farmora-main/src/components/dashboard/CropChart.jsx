import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", yield: 40 },
  { month: "Feb", yield: 55 },
  { month: "Mar", yield: 65 },
  { month: "Apr", yield: 80 },
  { month: "May", yield: 90 }
];

function CropChart() {
  return (
    <div className="chart-card">
      <h3>Crop Yield Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="yield" stroke="#4CAF50" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default CropChart;