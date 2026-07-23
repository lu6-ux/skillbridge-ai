"use client";
import { useState } from "react";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [cvResult, setCvResult] = useState("");
  const [cvLoading, setCvLoading] = useState(false);

  const analyzeResume = async () => {
    if (!cvText.trim()) return;

    setCvLoading(true);
    setCvResult("");

    try {
      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: cvText.trim() }),
      });

      const data = await res.json();
      setCvResult(data.analysis || "We could not generate a full analysis right now. Please try again shortly.");
    } catch {
      setCvResult("The analysis service is temporarily unavailable. Please try again shortly.");
    } finally {
      setCvLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SkillBridge  <span className="text-blue-600">AI  Sri Lanka</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="/roadmap" className="text-sm text-gray-600 hover:text-blue-600 transition">Roadmap</a>
          <a href="/skillgap" className="text-sm text-gray-600 hover:text-blue-600 transition">Skill Gap</a>
          <a href="/readiness" className="text-sm text-gray-600 hover:text-blue-600 transition">Readiness</a>
          <a href="/portfolio" className="text-sm text-gray-600 hover:text-blue-600 transition">Portfolio</a>
          <a href="/progress" className="text-sm text-gray-600 hover:text-blue-600 transition">Progress</a>
          <a href="/interview" className="text-sm text-gray-600 hover:text-blue-600 transition">Interview</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition font-medium">Sign in</a>
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          AI Career Operating System for Sri Lankan students
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          The AI career coach
          <span className="text-blue-600"> built for your first job</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
          ChatGPT answers questions. SkillBridge AI helps you plan, measure, and improve your path from university to employment with Sri Lanka-specific guidance.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#resume-analysis" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition shadow-sm">
            Try Resume Analysis Free →
          </a>
          <a href="/readiness" className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-8 py-3 rounded-lg text-base font-medium transition">
            See Career Readiness Score
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required · Free to get started</p>
      </section>

      {/* Guest Resume Analysis */}
      <section id="resume-analysis" className="max-w-6xl mx-auto px-8 py-8">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-700">
                Try Resume Analysis Free
              </div>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Upload your resume text and get instant feedback
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                No account needed. Get a quick AI review of your CV strengths, weaknesses, and next steps.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                <li>• Basic AI analysis in seconds</li>
                <li>• Career recommendations and improvement tips</li>
                <li>• Create a free account later to save your report and unlock more tools</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700">Paste your resume text</label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                rows={10}
                className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                placeholder="Paste your CV summary, experience, skills, education, and projects..."
              />
              <button
                onClick={analyzeResume}
                disabled={cvLoading || !cvText.trim()}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {cvLoading ? "Analyzing..." : "Analyze My Resume"}
              </button>
            </div>
          </div>

          {cvResult && (
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Your Resume Analysis</h3>
              <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">{cvResult}</pre>
              <p className="mt-4 text-sm font-medium text-blue-700">
                Create a free account to save this report, track your progress, and unlock more AI features.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "93%", label: "Students would use SkillBridge AI" },
            { value: "6+", label: "AI-powered career features" },
            { value: "8", label: "Universities represented" },
            { value: "Free", label: "To get started" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why SkillBridge AI is different
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We are not trying to be a generic chatbot. We are building an AI career operating system for Sri Lankan students and fresh graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "AI Career Readiness Score", desc: "Get a clear 0–100 score based on your resume, skills, portfolio, and internship readiness.", icon: "🏆", href: "/readiness", tag: "Core" },
            { title: "Personalized Roadmaps", desc: "Follow step-by-step plans for roles like AI Engineer, Software Engineer, Data Analyst, and UI/UX Designer.", icon: "🗺️", href: "/roadmap", tag: "Popular" },
            { title: "Internship Readiness Checker", desc: "Paste a job description and see how ready you are to apply, with strengths and gaps highlighted.", icon: "🎓", href: "/internship", tag: "New" },
            { title: "Skill Gap Detector", desc: "Compare your current skills with the requirements for your target role and see what to learn next.", icon: "🔍", href: "/skillgap", tag: "Practical" },
            { title: "Portfolio Builder", desc: "Turn your experience and projects into a polished portfolio that stands out to recruiters.", icon: "💼", href: "/portfolio", tag: "Helpful" },
            { title: "Sri Lanka Job Intelligence", desc: "Get guidance shaped around local internship patterns, market needs, and career expectations.", icon: "🌍", href: "/dashboard", tag: "Local" },
          ].map((feature, i) => (
            <a key={i} href={feature.href} className="group border border-gray-200 hover:border-blue-500 rounded-xl p-6 transition cursor-pointer hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">From first year to first job</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We designed SkillBridge AI to guide students through every milestone with practical coaching, not generic answers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Plan your next step", desc: "Know what to learn, what project to build, and where to focus first.", icon: "📅" },
              { title: "Measure your readiness", desc: "Track your progress with a career score and clear improvement suggestions.", icon: "📈" },
              { title: "Prepare for opportunities", desc: "Practice interviews, improve your portfolio, and get internship-ready with confidence.", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500">Get career-ready in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us about yourself", desc: "Enter your university, field of study, and career goals. Takes less than 2 minutes.", icon: "👤" },
              { step: "02", title: "Get AI-powered insights", desc: "Our AI analyzes your profile and generates personalized career guidance instantly.", icon: "🤖" },
              { step: "03", title: "Take action and grow", desc: "Follow your roadmap, track progress, and practice interviews to land your dream job.", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <p className="text-blue-600 font-bold text-sm mb-2">STEP {item.step}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="bg-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to bridge the gap?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of Sri Lankan students using SkillBridge AI to launch their careers.
          </p>
          <a href="/login" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-base font-semibold transition inline-block">
            Get Started for Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">SkillBridge AI</span>
          </div>
          <p className="text-sm text-gray-400">Built for Sri Lankan students · YGC 15 · 2026</p>
          <div className="flex gap-6">
            <a href="/roadmap" className="text-sm text-gray-400 hover:text-blue-600 transition">Roadmap</a>
            <a href="/skillgap" className="text-sm text-gray-400 hover:text-blue-600 transition">Skill Gap</a>
            <a href="/interview" className="text-sm text-gray.400 hover:text-blue-600 transition">Interview</a>
          </div>
        </div>
      </footer>

    </main>
  );
}