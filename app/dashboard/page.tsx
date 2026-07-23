"use client";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../lib/auth";
import { sriLankanJobListings } from "../lib/careerData";
import { leaderboardData } from "../lib/leaderboard";
import { getStoredLanguage, setStoredLanguage, t } from "../lib/i18n";

interface User {
  email?: string | null;
}

const features = [
  { title: "Career Roadmap", desc: "Get your personalized career plan", icon: "🗺️", href: "/roadmap" },
  { title: "Skill Gap Analysis", desc: "Find skills you need to learn", icon: "🔍", href: "/skillgap" },
  { title: "Career Readiness Score", desc: "Know how ready you are", icon: "🏆", href: "/readiness" },
  { title: "Portfolio Builder", desc: "Build your professional portfolio", icon: "💼", href: "/portfolio" },
  { title: "Progress Tracker", desc: "Track your career journey", icon: "📈", href: "/progress" },
  { title: "Internship Readiness", desc: "Check if you are ready to apply", icon: "🎓", href: "/internship" },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs] = useState(sriLankanJobListings.slice(0, 3));
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [reminder, setReminder] = useState<{subject:string; message:string} | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({ email: currentUser.email });
    }
    const savedLanguage = getStoredLanguage();
    setLanguage(savedLanguage);

    const storedProgress = window.localStorage.getItem("skillbridge-progress-checklist");
    if (storedProgress) {
      try {
        const parsed = JSON.parse(storedProgress) as Record<string, boolean>;
        const completed = Object.values(parsed).filter(Boolean).length;
        const total = 20;
        setProgressPercent(Math.round((completed / total) * 100));
      } catch {
        setProgressPercent(0);
      }
    }

    fetch("/api/weekly-reminder")
      .then((res) => res.json())
      .then((data) => setReminder(data))
      .catch(() => setReminder(null));
  }, []);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  const toggleLanguage = (next: "en" | "si") => {
    setLanguage(next);
    setStoredLanguage(next);
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white flex items-center justify-center">
        <p className="text-blue-200">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(135deg,_#07111f_0%,_#0b1729_45%,_#111c33_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute bottom-[-2rem] left-[-2rem] h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-200">
                  ✨ AI-powered career growth
                </div>
                <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {t("dashboardTitle", language)} 👋
                </h1>
                <p className="mt-3 text-base text-slate-300 sm:text-lg">
                  Keep building your future with guided roadmaps, skill insights, and opportunities tailored for Sri Lankan students.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/roadmap" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
                    Start roadmap
                  </a>
                  <a href="/portfolio" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/20">
                    Build portfolio
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg shadow-slate-950/20 backdrop-blur">
                <p className="text-sm text-slate-300">Signed in as</p>
                <p className="mt-1 font-semibold text-white">{user.email}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => toggleLanguage(language === "en" ? "si" : "en")} className="rounded-full border border-white/15 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800">
                    {language === "en" ? "සිං" : "EN"}
                  </button>
                  <button onClick={handleLogout} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">
                    Logout
                  </button>
                  <a href="/profile" className="text-sm font-semibold text-sky-300 transition hover:text-white">
                    My Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[1.75rem] border border-sky-400/20 bg-gradient-to-br from-sky-500/20 via-slate-900/70 to-indigo-900/70 p-6 shadow-lg shadow-slate-950/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sky-200">Your launchpad</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Ready to level up this week?</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-100">
                Student mode
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-300">Progress</p>
                <p className="mt-1 text-2xl font-bold text-white">{progressPercent}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-300">Open opportunities</p>
                <p className="mt-1 text-2xl font-bold text-white">{jobs.length + 2}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-300">Weekly reminder</p>
                <p className="mt-1 text-sm font-semibold text-white">{reminder ? "Active" : "Fresh"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-slate-950/20">
            <p className="text-sm font-semibold text-sky-200">This week’s focus</p>
            <p className="mt-2 text-xl font-semibold text-white">Build one project and update your portfolio.</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Small, consistent actions create the biggest career momentum over time.
            </p>
            <div className="mt-5 h-2 rounded-full bg-slate-900/60">
              <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
            </div>
            <p className="mt-2 text-sm text-slate-300">75% of your weekly goals are on track.</p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => (
            <a
              key={i}
              href={feature.href}
              className="group rounded-[1.5rem] border border-white/10 bg-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl">{feature.icon}</div>
                <div className="rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-300 transition group-hover:text-white">
                  Open
                </div>
              </div>
              <h2 className="mt-4 text-lg font-bold text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{feature.desc}</p>
            </a>
          ))}
        </section>

        {reminder && (
          <section className="rounded-[1.5rem] border border-sky-400/20 bg-sky-500/10 p-5 shadow-lg shadow-slate-950/10">
            <p className="text-sm font-semibold text-sky-200">{t("reminderTitle", language)}</p>
            <p className="mt-1 text-sm leading-6 text-slate-100">{reminder.message}</p>
          </section>
        )}

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-sky-300">{t("leaderboardTitle", language)}</h2>
                <p className="text-sm text-slate-300">{t("leaderboardSubtitle", language)}</p>
              </div>
            </div>
            <div className="space-y-3">
              {leaderboardData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">#{index + 1} {entry.name}</p>
                    <p className="text-sm text-slate-300">{entry.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sky-300">{entry.score}/100</p>
                    <p className="text-xs text-slate-300">{entry.badge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-sky-300">{t("jobsTitle", language)}</h2>
                <p className="text-sm text-slate-300">{t("jobsSubtitle", language)}</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">Local shortlist</span>
            </div>
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{job.title}</p>
                      <p className="text-sm text-slate-300">{job.company} • {job.location}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200">{job.matchScore}% match</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}