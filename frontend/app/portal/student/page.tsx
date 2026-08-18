"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/auth";

export default function StudentPortalPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const result = await login(email, password);

      console.log("Login Response:", result);
      
      localStorage.setItem("token", result.access_token);
      
      alert("Token Saved!");
      
      console.log("Stored Token:", localStorage.getItem("token"));
      
      router.push("/dashboard");
    } catch (err: any) {
      console.log("Login Error:", err);
    
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
    
        setError(err.response.data.detail || "Login failed");
      } else {
        setError(err.message);
      }
    }finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Student Portal"
        title="Sign in to continue your courses"
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-md rounded-2xl glass p-8 text-center">

          <GraduationCap className="mx-auto text-cyan" size={32} />

          <div className="mt-6 space-y-3">

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Student Email"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
        
              className="w-full justify-center"
              onClick={handleLogin}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

          </div>

        </div>
      </section>
    </>
  );
}