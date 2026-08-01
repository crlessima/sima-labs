import ExcelJS from "exceljs";

export async function gerarExcel(json: any) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Casos de Teste");

  sheet.columns = [
    { header: "ID", key: "id", width: 12 },
    { header: "Tipo", key: "tipo", width: 15 },
    { header: "Título", key: "titulo", width: 30 },
    { header: "Descrição", key: "descricao", width: 40 },
    { header: "Pré-condições", key: "pre", width: 30 },
    { header: "Passos de Teste", key: "passos", width: 45 },
    { header: "Resultado Esperado", key: "resultado", width: 40 },
    { header: "Massa de Dados", key: "massa", width: 30 }
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1E293B" }
  };

  json.casos_teste.forEach((caso: any) => {
    const row = sheet.addRow({
      id: caso.id,
      tipo: caso.tipo,
      titulo: caso.titulo,
      descricao: caso.descricao,
      pre: caso.pre_condicoes.join("\n"),
      passos: caso.passos.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n"),
      resultado: caso.resultado_esperado,
      massa: caso.massa_dados.join("\n")
    });

    row.alignment = { vertical: "top", wrapText: true };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
