"use client";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl max-h-[80vh] overflow-auto relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-600 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
