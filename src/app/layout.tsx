export const metadata = {
  title: "TestCaseForge Premium",
  description: "Geração automática de casos de teste com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}