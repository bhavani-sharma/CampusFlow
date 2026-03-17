export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  push_token?: string;
  google_token?: string;
  created_at: string;
}

export interface Event {
  id: string;
  phone: string;
  title: string;
  intent: 'reminder' | 'event' | 'question' | 'insight';
  scheduled_at: string | null;
  sent: boolean;
  raw_message: string;
  created_at: string;
}

export interface Insights {
  total_events: number;
  this_week: number;
  reminders_sent: number;
  by_day: { day: string; count: number }[];
  by_intent: { intent: string; count: number }[];
}