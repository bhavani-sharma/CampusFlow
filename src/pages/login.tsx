import { useState } from 'react';
import { useAuth } from '../hooks/hooks/useAuth';

export default function Login() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithEmail(email);
    if (!error) setSent(true);
    setLoading(false);
  }

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm">
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-gray-500 text-sm">
          We sent a magic link to <strong>{email}</strong>.
          Click it to sign in — no password needed.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">CampusFlow</h1>
        <p className="text-gray-500 text-sm mb-6">
          Sign in with your college email
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="you@cmrit.ac.in"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-gray-200 rounded-lg px-4 py-2.5
                       text-sm focus:outline-none focus:border-violet-400"
          />
          <button type="submit" disabled={loading}
            className="bg-violet-600 text-white rounded-lg px-4 py-2.5
                       text-sm font-medium hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>
      </div>
    </div>
  );
}