export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Internship" | "Full-time";
  salaryLkr: string;
  description: string;
  skills: string[];
  matchScore: number;
}

export const sriLankanJobListings: JobListing[] = [
  {
    id: "wso2-intern",
    title: "Software Engineering Intern",
    company: "WSO2",
    location: "Colombo",
    type: "Internship",
    salaryLkr: "LKR 35,000 - 50,000/month",
    description: "Join WSO2's product engineering team and contribute to open-source cloud-native solutions.",
    skills: ["JavaScript", "React", "Git", "APIs"],
    matchScore: 94,
  },
  {
    id: "ifs-jr-dev",
    title: "Junior Software Developer",
    company: "IFS",
    location: "Colombo",
    type: "Full-time",
    salaryLkr: "LKR 120,000 - 180,000/month",
    description: "Build enterprise-grade applications for global customers with a strong engineering team.",
    skills: ["Java", "SQL", "Spring Boot", "Problem Solving"],
    matchScore: 88,
  },
  {
    id: "dialog-qa",
    title: "QA Automation Intern",
    company: "Dialog Axiata",
    location: "Colombo",
    type: "Internship",
    salaryLkr: "LKR 25,000 - 40,000/month",
    description: "Work on quality engineering processes for digital products used by millions of users.",
    skills: ["Python", "Testing", "Automation", "Communication"],
    matchScore: 82,
  },
  {
    id: "sysco-analyst",
    title: "Data Analyst Trainee",
    company: "Sysco LABS",
    location: "Sri Lanka",
    type: "Full-time",
    salaryLkr: "LKR 90,000 - 140,000/month",
    description: "Turn data into insights and help product teams make smarter decisions.",
    skills: ["SQL", "Python", "Analytics", "Communication"],
    matchScore: 90,
  },
  {
    id: "hsenid-web",
    title: "Frontend Developer Intern",
    company: "hSenid Mobile",
    location: "Colombo",
    type: "Internship",
    salaryLkr: "LKR 30,000 - 45,000/month",
    description: "Develop modern user experiences for business and consumer products.",
    skills: ["React", "HTML/CSS", "JavaScript", "UI Design"],
    matchScore: 86,
  },
  {
    id: "virtusa-ui",
    title: "Associate UI Engineer",
    company: "Virtusa",
    location: "Colombo",
    type: "Full-time",
    salaryLkr: "LKR 110,000 - 170,000/month",
    description: "Create polished interfaces and collaborate with cross-functional partners.",
    skills: ["React", "JavaScript", "Git", "Teamwork"],
    matchScore: 91,
  },
];
