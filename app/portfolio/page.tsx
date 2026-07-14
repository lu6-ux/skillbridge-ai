"use client";
import { useState } from "react";

export default function PortfolioPage() {
  const [form, setForm] = useState({
    name: "",
    university: "",
    field: "",
    skills: "",
    projects: "",
    experience: "",
    goal: "",
  });
  const [portfolio, setPortfolio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePortfolio = async () => {
    setLoading(true);
    setPortfolio("");

    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setPortfolio(data.portfolio);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Portfolio Builder
      </h1>
      <p className="text-center text-blue-200 mb-10">
        AI writes your professional portfolio in seconds
      </p>

      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 space-y-5">

        <div>
          <label className="block text-sm text-blue-200 mb-1">Full Name</label>
          <input
            name="name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Kasun Perera"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">University</label>
          <input
            name="university"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. University of Colombo"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Field of Study</label>
          <input
            name="field"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Information Technology"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Skills</label>
          <textarea
            name="skills"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-24 resize-none"
            placeholder="e.g. Python, React, MySQL, Figma, Communication"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Projects</label>
          <textarea
            name="projects"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-28 resize-none"
            placeholder="e.g. Built a student management system using Python and MySQL. Created a personal portfolio website using React."
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">
            Work / Internship Experience
          </label>
          <input
            name="experience"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. 3 months intern at ABC company, or None"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Career Goal</label>
          <input
            name="goal"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
            placeholder="e.g. Software Engineer at a leading Sri Lankan tech company"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={generatePortfolio}
          disabled={loading || !form.name || !form.skills || !form.projects}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Building your portfolio..." : "Build My Portfolio 💼"}
        </button>
      </div>

      {/* Result */}
      {portfolio && (
        <div className="max-w-xl mx-auto mt-8 bg-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Your Professional Portfolio ✅
          </h2>
          <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
            {portfolio}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(portfolio)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
          >
            Copy Portfolio Text 📋
          </button>
        </div>
      )}

    </main>
  );
}