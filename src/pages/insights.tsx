import { BarChart, Bar, XAxis, YAxis, Tooltip,
         PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/hooks/useAuth';
import { useInsights } from '../hooks/hooks/useInsights';

const COLORS = ['#7C3AED','#10B981','#F59E0B','#3B82F6'];

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

export default function Insights() {
  const { user } = useAuth();
  const { insights, loading } = useInsights(user?.phone);

  if (loading) return <div>Loading insights...</div>;
  if (!insights) return <div>No data yet.</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Insights</h2>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard label="Total events" value={insights.total_events} />
        <StatCard label="This week"    value={insights.this_week} />
        <StatCard label="Reminders sent" value={insights.reminders_sent} />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Bar chart — events by day */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-medium text-gray-700 mb-4">Events by day</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={insights.by_day}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#7C3AED" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — by intent */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-medium text-gray-700 mb-4">By type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={insights.by_intent} dataKey="count"
                   nameKey="intent" cx="50%" cy="50%" outerRadius={80}>
                {insights.by_intent.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}