"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, LogIn, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminApiError, adminLogin } from "@/lib/admin/api";

/**
 * Admin login. Posts credentials with `credentials: "include"` so the
 * backend's httpOnly `admin_session` cookie is stored by the browser.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await adminLogin(email, password);
      router.replace("/admin/analytics");
    } catch (err) {
      if (err instanceof AdminApiError) {
        if (err.status === 429) {
          setError("Too many attempts. Please try again in a few minutes.");
        } else {
          // Generic message — never reveal whether email or password failed.
          setError("Invalid credentials");
        }
      } else {
        setError("Could not reach the server. Please try again.");
      }
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to view the analytics dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-border bg-card/50 p-6"
        >
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className="pl-9"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                className="pl-9"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" variant="accent" className="w-full gap-2" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in
              </>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
