// frontend/src/lib/apiClient.ts
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

/**
 * Normalizes backend summary response so UI code is stable
 * even if backend changes the structure slightly.
 */
export const getDashboardSummary = async () => {
  const raw = await callProtectedBackend("/dashboard/summary", "GET");

  // Normalize shape (fill defaults if missing)
  return {
    totalIncome: raw?.total_income ?? 0,
    todayIncome: raw?.today_income ?? 0,
    sourceBreakdown: Array.isArray(raw?.source_breakdown)
      ? raw.source_breakdown.map((s: any) => ({
          source: s?.source ?? "Unknown",
          total: s?.total ?? 0,
        }))
      : [],
  };
};
