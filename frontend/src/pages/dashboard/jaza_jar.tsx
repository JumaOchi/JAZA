// src/pages/dashboard/jaza.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from "@/components/DashboardLayout";

export default function JazaJar() {
  // Removed unused `session` state 
  const [savings, setSavings] = useState<number>(0);
  const [goal, setGoal] = useState<number>(3000);
  const [savingRate, setSavingRate] = useState<number>(10); // percent
  const [inputGoal, setInputGoal] = useState('');
  const [inputRate, setInputRate] = useState('');
  const [userId, setUserId] = useState<string | null>(null); // store userId for reuse

  // Fetch user once on mount 
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchSavings(user.id, savingRate); // initial fetch
      }
    };
    init();
  }, [savingRate]);

  // Refetch savings when savingRate changes
  useEffect(() => {
    if (userId) {
      fetchSavings(userId, savingRate);
    }
  }, [savingRate, userId]);

  const fetchSavings = async (id: string, rate: number) => {
    const { data, error } = await supabase
      .from('income')
      .select('amount')
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const totalSaved = data.reduce(
        (sum, item) => sum + (item.amount * rate / 100),
        0
      );
      setSavings(totalSaved);
    }
  };

  const handleGoalUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedGoal = parseFloat(inputGoal);
    const parsedRate = parseFloat(inputRate);
    if (!isNaN(parsedGoal)) setGoal(parsedGoal);
    if (!isNaN(parsedRate)) setSavingRate(parsedRate);
    setInputGoal('');
    setInputRate('');
  };

  const progress = Math.min((savings / goal) * 100, 100);
  const qualifiedAmount = savings * 2;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full h-full bg-transparent">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-400">Jaza Jar</h1>
              <p className="text-gray-400">Save daily, unlock funding, grow your hustle 🚀</p>
            </div>

            {/* Progress Overview */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-green-300 mb-1">Savings Progress</h2>
              <div className="relative w-full h-10 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                KES {savings.toLocaleString()} saved out of KES {goal.toLocaleString()}.<br />
                ✅ You qualify for up to <strong>KES {qualifiedAmount.toLocaleString()}</strong> based on your savings.
              </p>
            </div>

            {/* Settings */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-yellow-300 mb-2">Customize Your Savings Plan</h2>
              <form onSubmit={handleGoalUpdate} className="space-y-4">
                <div>
                  <label className="text-sm block text-gray-400 mb-1">Set Savings Goal (KES)</label>
                  <input
                    type="number"
                    min="0"
                    value={inputGoal}
                    onChange={(e) => setInputGoal(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full rounded-lg px-4 py-2 bg-gray-900 border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm block text-gray-400 mb-1">Saving Rate (% of income)</label>
                  <input
                    type="number"
                    min="0"
                    value={inputRate}
                    onChange={(e) => setInputRate(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full rounded-lg px-4 py-2 bg-gray-900 border border-gray-700 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl text-white transition"
                >
                  Update Plan
                </button>
              </form>
            </div>

            {/* Tips */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-blue-300 mb-2">Smart Saving Tips</h2>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Turn on automatic savings (coming soon)</li>
                <li>Save even KES 50 a day — consistency matters</li>
                <li>Top savers qualify for cashback vouchers</li>
                <li>Milestones unlock better Jaza credit limits</li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-500">
               Your savings data is private & secure
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
