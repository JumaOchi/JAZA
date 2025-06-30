import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Income", href: "/dashboard/income" },
  { label: "Jaza Jar", href: "/dashboard/jaza_jar" },
  { label: "Insights", href: "/dashboard/insights" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 bg-[#1c8c4c] p-2 rounded text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed top-0 left-0 z-40 w-64 h-screen p-6 flex flex-col justify-between shadow-lg bg-gray-900 text-white md:block`}
      >
        <div>
          <h2 className="text-3xl font-bold text-[#1c8c4c] mb-10">Jaza</h2>
          <nav className="space-y-3">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href} legacyBehavior>
                  <a
                    className={`block px-4 py-2 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "bg-[#1c8c4c] text-white shadow-md"
                        : "text-gray-300 hover:bg-[#1c8c4c22] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white text-left ml-4 mb-4"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
