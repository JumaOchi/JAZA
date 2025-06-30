import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 bg-black text-white p-4 md:ml-64">
        {children}
      </main>
    </div>
  );
}
