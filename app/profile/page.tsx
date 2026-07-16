"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Profile {
  full_name: string;
  university: string;
  field_of_study: string;
  career_goal: string;
  avatar_url: string;
}

interface User {
  id: string;
  email?: string | null;
  user_metadata?: { full_name?: string; avatar_url?: string };
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    university: "",
    field_of_study: "",
    career_goal: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
      } else {
        setProfile(prev => ({
          ...prev,
          full_name: user.user_metadata?.full_name ?? "",
          avatar_url: user.user_metadata?.avatar_url ?? "",
        }));
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setError("Failed to save. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getInitials = (name: string) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
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
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information and career details</p>
        </div>

        {/* Avatar Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 flex items-center gap-6">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {getInitials(profile.full_name)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.full_name || "Your Name"}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-blue-600 text-sm mt-1">
              {profile.field_of_study || "Add your field of study"}
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
            Personal Information
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="full_name"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Kasun Perera"
              value={profile.full_name}
              onChange={handleChange}
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University / Institution</label>
            <input
              name="university"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. University of Colombo"
              value={profile.university}
              onChange={handleChange}
            />
          </div>

          {/* Field of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
            <input
              name="field_of_study"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Information Technology"
              value={profile.field_of_study}
              onChange={handleChange}
            />
          </div>

          {/* Career Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Goal</label>
            <input
              name="career_goal"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Software Engineer at a leading tech company"
              value={profile.career_goal}
              onChange={handleChange}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success */}
          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <p className="text-green-600 text-sm">✅ Profile saved successfully!</p>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>

       {/* Quick Links */}
<div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Quick Access
  </h3>

  <div className="grid grid-cols-2 gap-3">

    {[
      { label: "Career Roadmap", href: "/roadmap", icon: "🗺️" },
      { label: "Skill Gap Analysis", href: "/skillgap", icon: "🔍" },
      { label: "Career Readiness", href: "/readiness", icon: "🏆" },
      { label: "Mock Interview", href: "/interview", icon: "🎤" },
    ].map((link, i) => (

      <a
        key={i}
        href={link.href}
        className="flex items-center gap-3 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 transition group"
      >

        <span className="text-xl">
          {link.icon}
        </span>

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