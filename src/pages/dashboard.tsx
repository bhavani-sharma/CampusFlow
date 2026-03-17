import { useAuth } from '../hooks/hooks/useAuth';
import { useEvents } from '../hooks/hooks/useEvents.ts';
import { format, isToday, isTomorrow } from 'date-fns';
import EventCard from '../components/eventcard';
import StatCard from '../components/StatCard.tsx';
import EmptyState from '../components/EmtpyState.tsx';

export default function Dashboard() {
  const { user } = useAuth();
  const { events, loading } = useEvents(user?.phone);

  const todayEvents = events.filter(e =>
    e.scheduled_at && isToday(new Date(e.scheduled_at))
  );
  const upcomingEvents = events.filter(e =>
    e.scheduled_at && !isToday(new Date(e.scheduled_at))
  ).slice(0, 5);

  const thisWeekCount = events.filter(e => {
    if (!e.scheduled_at) return false;
    const d = new Date(e.scheduled_at);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return d >= weekStart;
  }).length;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">
        Good morning, {user?.name || 'Student'}
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        {format(new Date(), 'EEEE, MMMM d')}
      </p>

      {/* Stat cards row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Events today" value={todayEvents.length} />
        <StatCard label="This week" value={thisWeekCount} />
        <StatCard label="Total events" value={events.length} />
      </div>

      {/* Today's events */}
      <h3 className="font-medium text-gray-700 mb-3">Today</h3>
      {todayEvents.length === 0
        ? <EmptyState message="No events today. Send a WhatsApp message to add one!" />
        : todayEvents.map(e => <EventCard key={e.id} event={e} />)
      }

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <>
          <h3 className="font-medium text-gray-700 mt-8 mb-3">Upcoming</h3>
          {upcomingEvents.map(e => <EventCard key={e.id} event={e} />)}
        </>
      )}
    </div>
  );
}