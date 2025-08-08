// src/pages/dashboard/insights.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define type for chart data (ESLint: no-explicit-any)
type ChartEntry = {
  day: string;
  income: number;
};

interface IncomeEntry {
  amount: number;
  created_at: string;
}

export default function InsightsPage() {
  //  Removed unused session state to fix ESLint unused-vars error
  const [businessType, setBusinessType] = useState<string>('');
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [weeklyData, setWeeklyData] = useState<ChartEntry[]>([]);
  const [tip, setTip] = useState<string>('');
  const [bestDay, setBestDay] = useState<string>('');
  const [worstDay, setWorstDay] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Move helper functions inside useEffect to avoid missing-deps ESLint warnings
    const fetchProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('business_type')
        .eq('id', userId)
        .single();

      if (!error && data?.business_type) {
        setBusinessType(data.business_type);
        generateTip(data.business_type);
      }
    };

    const fetchIncomeData = async (userId: string) => {
      const { data, error } = await supabase
        .from('income')
        .select('amount, created_at')
        .eq('user_id', userId);

      if (!error && data) {
        const total = data.reduce((sum, entry) => sum + (entry.amount || 0), 0);
        setTotalIncome(total);

        const weekly = Array(7).fill(0);
        data.forEach((entry: IncomeEntry) => {
          const day = new Date(entry.created_at).getDay();
          weekly[day] += entry.amount;
        });

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartData = days.map((day, idx) => ({ day, income: weekly[idx] }));
        setWeeklyData(chartData);

        const max = Math.max(...weekly);
        const min = Math.min(...weekly);
        setBestDay(days[weekly.indexOf(max)]);
        setWorstDay(days[weekly.indexOf(min)]);
      }
    };

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      fetchProfile(user.id);
      fetchIncomeData(user.id);
    };

    init();
  }, [router]); // Added `router` to dependency array

  const generateTip = (type: string) => {
    switch (type) {
      case 'mamamboga':
        setTip('January tip: Stock onions & tomatoes, sukuma demand drops after holidays.');
        break;
      case 'boda':
        setTip('Peak hours are 6–9am and 5–8pm. Save fuel by planning smart shifts.');
        break;
      case 'taxi':
        setTip('Consider early morning and airport routes for higher-paying clients.');
        break;
      case 'thrift':
        setTip('January: Push schoolwear & light sweaters. Back-to-school rush is key.');
        break;
      default:
        setTip('Track your income daily and aim for consistent growth each week.');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full h-full bg-transparent">
          <div className="max-w-2xl mx-auto space-y-8">

            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-400 mb-2">Smart Business Insights</h1>
              <p className="text-gray-400">
                Tailored tips and trends to help your {businessType || 'business'} grow
              </p>
            </div>

            {/* Total Income Card */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h2 className="text-xl font-semibold text-green-300 mb-1">Total Income</h2>
              <p className="text-2xl font-bold text-white">
                KES {totalIncome.toLocaleString()}
              </p>
            </div>

            {/* Weekly Chart */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">Weekly Income Overview</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip cursor={{ fill: '#333' }} />
                  <Bar dataKey="income" fill="#34d399" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Best & Worst Day */}
            <div className="bg-[#1f1f1f] p-4 rounded-xl text-center text-sm text-gray-300 border border-[#2f2f2f]">
              🟢 <strong>Best Day:</strong> {bestDay} &nbsp;&nbsp; 🔴 <strong>Slowest:</strong> {worstDay}
            </div>

            {/* Industry-Specific Tip */}
            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg border border-[#2f2f2f]">
              <h2 className="text-xl font-semibold text-blue-400 mb-2">Smart Tip for You</h2>
              <p className="text-gray-300 text-base">{tip}</p>
            </div>

            {/* Coming Soon */}
            <div className="bg-[#2a2a2a] p-4 rounded-xl text-center text-sm text-gray-400">
              Market Watch: Onion prices expected to rise next month due to Narok drought.<br />
              Premium: Get real-time supplier alerts and demand maps soon.
            </div>

          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
