// =========================
// IPCA (IBGE)
// =========================
export async function buscarIPCA(ano: string, mes: string) {
  const periodo = `${ano}${mes.padStart(2, "0")}`;

  const url = `https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/${periodo}/variaveis/63?localidades=N1`;

  const response = await fetch(url);
  const json = await response.json();

  try {
    const valor = json[0].resultados[0].series[0].serie[periodo];
    return Number(valor);
  } catch {
    return null;
  }
}

// =========================
// INPC (IBGE)
// =========================
export async function buscarINPC(ano: string, mes: string) {
  const periodo = `${ano}${mes.padStart(2, "0")}`;

  const url = `https://servicodados.ibge.gov.br/api/v3/agregados/1735/periodos/${periodo}/variaveis/44?localidades=N1`;

  const response = await fetch(url);
  const json = await response.json();

  try {
    const valor = json[0].resultados[0].series[0].serie[periodo];
    return Number(valor);
  } catch {
    return null;
  }
}

// =========================
// Função auxiliar para APIs do Banco Central
// =========================
async function buscarBC(codigo: number, data: string) {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados?formato=json`;

  const response = await fetch(url);
  const json = await response.json();

  // Se não for array, retorna null
  if (!Array.isArray(json)) return null;

  const item = json.find((i: any) => i.data === data);

  return item ? Number(item.valor) : null;
}

// =========================
// SELIC (código 11)
// =========================
export async function buscarSELIC(data: string) {
  return buscarBC(11, data);
}

// =========================
// CDI (código 12)
// =========================
export async function buscarCDI(data: string) {
  return buscarBC(12, data);
}

// =========================
// TR (código 226)
// =========================
export async function buscarTR(data: string) {
  return buscarBC(226, data);
}
