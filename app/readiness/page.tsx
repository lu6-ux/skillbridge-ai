"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

export default function ReadinessPage() {
  const [form, setForm] = useState({
    name: "",
    university: "",
    field: "",
    skills: "",
    experience: "",
    hasResume: "No",
    hasCertificates: "No",
    goalRole: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    setIsGuest(!getCurrentUser());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyzeReadiness = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data.result || "We could not generate your readiness score right now. Please try again shortly.");
    } catch {
      setResult("The readiness service is currently unavailable. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      {isGuest && (
        <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 text-sm text-sky-100">
          <p className="font-semibold">Guest mode is active</p>
          <p className="mt-1">You can try your readiness score now. Create a free account to save your report and unlock more AI features.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Career Readiness Score
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Get your personalized 0–100 career readiness score
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

        {/* University */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">University</label>
          <input
            name="university"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. University of Colombo"
            onChange={handleChange}
          />
        </div>

        {/* Field */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Field of Study</label>
          <input
            name="field"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Information Technology"
            onChange={handleChange}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Current Skills</label>
          <textarea
            name="skills"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-24 resize-none"
            placeholder="e.g. Python, HTML, CSS, Communication, Teamwork"
            onChange={handleChange}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Work / Internship Experience</label>
          <input
            name="experience"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. 3 months internship at XYZ, or None"
            onChange={handleChange}
          />
        </div>

        {/* Has Resume */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Do you have a Resume?</label>
          <select
            name="hasResume"
            className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Has Certificates */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Do you have any Certificates?</label>
          <select
            name="hasCertificates"
            className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Goal Role */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Target Job Role</label>
          <input
            name="goalRole"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Software Engineer"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={analyzeReadiness}
          disabled={loading || !form.name || !form.university || !form.goalRole}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Calculating your score..." : "Get My Readiness Score 🏆"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="max-w-xl mx-auto mt-8 bg-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Your Career Readiness Report ✅
          </h2>
          <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
            {result}
          </pre>
        </div>
      )}

    </main>
  );
}