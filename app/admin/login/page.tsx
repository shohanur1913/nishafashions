"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleLogin } from "@/actions/admin";
import { 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  Mail, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Loader2 
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);

  // Restore remembered email on client mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("nfw_admin_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("password", password);

      const res = await handleLogin(formData);
      if (res.success) {
        if (rememberMe) {
          try {
            localStorage.setItem("nfw_admin_email", email.trim());
          } catch {}
        } else {
          try {
            localStorage.removeItem("nfw_admin_email");
          } catch {}
        }

        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Invalid email or password. Please verify your credentials.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-50 px-4 py-8 sm:py-12 relative overflow-hidden text-zinc-900 selection:bg-primary selection:text-primary-foreground">
      {/* Subtle ambient light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-zinc-200/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Return to Website */}
      <div className="relative z-10 w-full max-w-md mx-auto flex items-center justify-between mb-4 sm:mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-white text-zinc-600 border border-zinc-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Secure Portal
        </span>
      </div>

      {/* Main Login Card - Light Mode matching Admin Panel Radius */}
      <div className="w-full max-w-md mx-auto bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-zinc-200/50 relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center mx-auto">
            <img
              src="/images/logo.jpg"
              alt="Nisha Fashions Wear"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
              Administrative <span className="text-primary">Portal</span>
            </h1>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs leading-relaxed animate-in fade-in duration-200">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <div className="flex-1">
              <p className="font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label 
              htmlFor="admin-email"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck="false"
                placeholder="name@nishafashions.com"
                className="w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pl-10"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="admin-password"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-[11px] text-zinc-500 hover:text-primary transition-colors cursor-pointer"
              >
                Need help?
              </button>
            </div>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pl-10 pr-10"
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 hover:text-zinc-800 transition-colors select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-zinc-300 text-primary accent-primary focus:ring-primary/40 cursor-pointer"
              />
              <span>Remember email on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Security Info */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-[11px] font-medium">256-Bit SSL Encrypted Session</span>
        </div>
      </div>

      {/* Forgot Password / Need Help Dialog */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-zinc-900">
                Password Recovery
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                For security reasons, password resets are verified manually. Please contact developer Niloy at{" "}
                <a 
                  href="mailto:hello@niloy.io?subject=Nisha%20Fashions%20CMS%20Password%20Reset"
                  className="text-primary font-medium"
                >
                  hello@niloy.io
                </a>
                {" "}or visit{" "}
                <a 
                  href="https://niloy.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary font-medium"
                >
                  niloy.io
                </a>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForgotModal(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Legal Footer */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center text-xs text-zinc-500 mt-4 sm:mt-6">
        <p className="flex items-center justify-center flex-wrap gap-1">
          <span>Developed by</span>
          <a 
            href="https://niloy.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium text-zinc-700 hover:text-primary transition-colors"
          >
            Niloy
          </a>
          <span className="text-zinc-300">•</span>
          <span>Powered by</span>
          <a 
            href="https://bangladeshhost.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium text-zinc-700 hover:text-primary transition-colors"
          >
            Bangladesh Host
          </a>
        </p>
      </div>
    </div>
  );
}
