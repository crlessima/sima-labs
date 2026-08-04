import { Contrato } from "../types/Contrato";

const STORAGE_KEY = "sima_historico_contratos";

export function salvarContrato(contrato: Contrato) {
  const atual = listarContratos();
  atual.push(contrato);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atual));
}

export function listarContratos(): Contrato[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function buscarContrato(id: string): Contrato | null {
  const lista = listarContratos();
  return lista.find((c) => c.id === id) || null;
}
