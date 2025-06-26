import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Onboarding() {
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    business_type: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Could not fetch user.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: form.full_name,
      phone_number: form.phone_number,
      business_type: form.business_type,
      location: form.location,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile created! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>Onboarding | Jaza</title>
        </Head>

        <main className="min-h-screen bg-gradient-to-br from-[#f5fdf9] via-[#e8f5e8] to-[#d4f4dd] flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl bg-black/90 backdrop-blur-sm text-white p-10 rounded-3xl shadow-2xl border border-[#1c8c4c]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c8c4c]/5 via-transparent to-[#b0eacf]/5 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1c8c4c] to-[#15753f] rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#b0eacf] to-[#1c8c4c] bg-clip-text text-transparent">
                  Welcome to Jaza
                </h1>
                <p className="text-gray-300 text-lg">Tell us about yourself to get started</p>
              </div>

              {message && (
                <div className={`mb-6 text-sm text-center px-4 py-3 rounded-xl border transition-all duration-300 ${
                  message.includes("error") || message.includes("Could not") 
                    ? "bg-red-50 text-red-700 border-red-200" 
                    : "bg-[#d0f0dd] text-[#1c8c4c] border-[#1c8c4c]/20"
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#b0eacf] mb-2">Full Name</label>
                  <input
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#1c8c4c]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1c8c4c]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#b0eacf] mb-2">Phone Number</label>
                  <input
                    name="phone_number"
                    type="tel"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#1c8c4c]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1c8c4c]"
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-[#b0eacf] mb-2">Business Type</label>
                  <select
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#1c8c4c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#1c8c4c] appearance-none"
                  >
                    <option value="" className="bg-gray-800 text-white">Select your business type...</option>
                    <option value="mamamboga" className="bg-gray-800 text-white">Mamamboga</option>
                    <option value="boda" className="bg-gray-800 text-white">Boda</option>
                    <option value="taxi" className="bg-gray-800 text-white">Taxi</option>
                    <option value="food" className="bg-gray-800 text-white">Food</option>
                    <option value="thrift" className="bg-gray-800 text-white">Thrift (Mtumba)</option>
                    <option value="other" className="bg-gray-800 text-white">Other</option>
                  </select>
                  <div className="absolute right-3 top-10 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#b0eacf] mb-2">Location</label>
                  <input
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter your location"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#1c8c4c]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1c8c4c]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none ${
                    loading
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#1c8c4c] to-[#15753f] hover:from-[#15753f] hover:to-[#1c8c4c] text-white shadow-lg"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Finish Onboarding"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-gray-400 text-sm">
                <p>Ready to grow your business with Jaza? Let's get started!</p>
              </div>
            </div>
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
}
