import { format } from 'date-fns';
import type { Event } from '../types';

const intentColors = {
  reminder: 'bg-amber-50 text-amber-700 border-amber-200',
  event:    'bg-violet-50 text-violet-700 border-violet-200',
  question: 'bg-blue-50 text-blue-700 border-blue-200',
  insight:  'bg-green-50 text-green-700 border-green-200',
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl
                    border border-gray-100 mb-3 hover:border-gray-200
                    transition-colors">
      <div className="w-12 text-center flex-shrink-0">
        {event.scheduled_at ? (
          <>
            <div className="text-xs text-gray-400">
              {format(new Date(event.scheduled_at), 'MMM')}
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {format(new Date(event.scheduled_at), 'd')}
            </div>
            <div className="text-xs text-gray-400">
              {format(new Date(event.scheduled_at), 'h:mm a')}
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-300">No date</div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800 mb-1">{event.title}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full border
                          ${intentColors[event.intent]}`}>
          {event.intent}
        </span>
      </div>
    </div>
  );
}