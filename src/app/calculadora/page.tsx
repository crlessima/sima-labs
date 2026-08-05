"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import {
  calcularAtualizacao,
  TipoIndice1,
  PeriodicidadeJuros,
  TipoJuros,
  ResultadoCalculo,
} from "@/modules/calculadora/services/calculadoraService";
import { obterSerieIndice, TipoIndice } from "@/modules/finance/services/indicesService";

import { getPlano } from "@/modules/auth/planService";
import Adsense from "@/components/ads/Adsense";

export default function CalculadoraPage() {
  const [valor, setValor] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [indice, setIndice] = useState<TipoIndice>("IPCA");
  const [aplicarJuros, setAplicarJuros] = useState(false);
  const [taxaJuros, setTaxaJuros] = useState("");
  const [periodicidade, setPeriodicidade] =
    useState<PeriodicidadeJuros>("mensal");
  const [tipoJuros, setTipoJuros] = useState<TipoJuros>("composto");

  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  
  const plano = getPlano();

  async function handleCalcular() {
    if (!valor || !dataInicio) return;

    const inicio = new Date(dataInicio);
    const fim = dataFim ? new Date(dataFim) : undefined;

    const params = {
      valorOriginal: Number(valor),
      dataInicio: inicio,
      dataFim: fim,
      indice,
      aplicarJuros,
      taxaJuros: aplicarJuros ? Number(taxaJuros) : undefined,
      periodicidade: aplicarJuros ? periodicidade : undefined,
      tipoJuros: aplicarJuros ? tipoJuros : undefined,
    };

    const res = await calcularAtualizacao(params);
    setResultado(res);
  }

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-bold mb-4">
          Calculadora de Juros e Correção Monetária
        </h1>
		
		<div className="my-6">
			<Adsense />
		</div>
		
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow p-6 rounded space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Valor original
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Data início
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Data fim (opcional)
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                Se não preencher, será usada a data de hoje.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Índice de correção
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={indice}
                onChange={(e) => setIndice(e.target.value as TipoIndice)}
              >
                <option value="IPCA">IPCA</option>
                <option value="INPC">INPC</option>
                <option value="IGPM">IGPM</option>
                {/* adiciona outros se tiver no indicesService */}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="aplicarJuros"
                type="checkbox"
                checked={aplicarJuros}
                onChange={(e) => setAplicarJuros(e.target.checked)}
              />
              <label htmlFor="aplicarJuros" className="text-sm">
                Aplicar juros
              </label>
            </div>

            {aplicarJuros && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Taxa de juros (%)
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    value={taxaJuros}
                    onChange={(e) => setTaxaJuros(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Periodicidade
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={periodicidade}
                    onChange={(e) =>
                      setPeriodicidade(
                        e.target.value as PeriodicidadeJuros
                      )
                    }
                  >
                    <option value="diario">Diário</option>
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tipo de juros
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={tipoJuros}
                    onChange={(e) =>
                      setTipoJuros(e.target.value as TipoJuros)
                    }
                  >
                    <option value="simples">Simples</option>
                    <option value="composto">Composto</option>
                  </select>
                </div>
              </>
            )}

            <button
              onClick={handleCalcular}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>
          </div>

          <div className="bg-white shadow p-6 rounded">
            {!resultado && (
              <p className="text-slate-600">
                Preencha os dados e clique em calcular para ver o resultado.
              </p>
            )}

            {resultado && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">
                  Resultado do cálculo
                </h2>

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Valor original:</span>{" "}
                    R$ {resultado.valorOriginal.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Correção monetária:
                    </span>{" "}
                    R$ {resultado.correcaoMonetaria.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Juros:</span>{" "}
                    R$ {resultado.valorJuros.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Valor atualizado:
                    </span>{" "}
                    R$ {resultado.valorAtualizado.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Memória de cálculo — índices
                  </h3>
                  <div className="max-h-64 overflow-auto border rounded p-2 text-xs">
                    {resultado.memoriaIndices.map((m) => (
                      <div
                        key={m.data}
                        className="flex justify-between border-b py-1"
                      >
                        <span>{m.data}</span>
                        <span>{m.indice.toFixed(4)}%</span>
                        <span>fator: {m.fatorAcumulado.toFixed(6)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {resultado.memoriaJuros && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Memória de cálculo — juros
                    </h3>
                    <div className="text-xs space-y-1">
                      <p>
                        Tipo: {resultado.memoriaJuros.tipo} | Taxa:{" "}
                        {resultado.memoriaJuros.taxa}% | Periodicidade:{" "}
                        {resultado.memoriaJuros.periodicidade}
                      </p>
                      <p>Períodos: {resultado.memoriaJuros.periodos}</p>
                      <p>
                        Valor dos juros: R${" "}
                        {resultado.memoriaJuros.valorJuros.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
