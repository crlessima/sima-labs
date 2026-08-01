export function Card({ children, className }: any) {
  return (
    <div className={`border rounded-lg bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: any) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }: any) {
  return <h3 className="font-semibold">{children}</h3>;
}

export function CardContent({ children }: any) {
  return <div className="p-4">{children}</div>;
}
