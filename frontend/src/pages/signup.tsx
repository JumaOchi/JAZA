// pages/signup.tsx
import Head from "next/head";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm-email',
      },
    });


    if (error) {
      setMessage(error.message);
    } else {
      setSignupSuccess(true);
      setMessage("Signup successful! Check your email to confirm.");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up | Jaza</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-[#f5fdf9] px-4">
        <div className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          
          {/* Branding Section */}
          <div className="bg-black text-white flex flex-col justify-center items-center p-10 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">JAZA</h2>
            <p className="text-lg font-light text-[#b0eacf]">
              Accelerate your growth.
            </p>
            <p className="text-sm text-center text-gray-300 leading-relaxed max-w-sm">
              Intelligent, behavior-based financial visibility,<br />
              savings coaching, and access to affordable credit — tailored for small businesses.
            </p>
          </div>

          {/* Signup Form Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-[#1c8c4c] mb-6 text-center">
              Create your Jaza account
            </h1>

            {message && (
              <div className="mb-4 text-center text-sm text-[#15753f] bg-[#d0f0dd] px-3 py-2 rounded-lg">
                {message}
              </div>
            )}

            {signupSuccess ? (
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-base">
                  You're almost there! Check your email to confirm your account.
                </p>
                <Link href="/login" className="text-[#1c8c4c] font-medium hover:underline">
                  Proceed to login →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] text-black placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
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

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg transition text-white font-medium ${
                    loading ? "bg-gray-400" : "bg-[#1c8c4c] hover:bg-[#15753f]"}
                  `}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
