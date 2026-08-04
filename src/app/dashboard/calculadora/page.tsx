"use client";

import Container from "@/components/layout/Container";
import { useState } from "react";
import { calculadoraService } from "@/modules/calculadora/services/calculadoraService";

export default function CalculadoraPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [resultado, setResultado] = useState("");

  function somar() {
	const r = calculadoraService.somar(Number(a), Number(b));
	setResultado(String(r));
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Calculadora Modular</h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="number"
          placeholder="Valor A"
          className="border p-2 rounded"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor B"
          className="border p-2 rounded"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />

        <button
          onClick={somar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Somar
        </button>

        {resultado && (
          <div className="p-4 bg-white border rounded shadow">
            <h2 className="font-bold mb-2">Resultado:</h2>
            <p>{resultado}</p>
          </div>
        )}
      </div>
    </Container>
  );
}
