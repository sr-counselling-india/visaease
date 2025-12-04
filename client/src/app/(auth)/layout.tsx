import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-xl bg-white shadow-sm p-8">
        {children}
      </div>
    </div>
  );
}