"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { gerarExcel } from "@/lib/exportExcel";
import { createClient } from "@/lib/supabase/client";
import { AuthButtons } from "@/components/auth-buttons";

export default function Home() {
  const [requisito, setRequisito] = useState("");
  const [tipoTeste, setTipoTeste] = useState("funcional");
  const [nivelDetalhe, setNivelDetalhe] = useState("medio");
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  async function salvarNoHistorico(resultadoGerado: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("testcases_history").insert({
      user_id: user.id,
      requisito,
      tipo_teste: tipoTeste,
      nivel_detalhe: nivelDetalhe,
      json_resultado: resultadoGerado
    });
  }

  async function gerarCasos() {
    if (!requisito.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setResultado(null);

    try {
      const response = await fetch("/api/generate-testcases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requisito,
          tipo_teste: tipoTeste,
          nivel_detalhe: nivelDetalhe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar os casos de teste.");
      }

      setResultado(data);
      await salvarNoHistorico(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  async function exportarExcel() {
    if (!resultado?.casos_teste) return;

    try {
      const buffer = await gerarExcel(resultado);
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `casos_de_teste_${Date.now()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao gerar a planilha Excel.");
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            TestCaseForge Premium
          </h1>
          <p className="text-muted-foreground">
            Gere casos de teste profissionais e exporte diretamente para o
            Excel.
          </p>
        </div>
        <AuthButtons />
      </header>

      <div className="space-y-4">
        <Textarea
          placeholder="Cole aqui o requisito, user story ou regra de negócio..."
          value={requisito}
          onChange={(e) => setRequisito(e.target.value)}
          className="min-h-[160px] text-base"
        />

        <div className="flex flex-wrap gap-4">
          <Select onValueChange={setTipoTeste} defaultValue="funcional">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de teste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="funcional">Funcional</SelectItem>
              <SelectItem value="negativo">Negativo</SelectItem>
              <SelectItem value="integracao">Integração</SelectItem>
              <SelectItem value="regressao">Regressão</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setNivelDetalhe} defaultValue="medio">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Nível de detalhe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixo">Baixo</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="alto">Alto</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={gerarCasos}
            disabled={loading || !requisito.trim()}
            className="ml-auto"
          >
            {loading ? "Gerando Casos..." : "Gerar Casos de Teste"}
          </Button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
          {errorMsg}
        </div>
      )}

      {resultado?.casos_teste && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Casos Gerados ({resultado.casos_teste.length})
            </CardTitle>
            <Button onClick={exportarExcel} variant="default">
              📊 Exportar para Excel (.xlsx)
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {resultado.casos_teste.map((caso: any) => (
              <div
                key={caso.id}
                className="p-3 border rounded-lg bg-card text-card-foreground text-sm space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>
                    {caso.id}: {caso.titulo}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted uppercase">
                    {caso.tipo}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  {caso.descricao}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
