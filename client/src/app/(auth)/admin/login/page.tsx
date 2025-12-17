"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/config/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await AuthService.loginWithEmail(email, password);
      // Optional: Check custom claims here for admin role
      router.push("/admin/dashboard");
    } catch (err: any) {
        console.error("Login failed", err);
        setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.loginWithGoogle();
      // Optional: Check custom claims or whitelist for admin
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Google login failed", err);
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
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

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-base"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
            {!loading && <Lock className="ml-2 h-4 w-4" />}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
             <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.0003 20.45c4.656 0 8.549-3.238 9.923-7.587h-9.923v-3.725h14.07c.13.684.204 1.401.204 2.14 0 5.393-3.692 10.978-9.066 11.834-5.376.856-10.454-2.316-11.967-7.334C4.12 11.844 5.344 7.647 8.528 4.966c1.87-1.572 4.14-2.19 6.27-1.892l3.078-3.078C15.65.688 13.9.155 12.0003.155c-6.627 0-12 5.373-12 12s5.373 12 12 12z" fill="currentColor" /></svg>
             Admin Login with Google
          </Button>
          
          <div className="text-center">
             <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}