// pages/confirm-email.tsx
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function ConfirmEmail() {
  const [message, setMessage] = useState("Confirming your email...");
  const router = useRouter();

  useEffect(() => {
    const confirm = async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        setMessage("Confirmation failed. Try logging in.");
      } else {
        setMessage("Email confirmed! Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    confirm();
  }, [router]);

  return (
    <>
      <Head>
        <title>Confirm Email | Jaza</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-[#f5fdf9] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1c8c4c] mb-4">Jaza</h2>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </main>
    </>
  );
}
