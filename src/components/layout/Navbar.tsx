"use client";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Sima Labs</h1>

      <div className="flex gap-6 text-sm">
        <a href="/" className="hover:text-blue-600">Home</a>
        <a href="/dashboard/testcases" className="hover:text-blue-600">TestCases</a>
        <a href="/dashboard/calculadora" className="hover:text-blue-600">Calculadora</a>
        <a href="/dashboard/contratos" className="hover:text-blue-600">Contratos</a>
        <a href="/dashboard/premium" className="hover:text-blue-600">Premium</a>
      </div>
    </nav>
  );
}
