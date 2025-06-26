// pages/login.tsx
import Head from "next/head";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setMessage("Incorrect email or password.");
      } else if (error.message.includes("Email not confirmed")) {
        setMessage("Please confirm your email before logging in.");
      } else {
        setMessage(error.message);
      }
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setMessage("Login failed: No user returned.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setResetSent(true);
      setMessage("Password reset link sent to your email.");
    }

    setLoading(false);
  };

  // Auto-clear error message when user starts typing again
  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setMessage("");
  };

  return (
    <>
      <Head>
        <title>Login | Jaza</title>
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
              Intelligent, behavior-based financial visibility,
              <br />
              savings coaching, and access to affordable credit — tailored for small businesses.
            </p>
          </div>

          {/* Login Form Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-[#1c8c4c] mb-6 text-center">
              {isResetting ? "Reset your password" : "Welcome back to Jaza"}
            </h1>

            {message && (
              <div
                className={`mb-4 text-center text-sm px-3 py-2 rounded-lg ${
                  message.toLowerCase().includes("sent") || message.includes("successful")
                    ? "text-green-700 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={isResetting ? handleResetPassword : handleLogin}
              className="space-y-5"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] text-black placeholder-gray-400"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  required
                />
              </div>

              {!isResetting && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] text-black placeholder-gray-400"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg transition text-white font-medium flex items-center justify-center ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c8c4c] hover:bg-[#15753f]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isResetting ? "Sending..." : "Logging in..."}</span>
                  </div>
                ) : (
                  <span>{isResetting ? "Send Reset Link" : "Login"}</span>
                )}
              </button>
            </form>

            {!isResetting && (
              <div className="text-sm text-center text-gray-600 mt-3">
                <button
                  className="text-[#1c8c4c] hover:underline"
                  onClick={() => setIsResetting(true)}
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {isResetting && !resetSent && (
              <div className="text-sm text-center text-gray-600 mt-3">
                <button
                  className="text-[#1c8c4c] hover:underline"
                  onClick={() => setIsResetting(false)}
                >
                  Back to login
                </button>
              </div>
            )}

            {!isResetting && (
              <p className="text-sm text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-[#1c8c4c] font-medium hover:underline">
                  Sign up here
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
