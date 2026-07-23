"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

export default function RoadmapPage() {
  const [university, setUniversity] = useState("");
  const [field, setField] = useState("");
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    setIsGuest(!getCurrentUser());
  }, []);

  const generateRoadmap = async () => {
    setLoading(true);
    setRoadmap("");

    const res = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ university, field, goal }),
    });

    const data = await res.json();
    setRoadmap(data.roadmap);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      {isGuest && (
        <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 text-sm text-sky-100">
          <p className="font-semibold">Guest mode is active</p>
          <p className="mt-1">You can try this roadmap now. Create a free account to save your plan and unlock more AI features.</p>
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Career Roadmap
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Tell us about yourself and get your personalized career plan
      </p>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 space-y-5">
        
        <div>
          <label className="block text-sm text-blue-200 mb-1">University</label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. University of Colombo"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Field of Study</label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Information Technology"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Career Goal</label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Software Engineer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        <button
          onClick={generateRoadmap}
          disabled={loading || !university || !field || !goal}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Generating your roadmap..." : "Generate My Roadmap 🗺️"}
        </button>
      </div>

      {/* Result */}
      {roadmap && (
        <div className="max-w-xl mx-auto mt-8 bg-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Your Career Roadmap ✅
          </h2>
          <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
            {roadmap}
          </pre>
        </div>
      )}

    </main>
  );
}