"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function DashboardHome() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link href="/dashboard/testcases" className="p-6 bg-white border rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg">TestCases</h2>
          <p className="text-slate-600">Gerador automático de casos de teste.</p>
        </Link>

        <Link href="/dashboard/calculadora" className="p-6 bg-white border rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg">Calculadora</h2>
          <p className="text-slate-600">Ferramentas matemáticas e financeiras.</p>
        </Link>

        <Link href="/dashboard/contratos" className="p-6 bg-white border rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg">Contratos</h2>
          <p className="text-slate-600">Gerador de contratos com atualização monetária.</p>
        </Link>

        <Link href="/dashboard/historico" className="p-6 bg-white border rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg">Histórico</h2>
          <p className="text-slate-600">Todos os contratos gerados.</p>
        </Link>

        <Link href="/dashboard/premium" className="p-6 bg-white border rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg">Premium</h2>
          <p className="text-slate-600">Recursos avançados e exclusivos.</p>
        </Link>

      </div>
    </Container>
  );
}
