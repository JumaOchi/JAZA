// src/pages/dashboard/income.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Session } from '@supabase/supabase-js';
import DashboardLayout from "@/components/DashboardLayout";

export default function IncomePage() {
  const [cashIncome, setCashIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [incomeHistory, setIncomeHistory] = useState<any[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserAndFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setSession({ user } as Session);
        fetchIncome(user.id);
      } else {
        router.push('/login');
      }
    };

    getUserAndFetch();
  }, []);

  const fetchIncome = async (userId: string) => {
    const { data, error } = await supabase
      .from('income')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Fetch income error:', error.message);
    } else {
      console.log('Fetched recent income:', data);
      setIncomeHistory(data);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashIncome || !session) return;

    setLoading(true);

    const { error } = await supabase.from('income').insert({
      amount: parseFloat(cashIncome),
      user_id: session.user.id,
      source: 'manual',
    });

    if (!error) {
      setCashIncome('');
      fetchIncome(session.user.id);
    } else {
      alert('Failed to save income: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full h-full bg-transparent">
          <div className="max-w-xl mx-auto space-y-8">

            {/* Manual Income Form */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h1 className="text-2xl font-bold text-green-400 mb-2">Record Today's Income</h1>
              <p className="text-gray-400 text-sm mb-4">Track cash income manually to keep your books updated.</p>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Cash Income (KES)</label>
                  <input
                    type="number"
                    value={cashIncome}
                    onChange={(e) => setCashIncome(e.target.value)}
                    className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-green-500 bg-[#2a2a2a] text-white placeholder-white"
                    placeholder="e.g. 500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Submit'}
                </button>
              </form>
            </div>

            {/* Recent Income Summary */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h2 className="text-xl font-semibold text-green-300 mb-4">Recent Income Entries</h2>
              {incomeHistory.length === 0 ? (
                <p className="text-gray-500">No income recorded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {incomeHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex justify-between text-sm text-gray-300 border-b border-gray-700 py-1"
                    >
                      <span>KES {entry.amount} ({entry.source})</span>
                      <span>{new Date(entry.created_at).toLocaleTimeString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* M-Pesa Connection Placeholder */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">Connect Your M-Pesa Till</h2>
              <p className="text-gray-400 text-sm mb-4">
                Automatically track M-Pesa payments made to your phone or business till.
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                onClick={() => alert('M-Pesa API integration coming soon')}
              >
                Connect M-Pesa
              </button>
            </div>

          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
