"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Skill {
  name: string;
  level: number;
}

interface Profile {
  full_name: string;
  university: string;
  field_of_study: string;
  career_goal: string;
  academic_year: string;
  skills: Skill[];
}

const DEFAULT_SKILLS = [
  "Python", "JavaScript", "React", "Java", "SQL",
  "HTML/CSS", "Git", "Communication", "Teamwork", "Problem Solving"
];

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    university: "",
    field_of_study: "",
    career_goal: "",
    academic_year: "2nd Year",
    skills: DEFAULT_SKILLS.map(name => ({ name, level: 0 })),
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      setUser(user);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setProfile({
          full_name: data.full_name ?? "",
          university: data.university ?? "",
          field_of_study: data.field_of_study ?? "",
          career_goal: data.career_goal ?? "",
          academic_year: data.academic_year ?? "2nd Year",
          skills: data.skills ?? DEFAULT_SKILLS.map(name => ({ name, level: 0 })),
        });
      } else {
        setProfile(prev => ({ ...prev, full_name: user.user_metadata?.full_name ?? "" }));
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").upsert({
      id: user.id, ...profile, updated_at: new Date().toISOString()
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const setSkillLevel = (index: number, level: number) => {
    const updated = [...profile.skills];
    updated[index].level = level;
    setProfile(prev => ({ ...prev, skills: updated }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile(prev => ({ ...prev, skills: [...prev.skills, { name: newSkill.trim(), level: 1 }] }));
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const getLevelLabel = (level: number) => {
    return ["Not learned", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"][level];
  };

  const getLevelColor = (level: number) => {
    return ["bg-gray-200", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-500", "bg-green-500"][level];
  };

  const getInitials = (name: string) =>
    name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  if (loading) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SkillBridge <span className="text-blue-600">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">Dashboard</a>
          <button
            onClick={() => supabase.auth.signOut().then(() => window.location.href = "/login")}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your profile is used across all AI features for personalized results
          </p>
        </div>

        {/* Avatar + Basic Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {getInitials(profile.full_name)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.full_name || "Your Name"}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {profile.university && (
                <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                  {profile.university}
                </span>
              )}
              {profile.field_of_study && (
                <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full">
                  {profile.field_of_study}
                </span>
              )}
              {profile.academic_year && (
                <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                  {profile.academic_year}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-100">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="full_name"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Kasun Perera"
                value={profile.full_name}
                onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
                value={profile.academic_year}
                onChange={e => setProfile(p => ({ ...p, academic_year: e.target.value }))}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                placeholder="University of Colombo"
                value={profile.university}
                onChange={e => setProfile(p => ({ ...p, university: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Information Technology"
                value={profile.field_of_study}
                onChange={e => setProfile(p => ({ ...p, field_of_study: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Goal</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              placeholder="e.g. Software Engineer at a leading tech company"
              value={profile.career_goal}
              onChange={e => setProfile(p => ({ ...p, career_goal: e.target.value }))}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-100">
            My Skills
          </h3>
          <p className="text-xs text-gray-400">
            Rate each skill from 0 (not learned) to 5 (expert)
          </p>

          <div className="space-y-3">
            {profile.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 w-36 flex-shrink-0">{skill.name}</span>
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => setSkillLevel(i, level === skill.level ? 0 : level)}
                      className={`h-2 flex-1 rounded-full transition ${
                        skill.level >= level ? getLevelColor(skill.level) : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 w-24 flex-shrink-0">
                  {getLevelLabel(skill.level)}
                </span>
                <button
                  onClick={() => removeSkill(i)}
                  className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Skill */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Add a new skill..."
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addSkill()}
            />
            <button
              onClick={addSkill}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Save */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <p className="text-green-600 text-sm font-medium">✅ Profile saved successfully!</p>
          </div>
        )}

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl text-sm font-semibold transition"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {/* Quick Links */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Career Roadmap", href: "/roadmap", icon: "🗺️" },
              { label: "Skill Gap Analysis", href: "/skillgap", icon: "🔍" },
              { label: "Career Readiness", href: "/readiness", icon: "🏆" },
              { label: "Mock Interview", href: "/interview", icon: "🎤" },
              { label: "Portfolio Builder", href: "/portfolio", icon: "💼" },
              { label: "Internship Check", href: "/internship", icon: "🎓" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="flex items-center gap-3 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 transition group"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}