"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

export default function SkillGapPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    setIsGuest(!getCurrentUser());
  }, []);

  const analyzeSkills = async () => {
    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/skillgap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSkills, jobRole }),
      });

      const data = await res.json();
      setAnalysis(data.analysis || "We could not generate a full report right now. Please try again in a moment.");
    } catch {
      setAnalysis("The analysis service is currently unavailable. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      {isGuest && (
        <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 text-sm text-sky-100">
          <p className="font-semibold">Guest mode is active</p>
          <p className="mt-1">You can try this skill-gap analysis now. Create a free account to save your insights and unlock more AI features.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Skill Gap Analysis
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Find out exactly which skills you need to get hired
      </p>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 space-y-5">

        <div>
          <label className="block text-sm text-blue-200 mb-1">
            Your Current Skills
          </label>
          <textarea
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-32 resize-none"
            placeholder="e.g. Python, HTML, CSS, Microsoft Office, Communication..."
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">
            Target Job Role
          </label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Software Engineer, Data Analyst, UI/UX Designer"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>

        <button
          onClick={analyzeSkills}
          disabled={loading || !currentSkills || !jobRole}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Analyzing your skills..." : "Analyze My Skills 🔍"}
        </button>
      </div>

      {/* Result */}
      {analysis && (
        <div className="max-w-xl mx-auto mt-8 bg-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Your Skill Gap Report ✅
          </h2>
          <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
            {analysis}
          </pre>
        </div>
      )}

    </main>
  );
}