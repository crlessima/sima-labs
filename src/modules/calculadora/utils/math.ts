export function somar(a: number, b: number) {
  return a + b;
}

export function subtrair(a: number, b: number) {
  return a - b;
}

export function multiplicar(a: number, b: number) {
  return a * b;
}

export function dividir(a: number, b: number) {
  if (b === 0) return NaN;
  return a / b;
}
