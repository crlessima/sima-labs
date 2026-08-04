import { jsPDF } from "jspdf";

export function gerarPDFContrato(texto: string) {
  const doc = new jsPDF();

  const linhas = doc.splitTextToSize(texto, 180);

  doc.text(linhas, 15, 15);

  return doc;
}
