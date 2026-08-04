export function contratoPrestacaoServico(nome: string, servico: string, valor: string) {
  return `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: ${nome}
Serviço: ${servico}
Valor acordado: R$ ${valor}

As partes concordam com os termos acima e firmam este contrato.
  `;
}
