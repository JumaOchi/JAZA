// File: frontend/src/services/apiClient.ts
import { supabase } from "@/lib/supabaseClient";

export const callProtectedBackend = async (endpoint: string, method = "GET", body?: any) => {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;

  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`http://localhost:8000${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // <-- send token to backend
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response.json();
};
