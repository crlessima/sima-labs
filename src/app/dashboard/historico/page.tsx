"use client";

import Container from "@/components/layout/Container";
import { listarContratos, excluirContrato, duplicarContrato } from "@/modules/historico/services/historicoService";
import { gerarPDFContrato } from "@/modules/pdf/pdfService";
import { useEffect, useState } from "react";

export default function HistoricoPage() {
  const [contratos, setContratos] = useState([]);

  function atualizar() {
    setContratos(listarContratos());
  }

  useEffect(() => {
    atualizar();
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
            <h2 className="font-bold text-lg">{c.nome}</h2>
            <p>Serviço: {c.servico}</p>
            <p>Valor original: R$ {c.valorOriginal}</p>
            <p>Índice: {c.indice}</p>
            <p>Atualizado: R$ {c.valorAtualizado.toFixed(2)}</p>
            <p className="text-xs text-slate-500">
              Criado em: {new Date(c.criadoEm).toLocaleString()}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  const pdf = gerarPDFContrato(c.texto);
                  pdf.save(`contrato-${c.nome}.pdf`);
                }}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Baixar PDF
              </button>

              <button
                onClick={() => {
                  alert(c.texto);
                }}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Visualizar
              </button>

              <button
                onClick={() => {
                  duplicarContrato(c.id);
                  atualizar();
                }}
                className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Duplicar
              </button>

              <button
                onClick={() => {
                  excluirContrato(c.id);
                  atualizar();
                }}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
