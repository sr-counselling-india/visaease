"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock Auth
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-primary/5 p-8 text-center border-b border-gray-100">
           <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
             V
           </div>
           <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
           <p className="text-gray-500 text-sm">Secure access for VisaEase staff</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@visaease.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-base"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
            {!loading && <Lock className="ml-2 h-4 w-4" />}
          </Button>
          
          <div className="text-center">
             <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}