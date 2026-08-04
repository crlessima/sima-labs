import Container from "@/components/layout/Container";
import Adsense from "@/components/ads/Adsense";
import { getPlano } from "@/modules/auth/planService";

export default function Page() {
  const plano = getPlano();
  
  return (
    <Container>
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Sima Labs
        </h1>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Uma plataforma modular criada para acelerar o desenvolvimento,
          automação e produtividade. Explore ferramentas inteligentes como
          geração de casos de teste, calculadoras avançadas, contratos simples
          e muito mais.
        </p>

        <a
          href="/dashboard/testcases"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Acessar Plataforma
        </a>
      </section>
	  
	  {
		  //plano === "free" && <Adsense />
	  }
      {
		  //plano !== "premium" && <Adsense />
	  }
	  <Adsense />

      <section className="grid md:grid-cols-3 gap-6 py-10">
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Gerador de Test Cases</h3>
          <p className="text-slate-600">
            Gere casos de teste automaticamente com base em requisitos.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Calculadora Modular</h3>
          <p className="text-slate-600">
            Ferramentas matemáticas e utilitárias para o dia a dia.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Contratos Simples</h3>
          <p className="text-slate-600">
            Gere contratos básicos de forma rápida e padronizada.
          </p>
        </div>
      </section>
	  
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-4">Por que Sima Labs?</h2>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Arquitetura modular e escalável</li>
          <li>Ferramentas inteligentes e integradas</li>
          <li>Interface simples e moderna</li>
          <li>Expansão contínua de novos módulos</li>
        </ul>
      </section>
    </Container>
  );
}
