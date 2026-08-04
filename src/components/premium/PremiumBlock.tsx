"use client";

import { getPlano } from "@/modules/auth/planService";
import Link from "next/link";

export default function PremiumBlock({ children }) {
  const plano = getPlano();

  if (plano === "premium") return children;

  return (
    <div className="p-6 border rounded bg-yellow-50 text-center">
      <h2 className="text-xl font-bold mb-2">Recurso Premium</h2>
      <p className="mb-4 text-slate-700">
        Este recurso está disponível apenas para usuários Premium.
      </p>

      <Link
        href="/dashboard/premium"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Fazer upgrade
      </Link>
    </div>
  );
}
