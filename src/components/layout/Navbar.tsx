"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `hover:text-blue-600 ${
      pathname === href ? "text-blue-600 font-semibold" : "text-slate-700"
    }`;

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Sima Labs</h1>

      <div className="flex gap-6 text-sm">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/dashboard/testcases" className={linkClass("/dashboard/testcases")}>TestCases</Link>
		<Link href="/calculadora" className={linkClass("/calculadora")}>Calculadora</Link>
        <Link href="/dashboard/contratos" className={linkClass("/dashboard/contratos")}>Contratos</Link>
        <Link href="/dashboard/historico" className={linkClass("/dashboard/historico")}>Histórico</Link>
        <Link href="/dashboard/premium" className={linkClass("/dashboard/premium")}>Premium</Link>
      </div>
    </nav>
  );
}
