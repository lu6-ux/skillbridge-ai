"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({ email: data.user.email });
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white flex items-center justify-center">
        <p className="text-blue-200">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Welcome back! 👋</h1>
          <p className="text-blue-200 mt-1">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm">
          Logout
        </button>
      </div>
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature, i) => (
          <a key={i} href={feature.href} className="bg-white/10 hover:bg-white/20 rounded-2xl p-6 transition cursor-pointer">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h2 className="text-lg font-bold mb-1">{feature.title}</h2>
            <p className="text-blue-200 text-sm">{feature.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}