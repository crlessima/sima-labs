"use client";

import Container from "@/components/layout/Container";
import {
  listarContratos,
  excluirContrato,
  duplicarContrato,
} from "@/modules/historico/services/historicoService";
import { gerarPDFContrato } from "@/modules/pdf/pdfService";
import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";

export default function HistoricoPage() {
  const [contratos, setContratos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroIndice, setFiltroIndice] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [ordenacao, setOrdenacao] = useState("data_desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTexto, setModalTexto] = useState("");

  function atualizar() {
    setContratos(listarContratos());
  }

  useEffect(() => {
    atualizar();
  }, []);

  const filtrados = contratos
    // Busca por nome
    .filter((c) =>
      busca ? c.nome.toLowerCase().includes(busca.toLowerCase()) : true
    )
    // Filtro por índice
    .filter((c) => (filtroIndice ? c.indice === filtroIndice : true))
    // Filtro por ano
    .filter((c) => (filtroAno ? c.ano === filtroAno : true))
    // Filtro por serviço
    .filter((c) => (filtroServico ? c.servico === filtroServico : true))
    // Filtro por valor mínimo
    .filter((c) => (valorMin ? c.valorOriginal >= Number(valorMin) : true))
    // Filtro por valor máximo
    .filter((c) => (valorMax ? c.valorOriginal <= Number(valorMax) : true))
    // Ordenação avançada
    .sort((a, b) => {
      switch (ordenacao) {
        case "data_desc":
		  return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
        case "data_asc":
		  return new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime();
        case "nome_asc":
          return a.nome.localeCompare(b.nome);
        case "nome_desc":
          return b.nome.localeCompare(a.nome);
        case "valor_asc":
          return a.valorOriginal - b.valorOriginal;
        case "valor_desc":
          return b.valorOriginal - a.valorOriginal;
        case "indice_asc":
          return a.indice.localeCompare(b.indice);
        case "indice_desc":
          return b.indice.localeCompare(a.indice);
        default:
          return 0;
      }
    });

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Histórico de Contratos</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border px-3 py-2 rounded w-60"
        />

        <select
          value={filtroIndice}
          onChange={(e) => setFiltroIndice(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Todos os índices</option>
          <option value="IPCA">IPCA</option>
          <option value="INPC">INPC</option>
          <option value="SELIC">SELIC</option>
          <option value="CDI">CDI</option>
          <option value="TR">TR</option>
          <option value="IGPM">IGPM</option>
        </select>

        <input
          type="number"
          placeholder="Ano"
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
          className="border px-3 py-2 rounded w-28"
        />

        <select
          value={filtroServico}
          onChange={(e) => setFiltroServico(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Todos os serviços</option>
          <option value="Site">Site</option>
          <option value="Consultoria">Consultoria</option>
          <option value="Suporte">Suporte</option>
        </select>

        <input
          type="number"
          placeholder="Valor mínimo"
          value={valorMin}
          onChange={(e) => setValorMin(e.target.value)}
          className="border px-3 py-2 rounded w-32"
        />

        <input
          type="number"
          placeholder="Valor máximo"
          value={valorMax}
          onChange={(e) => setValorMax(e.target.value)}
          className="border px-3 py-2 rounded w-32"
        />

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="data_desc">Data (mais novo primeiro)</option>
          <option value="data_asc">Data (mais antigo primeiro)</option>
          <option value="nome_asc">Nome (A → Z)</option>
          <option value="nome_desc">Nome (Z → A)</option>
          <option value="valor_asc">Valor (menor → maior)</option>
          <option value="valor_desc">Valor (maior → menor)</option>
          <option value="indice_asc">Índice (A → Z)</option>
          <option value="indice_desc">Índice (Z → A)</option>
        </select>
      </div>

      {filtrados.length === 0 && (
        <p className="text-slate-600">Nenhum contrato encontrado.</p>
      )}

      <div className="flex flex-col gap-4">
        {filtrados.map((c) => (
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
                  setModalTexto(c.texto);
                  setModalOpen(true);
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

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Contrato</h2>

        <pre className="whitespace-pre-wrap text-sm mb-4">
          {modalTexto}
        </pre>

        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(modalTexto)}
            className="px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
          >
            Copiar texto
          </button>

          <button
            onClick={() => {
              const pdf = gerarPDFContrato(modalTexto);
              pdf.save("contrato.pdf");
            }}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Baixar PDF
          </button>
        </div>
      </Modal>
    </Container>
  );
}
