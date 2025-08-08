// pages/reset-password.tsx
import Head from "next/head";
// Removed unused import `useEffect` — flagged by @typescript-eslint/no-unused-vars
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetComplete, setResetComplete] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset successful.");
      setResetComplete(true);

      // Optional: auto-redirect after 5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Reset Password | Jaza</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-[#f5fdf9] px-4">
        <div className="w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          
          {/* Branding Left */}
          <div className="bg-black text-white flex flex-col justify-center items-center p-10">
            <h2 className="text-3xl font-bold">JAZA</h2>
            <p className="text-[#b0eacf] mt-2">Accelerate your growth.</p>
            <p className="text-sm text-gray-300 mt-4 text-center max-w-xs">
              Intelligent, behavior-based financial visibility, savings coaching, and access to affordable credit.
            </p>
          </div>

          {/* Reset Password Form or Success Message */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-xl font-bold text-[#1c8c4c] mb-6 text-center">
              Reset your password
            </h1>

            {message && (
              <div className="mb-4 text-center text-sm text-[#15753f] bg-[#d0f0dd] px-3 py-2 rounded-lg">
                {message}
              </div>
            )}

            {resetComplete ? (
              <div className="text-center mt-6">
                <p className="mb-4 text-gray-700">Redirecting to login page...</p>
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-[#1c8c4c] hover:bg-[#15753f] text-white rounded-lg font-medium"
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] text-black placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] text-black placeholder-gray-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg transition text-white font-medium ${
                    loading ? "bg-gray-400" : "bg-[#1c8c4c] hover:bg-[#15753f]"}
                  `}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
