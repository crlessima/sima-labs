import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requisito, tipo_teste, nivel_detalhe } = body;

    if (!requisito) {
      return NextResponse.json(
        { error: "O requisito é obrigatório." },
        { status: 400 }
      );
    }

    const systemPrompt = `
Você é um gerador profissional de casos de teste com 17 anos de experiência em análise de sistemas e testes.
Sua missão é transformar qualquer requisito em um conjunto estruturado de casos de teste.

FORMATO OBRIGATÓRIO DE SAÍDA (Apenas JSON puro):
{
  "requisito": "",
  "tipo_teste": "",
  "nivel_detalhe": "",
  "casos_teste": [
    {
      "id": "TC-001",
      "titulo": "",
      "descricao": "",
      "pre_condicoes": [],
      "passos": [],
      "resultado_esperado": "",
      "massa_dados": [],
      "tipo": "funcional | negativo | borda | integracao"
    }
  ],
  "criterios_aceitacao_refinados": [],
  "cenarios_alternativos": []
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: JSON.stringify({ requisito, tipo_teste, nivel_detalhe })
          }
        ]
      })
    });

    const data = await response.json();
    let rawContent = data.choices[0].message.content;

    rawContent = rawContent
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const jsonOutput = JSON.parse(rawContent);

    return NextResponse.json(jsonOutput);
  } catch (error) {
    console.error("Erro na geração dos casos de teste:", error);
    return NextResponse.json(
      { error: "Falha ao processar os casos de teste." },
      { status: 500 }
    );
  }
}
