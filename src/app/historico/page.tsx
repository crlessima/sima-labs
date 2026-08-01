"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { gerarExcel } from "@/lib/exportExcel";

export default function HistoricoPage() {
  const supabase = createClient();
  const [testes, setTestes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("testcases_history")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) setTestes(data);
      }
      setLoading(false);
    }

    carregar();
  }, []);

  async function reExportarExcel(jsonResultado: any, id: string) {
    try {
      const buffer = await gerarExcel(jsonResultado);
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `casos_de_teste_${id.slice(0, 6)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao re-exportar planilha.");
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Carregando histórico...
      </p>
    );

  if (!user) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        Faça login para visualizar seu histórico de casos de teste.
      </p>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Meu Histórico</h2>

      {testes.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhum caso de teste salvo ainda.
        </p>
      ) : (
        <div className="grid gap-4">
          {testes.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold truncate max-w-md">
                  {item.requisito}
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    reExportarExcel(item.json_resultado, item.id)
                  }
                >
                  📊 Baixar .xlsx
                </Button>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <div className="flex gap-4">
                  <span>
                    <strong>Tipo:</strong> {item.tipo_teste}
                  </span>
                  <span>
                    <strong>Nível:</strong> {item.nivel_detalhe}
                  </span>
                  <span>
                    <strong>Data:</strong>{" "}
                    {new Date(item.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
