import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Event } from '../types';

export function useEvents(phone: string | undefined) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!phone) return;

    // Initial fetch
    supabase.from('events').select('*')
      .eq('phone', phone)
      .order('scheduled_at', { ascending: true })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });

    // Realtime subscription — new events from n8n appear instantly
    const channel = supabase.channel('events-web')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'events',
        filter: `phone=eq.${phone}`
      }, (payload) => {
        setEvents(prev => [...prev, payload.new as Event]
          .sort((a,b) => new Date(a.scheduled_at!).getTime()
                       - new Date(b.scheduled_at!).getTime())
        );
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [phone]);

  return { events, loading };
}