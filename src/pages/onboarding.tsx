import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/hooks/useAuth';
import { useState } from 'react';

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Save phone to users table (matched by auth user id)
    await supabase.from('users')
      .update({ phone, name: user?.email?.split('@')[0] })
      .eq('id', user?.id);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-2">One last step</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the WhatsApp number you'll message CampusFlow from.
        </p>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:border-violet-400"
          />
          <button type="submit" disabled={loading}
            className="bg-violet-600 text-white rounded-lg px-4 py-2.5
                       text-sm font-medium hover:bg-violet-700">
            {loading ? 'Saving...' : 'Get started'}
          </button>
        </form>
      </div>
    </div>
  );
}