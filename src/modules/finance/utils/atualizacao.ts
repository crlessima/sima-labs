export function atualizarValor(valorOriginal: number, indicePercentual: number) {
  const fator = 1 + indicePercentual / 100;
  return valorOriginal * fator;
}
