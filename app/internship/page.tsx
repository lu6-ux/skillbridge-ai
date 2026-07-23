"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

export default function InternshipPage() {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    experience: "",
    jobDescription: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    setIsGuest(!getCurrentUser());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkReadiness = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data.result || "We could not evaluate your internship readiness right now. Please try again shortly.");
    } catch {
      setResult("The internship service is currently unavailable. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      {isGuest && (
        <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 text-sm text-sky-100">
          <p className="font-semibold">Guest mode is active</p>
          <p className="mt-1">You can test your internship readiness now. Create a free account to save your results and unlock more AI features.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Internship Readiness Checker
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Paste any internship description and see if you are ready to apply
      </p>

      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Name</label>
          <input
            name="name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Kasun Perera"
            onChange={handleChange}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Current Skills</label>
          <textarea
            name="skills"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-24 resize-none"
            placeholder="e.g. Python, React, MySQL, Communication, Teamwork"
            onChange={handleChange}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Experience</label>
          <input
            name="experience"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Final year project, freelance work, or None"
            onChange={handleChange}
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">
            Paste Internship Job Description
          </label>
          <textarea
            name="jobDescription"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-40 resize-none"
            placeholder="Paste the full internship job description here... e.g. We are looking for a Software Engineering intern with knowledge of React, Node.js, and MySQL..."
            onChange={handleChange}
          />
        </div>

        <button
          onClick={checkReadiness}
          disabled={loading || !form.name || !form.skills || !form.jobDescription}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Checking your readiness..." : "Check My Readiness 🎓"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="max-w-xl mx-auto mt-8 bg-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Your Internship Readiness Report ✅
          </h2>
          <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
            {result}
          </pre>
        </div>
      )}

    </main>
  );
}