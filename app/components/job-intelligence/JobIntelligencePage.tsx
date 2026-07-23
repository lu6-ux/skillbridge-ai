"use client";

import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "@/app/lib/auth";
import {
  companyData,
  districtOptions,
  jobListingsData,
  jobRoleData,
  modeOptions,
  provinceOptions,
  skillDemandData,
  typeOptions,
} from "@/app/data/sriLankaJobIntelligence";
import { StatCard } from "./StatCard";
import { SkillDemandChart } from "./SkillDemandChart";
import { JobFilters } from "./JobFilters";
import { RecommendationCard } from "./RecommendationCard";
import { CompanyCard } from "./CompanyCard";
import { useRouter } from "next/navigation";

interface ProfileData {
  full_name?: string;
  career_goal?: string;
  skills?: Array<{ name: string; level: number }>;
}

export function JobIntelligencePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [province, setProvince] = useState("All");
  const [district, setDistrict] = useState("All");
  const [mode, setMode] = useState("All");
  const [type, setType] = useState("All");
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [savedSkills, setSavedSkills] = useState<string[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    const storedProfile = window.localStorage.getItem("skillbridge-profile");
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch {
        setProfile(null);
      }
    }
  }, [router]);

  const filteredJobs = useMemo(() => {
    return jobListingsData.filter((job) => {
      const provinceMatch = province === "All" || job.province === province;
      const districtMatch = district === "All" || job.district === district;
      const modeMatch = mode === "All" || job.mode === mode;
      const typeMatch = type === "All" || job.type === type;
      return provinceMatch && districtMatch && modeMatch && typeMatch;
    });
  }, [district, mode, province, type]);

  const profileSkills = useMemo(() => {
    return (profile?.skills ?? []).map((skill) => skill.name.toLowerCase());
  }, [profile]);

  const missingSkills = useMemo(() => {
    const required = ["tensorflow", "docker", "aws", "sql", "react"];
    return required.filter((skill) => !profileSkills.includes(skill));
  }, [profileSkills]);

  const recommendations = [
    {
      title: "Recommended Courses",
      items: ["AWS Cloud Practitioner", "Machine Learning Specialization", "Advanced SQL for Analysts"],
    },
    {
      title: "Recommended Projects",
      items: ["Deploy a React + Node app to AWS", "Build a forecasting dashboard with Power BI", "Create an AI chatbot with Python"],
    },
    {
      title: "Recommended Certifications",
      items: ["AWS Certified Cloud Practitioner", "Google Data Analytics", "UX Design Fundamentals"],
    },
  ];

  const insights = [
    { title: "Python demand", detail: "Python demand increased by 18% this month." },
    { title: "Frontend momentum", detail: "React remains the most requested frontend framework." },
    { title: "Cloud employability", detail: "Cloud skills significantly improve employability for Sri Lankan tech roles." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Sri Lanka Job Intelligence</p>
              <h1 className="mt-2 text-3xl font-bold">Career insights for Sri Lankan students and graduates</h1>
              <p className="mt-3 max-w-2xl text-sm text-blue-50 sm:text-base">
                Discover where hiring is growing, which skills matter most, and how to improve your career readiness.
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-sm text-blue-100">Your Goal</p>
              <p className="font-semibold">{profile?.career_goal || "AI Engineer"}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Jobs analyzed" value="1,248" subtitle="Across internships and full-time roles" />
          <StatCard title="Most in-demand role" value="Software Engineer" subtitle="Strong hiring momentum" />
          <StatCard title="Average internship salary" value="LKR 32k" subtitle="Monthly estimate" />
          <StatCard title="Average graduate salary" value="LKR 105k" subtitle="Monthly estimate" />
        </section>

        <JobFilters
          province={province}
          district={district}
          mode={mode}
          type={type}
          onProvinceChange={setProvince}
          onDistrictChange={setDistrict}
          onModeChange={setMode}
          onTypeChange={setType}
          provinceOptions={provinceOptions}
          districtOptions={districtOptions}
          modeOptions={modeOptions}
          typeOptions={typeOptions}
        />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SkillDemandChart skills={skillDemandData} />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Top Job Roles</h3>
            <div className="mt-4 space-y-3">
              {jobRoleData.slice(0, 5).map((role) => (
                <div key={role.role} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">{role.role}</p>
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700">{role.openings} openings</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Experience: {role.experience}</p>
                  <p className="text-sm text-slate-600">Salary: {role.salary}</p>
                  <p className="mt-2 text-sm text-slate-500">Top skills: {role.topSkills.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Top Hiring Companies</h3>
              <span className="text-sm text-slate-500">Updated weekly</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {companyData.map((company) => (
                <CompanyCard
                  key={company.name}
                  name={company.name}
                  industry={company.industry}
                  openPositions={company.openPositions}
                  hiringStatus={company.hiringStatus}
                  logo={company.logo}
                  isSaved={savedCompanies.includes(company.name)}
                  onSave={() => setSavedCompanies((prev) => prev.includes(company.name) ? prev.filter((item) => item !== company.name) : [...prev, company.name])}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Personalized Recommendations</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800">
                <p className="font-semibold">Missing skills for your goal</p>
                <p className="mt-1">{missingSkills.length > 0 ? missingSkills.join(", ") : "You already match most of the priority skills"}</p>
              </div>
              {recommendations.map((item) => (
                <RecommendationCard key={item.title} title={item.title} items={item.items} />
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Jobs Matching Your Filters</h3>
            <div className="mt-4 space-y-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.company} • {job.district}, {job.province}</p>
                    <p className="mt-1 text-sm text-slate-600">{job.mode} • {job.type} • {job.salary}</p>
                  </div>
                  <button onClick={() => setSavedJobs((prev) => prev.includes(job.id) ? prev.filter((item) => item !== job.id) : [...prev, job.id])} className={`rounded-full px-3 py-1 text-sm ${savedJobs.includes(job.id) ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>
                    {savedJobs.includes(job.id) ? "Saved" : "Save"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">AI Insights</h3>
            <div className="mt-4 space-y-3">
              {insights.map((insight) => (
                <div key={insight.title} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="font-semibold text-slate-800">{insight.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{insight.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">Saved items</p>
              <p className="mt-2 text-sm text-slate-600">Saved companies: {savedCompanies.length}</p>
              <p className="mt-1 text-sm text-slate-600">Saved jobs: {savedJobs.length}</p>
              <p className="mt-1 text-sm text-slate-600">Saved skills: {savedSkills.length}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
