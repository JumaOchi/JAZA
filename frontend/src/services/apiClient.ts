import { supabase } from "@/lib/supabaseClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const callProtectedBackend = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>
) => {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) throw new Error("User is not authenticated");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorText}`);
  }

  return response.json();
};

export const getDashboardSummary = async () => {
  const raw = await callProtectedBackend("/dashboard/summary", "GET");

  // Normalize shape so index.tsx never breaks
  return {
    today_income: Number(raw.today_income ?? raw.todayIncome ?? 0),
    total_income: Number(raw.total_income ?? raw.totalIncome ?? 0),
    entries_count: Number(raw.entries_count ?? raw.entriesCount ?? 0),
  };
};
