import { obterSerieIndice, TipoIndice } from "@/modules/finance/services/indicesService";

export type PeriodicidadeJuros = "diario" | "mensal" | "anual";
export type TipoJuros = "simples" | "composto";

export interface ParametrosCalculo {
  valorOriginal: number;
  dataInicio: Date;
  dataFim?: Date;
  indice: TipoIndice;
  aplicarJuros: boolean;
  taxaJuros?: number;
  periodicidade?: PeriodicidadeJuros;
  tipoJuros?: TipoJuros;
}

export interface MemoriaIndice {
  data: string;
  indice: number;
  fatorAcumulado: number;
}

export interface MemoriaJuros {
  tipo: TipoJuros;
  taxa: number;
  periodicidade: PeriodicidadeJuros;
  periodos: number;
  valorJuros: number;
}

export interface ResultadoCalculo {
  valorOriginal: number;
  valorCorrigido: number;
  correcaoMonetaria: number;
  valorJuros: number;
  valorAtualizado: number;
  memoriaIndices: MemoriaIndice[];
  memoriaJuros?: MemoriaJuros;
}

function calcularPeriodos(
  dataInicio: Date,
  dataFim: Date,
  periodicidade: PeriodicidadeJuros
): number {
  const ms = dataFim.getTime() - dataInicio.getTime();
  const dias = ms / (1000 * 60 * 60 * 24);

  switch (periodicidade) {
    case "diario":
      return Math.floor(dias);
    case "mensal":
      return Math.floor(dias / 30);
    case "anual":
      return Math.floor(dias / 365);
    default:
      return 0;
  }
}

async function calcularCorrecaoMonetaria(
  valorOriginal: number,
  indice: TipoIndice,
  dataInicio: Date,
  dataFim: Date
): Promise<{ valorCorrigido: number; memoriaIndices: MemoriaIndice[] }> {

  const serie = await obterSerieIndice(indice, dataInicio, dataFim);

  let fatorAcumulado = 1;
  const memoria: MemoriaIndice[] = [];

  for (const ponto of serie) {
    const fatorMes = 1 + ponto.valor / 100;
    fatorAcumulado *= fatorMes;

    memoria.push({
      data: ponto.data,
      indice: ponto.valor,
      fatorAcumulado,
    });
  }

  const valorCorrigido = valorOriginal * fatorAcumulado;

  return { valorCorrigido, memoriaIndices: memoria };
}



function calcularJuros(
  valorBase: number,
  taxaJuros: number,
  dataInicio: Date,
  dataFim: Date,
  periodicidade: PeriodicidadeJuros,
  tipoJuros: TipoJuros
): MemoriaJuros {
  const i = taxaJuros / 100;
  const n = calcularPeriodos(dataInicio, dataFim, periodicidade);

  let valorJuros = 0;

  if (tipoJuros === "simples") {
    valorJuros = valorBase * i * n;
  } else {
    const montante = valorBase * Math.pow(1 + i, n);
    valorJuros = montante - valorBase;
  }

  return {
    tipo: tipoJuros,
    taxa: taxaJuros,
    periodicidade,
    periodos: n,
    valorJuros,
  };
}

export async function calcularAtualizacao(params: ParametrosCalculo): Promise<ResultadoCalculo> {
  const {
    valorOriginal,
    dataInicio,
    dataFim,
    indice,
    aplicarJuros,
    taxaJuros,
    periodicidade,
    tipoJuros,
  } = params;

  const fim = dataFim ?? new Date();

  const { valorCorrigido, memoriaIndices } = await calcularCorrecaoMonetaria(
    valorOriginal,
    indice,
    dataInicio,
    fim
  );

  const correcaoMonetaria = valorCorrigido - valorOriginal;

  let memoriaJuros: MemoriaJuros | undefined;
  let valorJuros = 0;

  if (aplicarJuros && taxaJuros && periodicidade && tipoJuros) {
    memoriaJuros = calcularJuros(
      valorCorrigido,
      taxaJuros,
      dataInicio,
      fim,
      periodicidade,
      tipoJuros
    );
    valorJuros = memoriaJuros.valorJuros;
  }

  const valorAtualizado = valorCorrigido + valorJuros;

  return {
    valorOriginal,
    valorCorrigido,
    correcaoMonetaria,
    valorJuros,
    valorAtualizado,
    memoriaIndices,
    memoriaJuros,
  };
}

