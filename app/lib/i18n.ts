export type Language = "en" | "si";

const dictionaries = {
  en: {
    dashboardTitle: "Welcome back",
    jobsTitle: "Sri Lankan opportunities",
    jobsSubtitle: "Curated internships and jobs for students like you.",
    progressTitle: "Progress Tracker",
    progressSubtitle: "Track your career journey step by step",
    leaderboardTitle: "Peer benchmark",
    leaderboardSubtitle: "See how your readiness compares with other students.",
    reminderTitle: "Weekly career coach",
    reminderSubtitle: "Get a friendly reminder every week to keep your plan moving.",
    loginTitle: "SkillBridge AI",
    loginSubtitle: "Welcome back! Sign in to continue",
    loginButton: "Sign In",
    createButton: "Create Account",
    emailLabel: "Email Address",
    passwordLabel: "Password",
  },
  si: {
    dashboardTitle: "වෙතට නැවත සාදරයෙන්",
    jobsTitle: "ශ්‍රී ලාංකික අවස්ථා",
    jobsSubtitle: "ඔබට අදාල අන්තර්ගත පුහුණු හා රැකියා අවස්ථා.",
    progressTitle: "ප්‍රගතිය නිරීක්ෂණය",
    progressSubtitle: "ඔබේ වෘත්තීය ගමන පියවරෙන් පියවර ත්‍යාන්ත්‍රිකව නිරීක්ෂණය කරන්න",
    leaderboardTitle: "සෙසු සිසුන් සමඟ සමාන්තර කිරීම",
    leaderboardSubtitle: "ඔබේ සූදානම කෙලෙස සෙසු සිසුන් සමඟ සමාන්තරද කියන්න.",
    reminderTitle: "සතියේ වෘත්තීය උපදේශකය",
    reminderSubtitle: "ඔබේ සැලසුම දිගටම ගෙන යාමට සතියකට වරක් සිහිකැඳුම් ලබා ගන්න.",
    loginTitle: "SkillBridge AI",
    loginSubtitle: "නැවත සාදරයෙන්! දිගටම කරගෙන යාමට පුරනය වන්න",
    loginButton: "පුරන්න",
    createButton: "ගිණුමක් සාදන්න",
    emailLabel: "ඊතැපැල් ලිපිනය",
    passwordLabel: "මුරපදය",
  },
};

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return (window.localStorage.getItem("skillbridge-lang") as Language) === "si" ? "si" : "en";
}

export function setStoredLanguage(language: Language) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("skillbridge-lang", language);
  document.documentElement.lang = language;
}

export function t(key: keyof typeof dictionaries.en, language: Language = getStoredLanguage()) {
  return dictionaries[language][key] ?? dictionaries.en[key];
}
