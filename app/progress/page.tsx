"use client";
import { useState } from "react";

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

  const toggleSkill = (skill: string) => {
    setChecked((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const completedSkills = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedSkills / totalSkills) * 100);

  const getScoreColor = () => {
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = () => {
    if (percentage >= 70) return "You are job ready! 🎉";
    if (percentage >= 40) return "Good progress! Keep going! 💪";
    return "Just getting started! You got this! 🚀";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Progress Tracker
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Track your career journey step by step
      </p>

      {/* Score Card */}
      <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 mb-8 text-center">
        <p className="text-blue-200 mb-2">Your Career Progress</p>
        <p className={`text-7xl font-bold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </p>
        <p className="text-lg text-blue-200">{getScoreMessage()}</p>

        {/* Progress Bar */}
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
          {completedSkills} of {totalSkills} skills completed
        </p>
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