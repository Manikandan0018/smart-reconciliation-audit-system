import { Layers } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-screen bg-white overflow-hidden">
      {/* TOP 20% GRADIENT + BLUR */}
      <div className="absolute top-0 left-0 w-full h-[20vh] auth-gradient blur-[40px] scale-110" />
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-white/10 backdrop-blur-md" />

      {/* Logo */}
      <div className="flex p-5 fixed z-20 w-full bg-white items-center gap-2">
        <Layers className="w-5 h-5 text-slate-600" />
        <h2 className="text-green-700">Data Reconciliation</h2>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm text-center px-4">{children}</div>
      </div>
    </div>
  );
}
