"use client";

import Container from "@/components/layout/Container";
import { listarContratos } from "@/modules/historico/services/historicoService";
import { useEffect, useState } from "react";
import { atualizarValorPorIndice } from "@/modules/finance/services/atualizacaoService";

export default function HistoricoPage() {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    setContratos(listarContratos());
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Histórico de Contratos</h1>

      {contratos.length === 0 && (
        <p className="text-slate-600">Nenhum contrato gerado ainda.</p>
      )}

      <div className="flex flex-col gap-4">
        {contratos.map((c) => (
          <div key={c.id} className="p-4 bg-white border rounded shadow">
            <h2 className="font-bold">{c.nome}</h2>
            <p>Serviço: {c.servico}</p>
            <p>Valor original: R$ {c.valorOriginal}</p>
            <p>Índice: {c.indice}</p>
            <p>Atualizado: R$ {c.valorAtualizado.toFixed(2)}</p>
            <p className="text-xs text-slate-500">
              Criado em: {new Date(c.criadoEm).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
