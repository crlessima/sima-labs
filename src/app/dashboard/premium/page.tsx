"use client";

import Container from "@/components/layout/Container";
import { getPlano, setPlano } from "@/modules/auth/planService";

export default function PremiumPage() {
  const plano = getPlano();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Plano Premium</h1>

      {plano === "premium" ? (
        <div className="p-6 bg-green-50 border rounded">
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Você já é Premium!
          </h2>
          <p className="text-slate-700">
            Aproveite todos os recursos avançados do Sima Labs.
          </p>
        </div>
      ) : (
        <div className="p-6 bg-white border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Upgrade para Premium</h2>

          <ul className="list-disc ml-6 mb-4 text-slate-700">
            <li>Contratos ilimitados</li>
            <li>Exportação avançada</li>
            <li>Modelos profissionais</li>
            <li>Histórico completo</li>
            <li>Relatórios financeiros</li>
            <li>Suporte prioritário</li>
          </ul>

          <button
            onClick={() => {
              setPlano("premium");
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ativar Premium
          </button>
        </div>
      )}
    </Container>
  );
}
