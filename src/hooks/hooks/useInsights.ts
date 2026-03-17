import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Insights } from '../types';

export function useInsights(phone: string | undefined) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!phone) return;
    supabase.rpc('get_insights', { user_phone: phone })
      .then(({ data }) => {
        setInsights(data);
        setLoading(false);
      });
  }, [phone]);

  return { insights, loading };
}