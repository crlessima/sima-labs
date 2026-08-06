import fs from "fs";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";

async function atualizarIGPM() {
  const url = "https://portal.fgv.br/indices/igp-m"; // página oficial

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // encontra o último valor publicado
  const ultimoValor = $(".field--name-field-indice-valor")
    .first()
    .text()
    .replace(",", ".")
    .trim();

  const ultimoMes = $(".field--name-field-indice-mes")
    .first()
    .text()
    .trim();

  const ultimoAno = $(".field--name-field-indice-ano")
    .first()
    .text()
    .trim();

  const arquivo = path.join(
    process.cwd(),
    "src/modules/finance/data/igpm.json"
  );

  const json = JSON.parse(fs.readFileSync(arquivo, "utf8"));

  if (!json[ultimoAno]) json[ultimoAno] = {};

  json[ultimoAno][ultimoMes.padStart(2, "0")] = Number(ultimoValor);

  fs.writeFileSync(arquivo, JSON.stringify(json, null, 2));

  console.log(`IGPM atualizado: ${ultimoMes}/${ultimoAno} = ${ultimoValor}`);
}

atualizarIGPM();
