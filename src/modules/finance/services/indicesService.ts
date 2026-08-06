console.log("ARQUIVO CORRETO: indicesService.ts");
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
  const url = `https://servicodados.ibge.gov.br/api/v3/agregados/1736/periodos/${periodo}/variaveis/44?localidades=N1`;

  const response = await fetch(url);
  const json = await response.json();

  try {
    const serie = json?.[0]?.resultados?.[0]?.series?.[0]?.serie;
    if (!serie || !serie[periodo]) return null;
    return Number(serie[periodo]);
  } catch {
    return null;
  }
}

// =========================
// Banco Central (SELIC, CDI, TR)
// =========================
async function buscarBC(codigo: number, ano: string, mes: string, dia?: string) {
  const diaValido = dia ?? "01"; // fallback seguro

  const dataBC = `${diaValido}/${mes}/${ano}`;
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados?formato=json&dataInicial=${dataBC}&dataFinal=${dataBC}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!Array.isArray(json) || json.length === 0) return null;

  return Number(json[0].valor);
}


export async function buscarSELIC(ano: string, mes: string, dia?: string) {
  return buscarBC(11, ano, mes, dia);
}

export async function buscarCDI(ano: string, mes: string, dia?: string) {
  return buscarBC(12, ano, mes, dia);
}

export async function buscarTR(ano: string, mes: string, dia?: string) {
  return buscarBC(226, ano, mes, dia);
}


// =========================
// IGPM (arquivo local)
// =========================
import igpm from "../data/igpm.json";

export async function buscarIGPM(ano: string, mes: string) {
  try {
    const anoData = igpm?.[ano];

    if (!anoData) {
      console.warn(`IGPM: ano ${ano} não encontrado no JSON`);
      return null;
    }

    const valor = anoData?.[mes];

    if (valor === undefined) {
      console.warn(`IGPM: mês ${mes}/${ano} não encontrado no JSON`);
      return null;
    }

    return Number(valor);
  } catch (e) {
    console.error("Erro ao buscar IGPM:", e);
    return null;
  }
}

// =========================
// Tipos
// =========================
export type TipoIndice = "IPCA" | "INPC" | "IGPM" | "SELIC" | "CDI" | "TR";

function gerarListaMeses(dataInicio: Date, dataFim: Date) {
  const meses = [];
  const atual = new Date(dataInicio.getFullYear(), dataInicio.getMonth(), 1);

  while (atual <= dataFim) {
    const ano = String(atual.getFullYear());
    const mes = String(atual.getMonth() + 1).padStart(2, "0");

    meses.push({ ano, mes, data: `${ano}-${mes}` });

    atual.setMonth(atual.getMonth() + 1);
  }

  return meses;
}

// =========================
// Série histórica com diagnóstico
// =========================
export async function obterSerieIndice(
  indice: TipoIndice,
  dataInicio: Date,
  dataFim: Date
) {
  const meses = gerarListaMeses(dataInicio, dataFim);

  const serie: { data: string; valor: number }[] = [];
  const periodosEncontrados: string[] = [];
  const periodosSemDados: string[] = [];

  console.log("teste!");

  for (const m of meses) {
    const dia = m.data.split("-")[2] ?? "01"; // se não tiver dia, usa 01

    let valor: number | null = null;

    if (indice === "IPCA") valor = await buscarIPCA(m.ano, m.mes);
    if (indice === "INPC") valor = await buscarINPC(m.ano, m.mes);
    if (indice === "IGPM") valor = await buscarIGPM(m.ano, m.mes);

    if (indice === "SELIC") valor = await buscarSELIC(m.ano, m.mes, dia);
    if (indice === "CDI") valor = await buscarCDI(m.ano, m.mes, dia);
    if (indice === "TR") valor = await buscarTR(m.ano, m.mes, dia);

    if (valor !== null) {
      serie.push({ data: m.data, valor });
      periodosEncontrados.push(m.data);
    } else {
      periodosSemDados.push(m.data);
    }
  }

  return {
    serie,
    periodosEncontrados,
    periodosSemDados,
    periodosSolicitados: meses.map((m) => m.data),
  };
}

export function obterUltimoAnoIGPM() {
  return Math.max(...Object.keys(igpm).map(Number));
}