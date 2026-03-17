import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, parseISO } from 'date-fns';
import { useAuth } from '../hooks/hooks/useAuth';
import { useEvents } from '../hooks/hooks/useEvents';
import EventCard from '../components/eventcard';
import EmptyState from '../components/EmtpyState';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const { user } = useAuth();
  const { events, loading } = useEvents(user?.phone);
  const [selected, setSelected] = useState<Date>(new Date());

  // Events on the currently selected date
  const dayEvents = events.filter(e =>
    e.scheduled_at
      ? isSameDay(parseISO(e.scheduled_at), selected)
      : false
  );

  // Build a set of date strings that have events — used for dot markers
  const eventDates = new Set(
    events
      .filter(e => e.scheduled_at)
      .map(e => format(parseISO(e.scheduled_at!), 'yyyy-MM-dd'))
  );

  function handleDateChange(value: any) {
    if (value instanceof Date) setSelected(value);
  }

  // Add a dot below dates that have events
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view !== 'month') return null;
    const key = format(date, 'yyyy-MM-dd');
    if (!eventDates.has(key)) return null;
    return (
      <div className="flex justify-center mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 block" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-gray-400">
        Loading calendar...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Calendar</h2>

      <div className="flex gap-8 flex-wrap">

        {/* Calendar widget */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4
                        flex-shrink-0 calendar-wrapper">
          <Calendar
            onChange={handleDateChange}
            value={selected}
            tileContent={tileContent}
            className="campus-calendar"
            locale="en-US"
          />
        </div>

        {/* Events for selected day */}
        <div className="flex-1 min-w-[260px]">
          <h3 className="font-medium text-gray-700 mb-4">
            {format(selected, 'EEEE, MMMM d')}
          </h3>

          {dayEvents.length === 0 ? (
            <EmptyState
              icon="check"
              message="Nothing on this day"
              sub="Message CampusFlow on WhatsApp to add an event"
            />
          ) : (
            <div className="flex flex-col gap-2">
              {dayEvents.map(e => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Inline CSS to restyle react-calendar to match the app */}
      <style>{`
        .campus-calendar {
          border: none !important;
          font-family: inherit !important;
          width: 320px !important;
        }
        .campus-calendar .react-calendar__tile {
          border-radius: 8px !important;
          padding: 10px 6px !important;
          font-size: 13px !important;
        }
        .campus-calendar .react-calendar__tile--active {
          background: #7C3AED !important;
          color: white !important;
        }
        .campus-calendar .react-calendar__tile--now {
          background: #EDE9FE !important;
          color: #5B21B6 !important;
        }
        .campus-calendar .react-calendar__tile--active.react-calendar__tile--now {
          background: #7C3AED !important;
          color: white !important;
        }
        .campus-calendar .react-calendar__tile:hover {
          background: #F5F3FF !important;
        }
        .campus-calendar .react-calendar__navigation button {
          font-size: 14px !important;
          font-weight: 500 !important;
          border-radius: 8px !important;
        }
        .campus-calendar .react-calendar__navigation button:hover {
          background: #F5F3FF !important;
        }
        .campus-calendar .react-calendar__month-view__weekdays__weekday {
          font-size: 11px !important;
          font-weight: 500 !important;
          color: #9CA3AF !important;
          text-decoration: none !important;
        }
        .campus-calendar .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
}