"use client";
import { useEffect, useState } from "react";
import { signInWithEmail, signUpWithEmail } from "../lib/auth";
import { getStoredLanguage, setStoredLanguage, t } from "../lib/i18n";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [language, setLanguage] = useState<"en" | "si">("en");

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  const handleEmailAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const result = await signUpWithEmail(email, password, name);
      if (!result.success) {
        setError(result.error ?? "Unable to create account right now");
      } else {
        setSuccess("Account created! You can now sign in.");
        setMode("login");
      }
    } else {
      const result = await signInWithEmail(email, password);
      if (!result.success) {
        setError(result.error ?? "Invalid email or password");
      } else {
        window.location.href = "/dashboard";
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t("loginTitle", language)}</h1>
          <p className="text-slate-300 text-sm mt-2">
            {mode === "login" ? t("loginSubtitle", language) : "Create your free account"}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-slate-400 text-sm">continue</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="flex bg-white/10 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-300"}`}
          >
            {t("loginButton", language)}
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-300"}`}
          >
            {t("createButton", language)}
          </button>
        </div>

        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-white/10 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                placeholder="e.g. Kasun Perera"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">{t("emailLabel", language)}</label>
            <input
              type="email"
              className="w-full border border-white/10 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              placeholder="you@university.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">{t("passwordLabel", language)}</label>
            <input
              type="password"
              className="w-full border border-white/10 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl px-4 py-3">
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-95 disabled:opacity-70 text-white py-3 rounded-xl text-sm font-semibold transition"
          >
            {loading ? "Please wait..." : mode === "login" ? t("loginButton", language) : t("createButton", language)}
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => {
              const next = language === "en" ? "si" : "en";
              setLanguage(next);
              setStoredLanguage(next);
            }}
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300"
          >
            {language === "en" ? "සිංහල" : "English"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

        <p className="text-center text-sm text-slate-300 mt-4">
          <a href="/" className="text-blue-300 hover:text-white">← Back to home</a>
        </p>
      </div>
    </main>
  );
}