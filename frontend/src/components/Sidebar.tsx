import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Income", href: "/dashboard/income" },
  { label: "Jaza Jar", href: "/dashboard/jaza" },
  { label: "Insights", href: "/dashboard/insights" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-[#0f1115] text-white p-6 hidden md:block shadow-lg">
      <h2 className="text-3xl font-bold text-[#1c8c4c] mb-10">Jaza</h2>
      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={`block px-4 py-2 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-[#1c8c4c] text-white shadow-md"
                    : "text-gray-300 hover:bg-[#1c8c4c22] hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
