export interface SkillDemandItem {
  name: string;
  popularity: number;
  trend: "Increasing" | "Stable" | "Decreasing";
  monthlyDemand: number[];
}

export interface JobRoleItem {
  role: string;
  openings: number;
  experience: string;
  salary: string;
  topSkills: string[];
}

export interface CompanyItem {
  name: string;
  industry: string;
  openPositions: number;
  hiringStatus: "Hiring" | "Interviewing" | "Paused";
  logo: string;
}

export interface JobFilterOption {
  value: string;
  label: string;
}

export interface RecommendationItem {
  title: string;
  items: string[];
}

export interface JobInsightItem {
  title: string;
  detail: string;
}

export interface JobListingItem {
  id: number;
  title: string;
  company: string;
  province: string;
  district: string;
  mode: "Remote" | "Hybrid" | "On-site";
  type: "Internship" | "Full Time" | "Part Time";
  salary: string;
  matchScore: number;
}

export const skillDemandData: SkillDemandItem[] = [
  { name: "Python", popularity: 92, trend: "Increasing", monthlyDemand: [70, 74, 80, 86, 92] },
  { name: "Java", popularity: 81, trend: "Stable", monthlyDemand: [62, 63, 66, 70, 81] },
  { name: "JavaScript", popularity: 88, trend: "Increasing", monthlyDemand: [68, 71, 76, 83, 88] },
  { name: "React", popularity: 90, trend: "Increasing", monthlyDemand: [72, 75, 81, 86, 90] },
  { name: "Node.js", popularity: 78, trend: "Stable", monthlyDemand: [58, 60, 64, 69, 78] },
  { name: "SQL", popularity: 84, trend: "Increasing", monthlyDemand: [63, 66, 71, 77, 84] },
  { name: "AWS", popularity: 76, trend: "Increasing", monthlyDemand: [50, 54, 61, 69, 76] },
  { name: "Docker", popularity: 73, trend: "Increasing", monthlyDemand: [45, 48, 56, 64, 73] },
  { name: "Git", popularity: 87, trend: "Stable", monthlyDemand: [67, 69, 72, 78, 87] },
  { name: "Machine Learning", popularity: 70, trend: "Increasing", monthlyDemand: [40, 43, 51, 60, 70] },
  { name: "Power BI", popularity: 68, trend: "Stable", monthlyDemand: [41, 45, 50, 58, 68] },
  { name: "UI/UX", popularity: 74, trend: "Increasing", monthlyDemand: [49, 51, 56, 63, 74] },
];

export const jobRoleData: JobRoleItem[] = [
  { role: "Software Engineer", openings: 142, experience: "0-2 years", salary: "LKR 95k - 180k", topSkills: ["Python", "React", "SQL"] },
  { role: "AI Engineer", openings: 64, experience: "1-3 years", salary: "LKR 120k - 220k", topSkills: ["Python", "Machine Learning", "AWS"] },
  { role: "Data Analyst", openings: 88, experience: "0-2 years", salary: "LKR 80k - 140k", topSkills: ["SQL", "Power BI", "Python"] },
  { role: "QA Engineer", openings: 55, experience: "0-1 years", salary: "LKR 70k - 120k", topSkills: ["Java", "Git", "Testing"] },
  { role: "UI/UX Designer", openings: 47, experience: "0-2 years", salary: "LKR 75k - 140k", topSkills: ["UI/UX", "Figma", "React"] },
  { role: "DevOps Engineer", openings: 38, experience: "1-3 years", salary: "LKR 100k - 190k", topSkills: ["AWS", "Docker", "Linux"] },
  { role: "Cyber Security Engineer", openings: 31, experience: "1-3 years", salary: "LKR 110k - 200k", topSkills: ["Security", "Networking", "Python"] },
  { role: "Mobile App Developer", openings: 42, experience: "0-2 years", salary: "LKR 85k - 160k", topSkills: ["React", "Node.js", "Flutter"] },
];

export const companyData: CompanyItem[] = [
  { name: "IFS", industry: "Software", openPositions: 24, hiringStatus: "Hiring", logo: "IFS" },
  { name: "Virtusa", industry: "IT Services", openPositions: 18, hiringStatus: "Interviewing", logo: "V" },
  { name: "CodeGen", industry: "Product Engineering", openPositions: 16, hiringStatus: "Hiring", logo: "CG" },
  { name: "WSO2", industry: "Open Source", openPositions: 12, hiringStatus: "Hiring", logo: "W" },
  { name: "99X", industry: "Software", openPositions: 10, hiringStatus: "Paused", logo: "99" },
];

export const jobListingsData: JobListingItem[] = [
  { id: 1, title: "Junior Software Engineer", company: "IFS", province: "Western", district: "Colombo", mode: "Hybrid", type: "Full Time", salary: "LKR 90k - 140k", matchScore: 94 },
  { id: 2, title: "Data Analyst Intern", company: "Dialog Axiata", province: "Western", district: "Colombo", mode: "Remote", type: "Internship", salary: "LKR 25k - 45k", matchScore: 91 },
  { id: 3, title: "React Developer", company: "WSO2", province: "Western", district: "Colombo", mode: "On-site", type: "Full Time", salary: "LKR 100k - 170k", matchScore: 89 },
  { id: 4, title: "AI Intern", company: "CodeGen", province: "Central", district: "Kandy", mode: "Hybrid", type: "Internship", salary: "LKR 30k - 55k", matchScore: 87 },
  { id: 5, title: "QA Engineer", company: "Virtusa", province: "Western", district: "Colombo", mode: "On-site", type: "Full Time", salary: "LKR 80k - 130k", matchScore: 84 },
];

export const provinceOptions: JobFilterOption[] = [
  { value: "All", label: "All Provinces" },
  { value: "Western", label: "Western" },
  { value: "Central", label: "Central" },
  { value: "Southern", label: "Southern" },
  { value: "North Western", label: "North Western" },
];

export const districtOptions: JobFilterOption[] = [
  { value: "All", label: "All Districts" },
  { value: "Colombo", label: "Colombo" },
  { value: "Kandy", label: "Kandy" },
  { value: "Galle", label: "Galle" },
  { value: "Kurunegala", label: "Kurunegala" },
];

export const modeOptions: JobFilterOption[] = [
  { value: "All", label: "All Work Modes" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
];

export const typeOptions: JobFilterOption[] = [
  { value: "All", label: "All Job Types" },
  { value: "Internship", label: "Internship" },
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
];
