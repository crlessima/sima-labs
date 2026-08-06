"use client";

import Container from "@/components/layout/Container";
import { useState } from "react";
import { salvarContrato } from "@/modules/historico/services/historicoService";
import { atualizarValorPorIndice } from "@/modules/finance/services/atualizacaoService";
import { v4 as uuid } from "uuid";
import { gerarPDFContrato } from "@/modules/pdf/pdfService";

export default function ContratosPage() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");

  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [indice, setIndice] = useState("IPCA");

  async function gerarContrato() {
    const valorNum = Number(valor);

    const atualizacao = await atualizarValorPorIndice(valorNum, ano, mes, dia, indice);

    if (!atualizacao.sucesso) {
      setResultado("Erro ao buscar índice financeiro.");
      return;
    }

    const texto = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: ${nome}
Serviço: ${servico}

Valor original: R$ ${valor}
Índice utilizado: ${indice}
Percentual aplicado: ${atualizacao.percentual}%
Valor atualizado: R$ ${atualizacao.valorAtualizado.toFixed(2)}

As partes concordam com os termos acima e firmam este contrato.
    `;

    setResultado(texto);

    salvarContrato({
      id: uuid(),
      nome,
      servico,
      valorOriginal: valorNum,
      indice,
      ano,
      mes,
      valorAtualizado: atualizacao.valorAtualizado,
      texto,
      criadoEm: new Date().toISOString(),
    });
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Contratos Simples</h1>

      <div className="flex flex-col gap-4 max-w-lg">

        {/* Nome */}
        <label className="font-semibold">Nome do contratante</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* Serviço */}
        <label className="font-semibold">Serviço prestado</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />

        {/* Valor */}
        <label className="font-semibold">Valor (R$)</label>
        <input
          type="number"
          className="border p-2 rounded"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        {/* Ano */}
        <label className="font-semibold">Ano (ex: 2024)</label>
        <input
          type="number"
          className="border p-2 rounded"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />

        {/* Mês */}
        <label className="font-semibold">Mês (1 a 12)</label>
        <input
          type="number"
          className="border p-2 rounded"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />

        {/* Dia */}
        <label className="font-semibold">Dia (1 a 31)</label>
        <input
          type="number"
          className="border p-2 rounded"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />

        {/* Índice */}
        <label className="font-semibold">Índice financeiro</label>
        <select
          className="border p-2 rounded"
          value={indice}
          onChange={(e) => setIndice(e.target.value)}
        >
          <option value="IPCA">IPCA</option>
          /*<option value="INPC">INPC</option>
          <option value="SELIC">SELIC</option>
          <option value="CDI">CDI</option>
          <option value="TR">TR</option>
          <option value="IGPM">IGPM</option>*/
        </select>

        {/* Botão */}
        <button
          onClick={gerarContrato}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gerar Contrato
        </button>
		
		{resultado && (
		  <button
			onClick={() => {
			  const pdf = gerarPDFContrato(resultado);
			  pdf.save("contrato.pdf");
			}}
			className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
		  >
			Baixar PDF
		  </button>
		)}		

        {/* Resultado */}
        {resultado && (
          <div className="p-4 bg-white border rounded shadow whitespace-pre-wrap">
            <h2 className="font-bold mb-2">Contrato Gerado:</h2>
            {resultado}
          </div>
        )}
      </div>
    </Container>
  );
}
