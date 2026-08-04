export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sima Labs Dashboard</h1>
      {children}
    </div>
  );
}
