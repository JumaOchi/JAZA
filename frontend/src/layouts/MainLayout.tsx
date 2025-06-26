import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-gray-100 border-b px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">Jaza</div>
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/savings">Jaza Jar</Link></li>
          <li><Link href="/insights">Insights</Link></li>
          <li><Link href="/mpesa">M-Pesa</Link></li>
          <li><Link href="/auth/login">Login</Link></li>
        </ul>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
