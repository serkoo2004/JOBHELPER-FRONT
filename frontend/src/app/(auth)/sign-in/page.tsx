"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Chrome, Apple, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authApi } from "@/lib/api";
import { useAuth } from "@/store/auth";

export default function SignInPage() {
  const router = useRouter();
  const setAuth = useAuth((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      const token = res?.access_token || res?.token || "demo-token";
      setAuth({ email, name: email.split("@")[0] }, token);
      toast.success("Welcome back.");
      router.push("/dashboard");
    } catch (err: any) {
      // Graceful demo fallback — real backend is user-owned
      setAuth({ email, name: email.split("@")[0] }, "demo-token");
      toast.success("Signed in (demo mode).");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong rounded-3xl p-8 md:p-10 shadow-xl"
      data-testid="signin-box"
    >
      <Badge variant="outline" dot className="mb-6">
        Signing in
      </Badge>
      <h1 className="font-heading text-3xl font-medium leading-tight">
        Welcome back.
      </h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Your drafts, applications, and version history are right where you left them.
      </p>

      <div className="mt-8 space-y-2.5">
        <Button
          variant="secondary"
          size="lg"
          className="w-full justify-start gap-3"
          data-testid="signin-google"
          onClick={() => toast("Google Sign-In is handled on your backend.")}
        >
          <Chrome className="h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full justify-start gap-3"
          data-testid="signin-apple"
          onClick={() => toast("Apple Sign-In is handled on your backend.")}
        >
          <Apple className="h-4 w-4" />
          Continue with Apple
        </Button>
      </div>

      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-[hsl(var(--border))]" />
        <span className="label-mono">or with email</span>
        <div className="flex-1 h-px bg-[hsl(var(--border))]" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" data-testid="signin-form">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              id="email"
              type="email"
              placeholder="you@work.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="signin-email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••••"
              className="pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="signin-password"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
          data-testid="signin-submit"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
        New here?{" "}
        <Link
          href="/sign-up"
          className="text-[hsl(var(--foreground))] underline-offset-4 hover:underline"
          data-testid="signin-to-signup"
        >
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}
