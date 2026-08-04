"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/testcases", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });

    const data = await response.json();
    setResult(data.output);
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Gerador de Test Cases</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="Descreva o requisito aqui..."
          className="border rounded p-3 h-40"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gerar Test Cases
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-white border rounded shadow">
          <h2 className="font-bold mb-2">Resultado:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </Container>
  );
}
