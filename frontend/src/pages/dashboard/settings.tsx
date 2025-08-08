// src/pages/dashboard/settings.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from "@/components/DashboardLayout";
import { User } from '@supabase/supabase-js'; // FIX: Explicit type import for Supabase User

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ full_name: '', phone_number: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data,
        error: userError,
      } = await supabase.auth.getUser();

      const user: User | null = data?.user ?? null; // FIX: Explicit type assignment to avoid TS error

      if (userError || !user) {
        router.push('/login');
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // FIX: .single() → .maybeSingle() to satisfy strict null checks

      if (!error && profileData) {
        setProfile(profileData);
        setForm({
          full_name: profileData.full_name || '',
          phone_number: profileData.phone_number || '',
          location: profileData.location || '',
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]); // FIX: Added router as dependency for useEffect lint rule

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const {
      data,
      error: userError,
    } = await supabase.auth.getUser();

    const user: User | null = data?.user ?? null; // FIX: Explicit type assignment

    if (userError || !user) {
      setMessage('Unable to get user session. Please log in again.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update(form)
      .eq('id', user.id);

    if (error) {
      setMessage('Failed to update profile.');
    } else {
      setMessage('Profile updated successfully!');
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full h-full bg-transparent">
          <div className="max-w-xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-green-400 text-center">Settings</h1>

            <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-green-300 mb-2">Update Your Profile</h2>
              {message && <p className="mb-4 text-sm text-yellow-400">{message}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <input
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-2 bg-gray-900 border border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                  <input
                    name="phone_number"
                    type="tel"
                    value={form.phone_number}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-2 bg-gray-900 border border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <input
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-2 bg-gray-900 border border-gray-700 text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl text-white transition"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            <div className="text-center text-sm text-gray-500">
              Need help? Email us at support@jaza.app
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
