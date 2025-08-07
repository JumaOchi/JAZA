import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { getDashboardSummary } from "@/utils/apiClient";

type Summary = {
  today_income: number;
  total_income: number;
  entry_count: number;
};

export default function DashboardHome() {
  const [fullName, setFullName] = useState("Loading...");
  const [businessType, setBusinessType] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, business_type")
          .eq("id", user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name);
          setBusinessType(profile.business_type || "");
        }
      }
    };

    const fetchSummary = async () => {
      try {
        const result = await getDashboardSummary();
        setSummary(result);
      } catch (error) {
        console.error("Failed to fetch dashboard summary:", error);
      }
    };

    fetchUserProfile();
    fetchSummary();
  }, []);

  const insightsMap: Record<string, string[]> = {
    boda: [
      "Peak hours: 6–9AM and 4–8PM. Focus on those.",
      "Fuel cheaper at Total Kamakis & Rubis Thika Road.",
      "Package delivery around CBD up 20% this week.",
      "High-demand in Umoja and CBD this Friday."
    ],
    mamamboga: [
      "Tomatoes are cheaper this week in Wakulima Market.",
      "Sukuma sells best on Tuesdays & Saturdays.",
      "Kawangware foot traffic up 15% this week.",
      "Try bundling offers: 3 onions for 20/= sells better."
    ],
    thrift: [
      "Top-selling jackets this season are trench coats.",
      "Gikomba foot traffic up 10% on Thursdays.",
      "Try night market at Ngara for faster stock movement."
    ],
    food: [
      "Lunch rush strongest 12-2PM, consider promos.",
      "Ubereats trending in Kilimani for local meals.",
      "Source cooking oil in bulk to save 8%."
    ],
    taxi: [
      "Avoid traffic traps: Use Forest Road post-5PM.",
      "Juja trips trending up this week by 13%.",
      "Fuel deals available on Shell app near Thika Rd."
    ],
    other: [
      "Track every sale to improve cashflow.",
      "Consistency improves your Jaza score.",
      "Stay tuned for weekly financial tips."
    ]
  };

  const selectedKey = businessType.toLowerCase().trim();
  const insights = insightsMap[selectedKey] || insightsMap.other;

  const marketTips = [
    "Why Gikomba outpaces other markets in foot traffic.",
    "Which suppliers offer discounts in Kariobangi.",
    "How to negotiate better delivery terms with vendors."
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-[#1c8c4c]">{fullName}</span> 👋
          </h1>
          <p className="text-gray-400 text-base">
            Empowering your growth with real-time financial visibility.
          </p>
        </div>

        {/* Business Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-400 mb-1">Today's Income</h3>
            <p className="text-2xl font-bold text-[#1c8c4c]">
              {summary ? `Ksh ${summary.today_income.toFixed(2)}` : "Loading..."}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-400 mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-blue-400">
              {summary ? `Ksh ${summary.total_income.toFixed(2)}` : "Loading..."}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-400 mb-1">Total Entries</h3>
            <p className="text-2xl font-bold text-white">
              {summary ? summary.entry_count : "Loading..."}
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <motion.div
            className="bg-gray-700 p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              📲 Connect M-Pesa Till
            </h2>
            <p className="text-sm text-gray-300 mb-3">
              Link your business Till or Paybill for real-time income tracking.
            </p>
            <Link href="/dashboard/income">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                Connect Now
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="bg-gray-700 p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              ✍️ Add Daily Cash Earnings
            </h2>
            <p className="text-sm text-gray-300 mb-3">
              Enter your cash sales manually for a full cashflow picture.
            </p>
            <Link href="/dashboard/income">
              <button className="bg-[#1c8c4c] text-white px-4 py-2 rounded-xl hover:bg-green-700">
                Add Cash
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Insights */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">🔍 Smart Insights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {insights.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Industry Snapshot */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">📰 Market Snapshot</h2>
          <ul className="space-y-2 text-gray-300">
            {marketTips.map((news, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded-lg shadow-sm">
                {news}
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <motion.div
          className="bg-[#1c8c4c22] p-6 rounded-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-[#1c8c4c] mb-2">
            💡 Boost your growth with Jaza
          </h2>
          <p className="text-gray-300 mb-4">
            Save towards your next stock boost or float top-up. Earn access to smart credit by staying consistent.
          </p>
          <Link href="/dashboard/jaza">
            <button className="bg-[#1c8c4c] text-white px-6 py-2 rounded-xl hover:bg-green-700">
              View Jaza Plan
            </button>
          </Link>
        </motion.div>

        {/* Coming Soon Section */}
        <div className="mt-12 p-6 bg-gray-700 border border-blue-400 rounded-xl text-blue-300 text-center">
          <h2 className="text-xl font-semibold mb-2">🧠 Coaching & Advice Coming Soon</h2>
          <p className="text-sm">
            Soon you’ll receive personalized financial tips and coaching messages to help you grow your business smarter.
          </p>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
