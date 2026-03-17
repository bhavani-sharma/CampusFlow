import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import type { User } from '../types';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUser(session.user.id);
      setLoading(false);
    });

    // Listen for auth changes (magic link redirect fires here)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchUser(session.user.id);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  async function fetchUser(id: string) {
    const { data } = await supabase
      .from('users').select('*').eq('id', id).single();
    setUser(data);
  }

  async function signInWithEmail(email: string) {
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' }
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null); setUser(null);
  }

  return { session, user, loading, signInWithEmail, signOut };
}