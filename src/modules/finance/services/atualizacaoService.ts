import { buscarIPCA } from "./indicesService";
import { atualizarValor } from "../utils/atualizacao";

export async function atualizarPorIPCA(valor: number, ano: string, mes: string) {
  const indice = await buscarIPCA(ano, mes);

  if (!indice) {
    return {
      sucesso: false,
      mensagem: "Índice não encontrado para o período informado.",
    };
  }

  const atualizado = atualizarValor(valor, indice);

  return {
    sucesso: true,
    indice,
    valorOriginal: valor,
    valorAtualizado: atualizado,
  };
}
