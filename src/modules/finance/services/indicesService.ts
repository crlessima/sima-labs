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
