export const metadata = {
  title: "Sima Labs",
  description: "Laboratório de idéias com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}