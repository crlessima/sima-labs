import { basePrompt } from "../prompts/basePrompt";
import { cleanInput } from "../utils/cleanInput";

export async function generateTestCases(text: string) {
  const cleaned = cleanInput(text);

  return `
Prompt usado:
${basePrompt}

Requisito recebido:
${cleaned}

(Em breve: geração real via IA)
`;
}
