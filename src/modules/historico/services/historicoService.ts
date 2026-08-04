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

export function excluirContrato(id: string) {
  const contratos = listarContratos();
  const filtrados = contratos.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
}

export function duplicarContrato(id: string) {
  const contratos = listarContratos();
  const contrato = contratos.find((c) => c.id === id);
  if (!contrato) return;

  const novo = {
    ...contrato,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };

  contratos.push(novo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contratos));
}
