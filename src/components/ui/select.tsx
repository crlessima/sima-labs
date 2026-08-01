export function Select({ children, ...props }: any) {
  return (
    <select
      className="border rounded-md p-2"
      {...props}
    >
      {children}
    </select>
  );
}
