"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";

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
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    setIsGuest(!getCurrentUser());
  }, []);

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

  const downloadPdf = () => {
    if (!portfolio) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      alert("Please allow pop-ups so the PDF preview can open.");
      return;
    }

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <title>${form.name || "Portfolio"} - PDF</title>
          <style>
            @page { size: A4; margin: 12mm; }
            body { font-family: Arial, sans-serif; color: #111827; margin: 0; padding: 24px; background: white; }
            .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: none; }
            h1 { font-size: 24px; margin-bottom: 8px; }
            h2 { font-size: 16px; color: #2563eb; margin-top: 20px; margin-bottom: 8px; }
            p { white-space: pre-wrap; line-height: 1.6; margin: 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${(form.name || "My Portfolio").replace(/</g, "&lt;")}</h1>
            <p>${(portfolio || "").replace(/</g, "&lt;").replace(/\n/g, "<br />")}</p>
          </div>
        </body>
      </html>`;

    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      {isGuest && (
        <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 text-sm text-sky-100">
          <p className="font-semibold">Guest mode is active</p>
          <p className="mt-1">You can try the portfolio builder now. Create a free account to save your work and unlock more AI features.</p>
        </div>
      )}

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
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(portfolio)}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
            >
              Copy Portfolio Text 📋
            </button>
            <button
              onClick={downloadPdf}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition"
            >
              Download as PDF 📄
            </button>
          </div>
        </div>
      )}

    </main>
  );
}