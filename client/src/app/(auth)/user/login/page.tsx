"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/config/firebaseConfig";
import { Button } from "@/components/ui/button"; // Assuming Button component exists, or use standard button if not sure. Previous file didn't use it.
import { api } from "@/lib/api";
// The previous file used standard HTML button. I will stick to that to avoid imports if not sure, OR use the one from Admin page if available.
// Admin page used import { Button } from "@/components/ui/button"; I'll check if it exists.
// Step 42 showed Admin page using it. So it exists.

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitUserLoginToServer = async (firebaseId: string) => {
    try {
      const response = await api.post("/user/signup", { firebaseId });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const firebaseId = await AuthService.loginWithEmail(email, password);
      const response = await submitUserLoginToServer(firebaseId);
      console.log(response);

      router.back();
    } catch (err: any) {
      console.error(err);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const firebaseId = await AuthService.loginWithGoogle();
      console.log(firebaseId);
      const response = await submitUserLoginToServer(firebaseId);
      console.log(response);
      router.back();
    } catch (err: any) {
      console.error(err);
      setError("Failed to log in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Log in to manage your visa applications.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-zinc-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="mt-4 w-full flex items-center justify-center rounded-md border border-zinc-300 bg-white py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
        >
          <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M12.0003 20.45c4.656 0 8.549-3.238 9.923-7.587h-9.923v-3.725h14.07c.13.684.204 1.401.204 2.14 0 5.393-3.692 10.978-9.066 11.834-5.376.856-10.454-2.316-11.967-7.334C4.12 11.844 5.344 7.647 8.528 4.966c1.87-1.572 4.14-2.19 6.27-1.892l3.078-3.078C15.65.688 13.9.155 12.0003.155c-6.627 0-12 5.373-12 12s5.373 12 12 12z"
              fill="currentColor"
            />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}
