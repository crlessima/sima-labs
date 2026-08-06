import { buscarIPCA, buscarINPC, buscarSELIC, buscarCDI, buscarTR, buscarIGPM } from "./indicesService";
import { atualizarValor } from "../utils/atualizacao";

// Função antiga (mantemos para compatibilidade)
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

// Função nova (a que o módulo Contratos usa)
export async function atualizarValorPorIndice(valor: number, ano: string, mes: string, dia?: string, indice: string) {
    let percentual = null;

    switch (indice) {
        case "IPCA":
            percentual = await buscarIPCA(ano, mes);
            break;
        case "INPC":
            percentual = await buscarINPC(ano, mes);
            break;
        case "SELIC":
            percentual = await buscarSELIC(`${dia}/${mes}/${ano}`);
            break;
        case "CDI":
            percentual = await buscarCDI(`${dia}/${mes}/${ano}`);
            break;
        case "TR":
            percentual = await buscarTR(`${dia}/${mes}/${ano}`);
            break;
        case "IGPM":
            percentual = buscarIGPM(ano, mes);
            break;
    }

    if (!percentual) {
        return {
            sucesso: false,
            mensagem: "Índice não encontrado para o período informado."
        };
    }

    const atualizado = atualizarValor(valor, percentual);

    return {
        sucesso: true,
        indice,
        percentual,
        valorOriginal: valor,
        valorAtualizado: atualizado
    };
}
