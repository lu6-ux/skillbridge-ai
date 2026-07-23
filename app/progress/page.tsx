"use client";
import { useEffect, useMemo, useState } from "react";

const skillCategories = [
  {
    category: "Technical Skills",
    skills: ["Python", "JavaScript", "React", "SQL", "HTML/CSS", "Git"],
  },
  {
    category: "Soft Skills",
    skills: ["Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management"],
  },
  {
    category: "Career Preparation",
    skills: ["Resume Built", "LinkedIn Profile", "Mock Interview", "Portfolio Created", "GitHub Profile"],
  },
  {
    category: "Certifications",
    skills: ["Google Certificate", "AWS Certificate", "Microsoft Certificate", "Coursera Course", "Udemy Course"],
  },
];

export default function ProgressPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem("skillbridge-progress-history");
    const savedChecks = window.localStorage.getItem("skillbridge-progress-checklist");

    if (raw) {
      try {
        setHistory(JSON.parse(raw));
      } catch {
        setHistory([]);
      }
    }

    if (savedChecks) {
      try {
        setChecked(JSON.parse(savedChecks));
      } catch {
        setChecked({});
      }
    }
  }, []);

  const toggleSkill = (skill: string) => {
    setChecked((prev) => {
      const nextValue = { ...prev, [skill]: !prev[skill] };
      window.localStorage.setItem("skillbridge-progress-checklist", JSON.stringify(nextValue));
      return nextValue;
    });
  };

  const resetProgress = () => {
    setChecked({});
    window.localStorage.removeItem("skillbridge-progress-checklist");
    setHistory((prev) => {
      const nextHistory = prev.length ? [...prev, 0] : [0];
      window.localStorage.setItem("skillbridge-progress-history", JSON.stringify(nextHistory));
      return nextHistory;
    });
  };

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const completedSkills = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedSkills / totalSkills) * 100);

  useEffect(() => {
    setHistory((prev) => {
      const latest = prev[prev.length - 1];
      if (latest === percentage) {
        return prev;
      }

      const nextHistory = [...prev, percentage];
      window.localStorage.setItem("skillbridge-progress-history", JSON.stringify(nextHistory));
      return nextHistory;
    });
  }, [percentage]);

  const getScoreColor = () => {
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = () => {
    if (percentage >= 70) return "You are moving toward job readiness! 🎉";
    if (percentage >= 40) return "Nice momentum — keep building! 💪";
    return "A strong foundation starts here — keep going! 🚀";
  };

  const getMilestone = () => {
    if (percentage >= 80) return "Career-ready milestone";
    if (percentage >= 60) return "Strong preparation";
    if (percentage >= 40) return "Steady growth";
    return "Getting started";
  };

  const historySummary = useMemo(() => {
    if (history.length === 0) return [];
    return history.slice(-6);
  }, [history]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Career Progress Tracker
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Track your growth, stay consistent, and turn preparation into momentum.
      </p>

      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 mb-8 text-center">
        <div className="flex justify-between items-center mb-4">
          <p className="text-blue-200">Your Career Progress</p>
          <span className="text-sm text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full">
            {getMilestone()}
          </span>
        </div>
        <p className={`text-7xl font-bold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </p>
        <p className="text-lg text-blue-200">{getScoreMessage()}</p>

        <div className="mt-6 bg-white/10 rounded-full h-4">
          <div
            className="h-4 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage >= 70 ? "#10B981" : percentage >= 40 ? "#F59E0B" : "#EF4444",
            }}
          />
        </div>
        <p className="mt-2 text-sm text-blue-300">
          {completedSkills} of {totalSkills} milestones completed
        </p>

        <button
          onClick={resetProgress}
          className="mt-5 text-sm text-blue-100 underline hover:text-white"
        >
          Reset progress
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-blue-400 mb-3">Progress history</h2>
        <div className="flex items-end gap-2 h-32">
          {historySummary.length > 0 ? historySummary.map((value, index) => (
            <div key={`${value}-${index}`} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t-lg bg-blue-400"
                style={{ height: `${Math.max(12, value)}%` }}
              />
              <span className="mt-2 text-xs text-blue-200">W{index + 1}</span>
            </div>
          )) : (
            <p className="text-sm text-blue-200">Your progress chart will appear here after you complete your first milestone.</p>
          )}
        </div>
      </div>

      {/* Skill Categories */}
      <div className="max-w-xl mx-auto space-y-6">
        {skillCategories.map((cat) => {
          const catCompleted = cat.skills.filter((s) => checked[s]).length;
          return (
            <div key={cat.category} className="bg-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-blue-400">
                  {cat.category}
                </h2>
                <span className="text-sm text-blue-300">
                  {catCompleted}/{cat.skills.length}
                </span>
              </div>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                      checked[skill]
                        ? "bg-green-500/20 border border-green-500/40"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        checked[skill]
                          ? "bg-green-500 border-green-500"
                          : "border-white/30"
                      }`}
                    >
                      {checked[skill] && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span
                      className={
                        checked[skill] ? "line-through text-green-300" : "text-white"
                      }
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}