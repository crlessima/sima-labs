"use client";

import Container from "@/components/layout/Container";
import { useState } from "react";
import { contratosService } from "@/modules/contratos/services/contratosService";
import { atualizarPorIPCA } from "@/modules/finance/services/atualizacaoService";

export default function ContratosPage() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  
  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");
  const [valorAtualizado, setValorAtualizado] = useState("");  

  async function gerarContrato() {
    const valorNum = Number(valor);

    const atualizacao = await atualizarPorIPCA(valorNum, ano, mes);

    if (!atualizacao.sucesso) {
      setResultado("Erro ao buscar índice financeiro.");
      return;
    }

    const texto = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: ${nome}
Serviço: ${servico}
Valor original: R$ ${valor}
Índice IPCA do período: ${atualizacao.indice}%
Valor atualizado: R$ ${atualizacao.valorAtualizado.toFixed(2)}

As partes concordam com os termos acima e firmam este contrato.
  `;

    setResultado(texto);
  }



  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Contratos Simples</h1>

      <div className="flex flex-col gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Nome do contratante"
          className="border p-2 rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Serviço prestado"
          className="border p-2 rounded"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor (R$)"
          className="border p-2 rounded"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
		
		<input
		  type="number"
		  placeholder="Ano (ex: 2024)"
		  className="border p-2 rounded"
		  value={ano}
		  onChange={(e) => setAno(e.target.value)}
		/>

		<input
		  type="number"
		  placeholder="Mês (1 a 12)"
		  className="border p-2 rounded"
		  value={mes}
		  onChange={(e) => setMes(e.target.value)}
		/>
		

        <button
          onClick={gerarContrato}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gerar Contrato
        </button>

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
