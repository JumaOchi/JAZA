import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const insights = [
    "You are on track to increase revenue by 25% this week.",
    "Your busiest sales days are Fridays between 3-6PM.",
    "You could grow savings by 15% by reducing float withdrawals."
  ];

  const marketTips = [
    "Best-selling secondhand jackets this season.",
    "Where mitumba sellers source quality stock.",
    "Why Nairobi Gikomba outpaces other markets in foot traffic."
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">
            Welcome back, <span className="text-[#1c8c4c]">Mitumba Pro</span> 👋
          </h1>
          <p className="text-gray-600 text-base">
            Empowering your growth with real-time financial visibility.
          </p>
        </div>

        {/* Business Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 mb-1">Yesterday's Total Earnings</h3>
            <p className="text-2xl font-bold text-[#1c8c4c]">Ksh 1,400</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 mb-1">Monthly Revenue Growth</h3>
            <p className="text-2xl font-bold text-blue-500">+30%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 mb-1">Jaza Jar Savings</h3>
            <p className="text-2xl font-bold text-[#1c8c4c]">Ksh 2,000 / 5,000</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <motion.div
            className="bg-[#f0f9ff] p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              📲 Connect M-Pesa Till
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              Link your business Till or Paybill for real-time income tracking.
            </p>
            <Link href="/dashboard/income">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                Connect Now
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="bg-[#f0fdf9] p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              ✍️ Add Daily Cash Earnings
            </h2>
            <p className="text-sm text-gray-700 mb-3">
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
          <h2 className="text-xl font-bold text-[#111827] mb-4">🔍 Smart Insights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {insights.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Industry Snapshot */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#111827] mb-4">📰 Mtumba Market Snapshot</h2>
          <ul className="space-y-2 text-gray-700">
            {marketTips.map((news, idx) => (
              <li key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                {news}
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <motion.div
          className="bg-[#e0f7ec] p-6 rounded-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-[#1c8c4c] mb-2">
            💡 Boost your growth with Jaza
          </h2>
          <p className="text-gray-700 mb-4">
            Save towards your next stock boost or float top-up. Earn access to smart credit by staying consistent.
          </p>
          <Link href="/dashboard/jaza">
            <button className="bg-[#1c8c4c] text-white px-6 py-2 rounded-xl hover:bg-green-700">
              View Jaza Plan
            </button>
          </Link>
        </motion.div>

        {/* Coming Soon Section */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-300 rounded-xl text-yellow-800 text-center">
          <h2 className="text-xl font-semibold mb-2">🧠 Coaching & Advice Coming Soon</h2>
          <p className="text-sm">
            Soon you’ll receive personalized financial tips and coaching messages to help you grow your business smarter.
          </p>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
