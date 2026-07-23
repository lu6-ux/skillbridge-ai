import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

function buildFallbackPortfolio(data: {
  name: string;
  university: string;
  field: string;
  skills: string;
  projects: string;
  experience: string;
  goal: string;
}) {
  const safeName = data.name || "Student";
  const safeUniversity = data.university || "your university";
  const safeField = data.field || "your field of study";
  const safeSkills = data.skills || "strong communication and technical skills";
  const safeProjects = data.projects || "academic and personal projects";
  const safeExperience = data.experience || "hands-on learning and practical exposure";
  const safeGoal = data.goal || "to grow as a professional in the technology industry";

  return `👤 PERSONAL SUMMARY
${safeName} is a motivated and growth-oriented student currently pursuing studies at ${safeUniversity} in ${safeField}. They bring a strong mix of academic discipline, practical project experience, and a genuine passion for building meaningful solutions. Their goal is to turn learning into impact by contributing to technology-driven opportunities in Sri Lanka and beyond.

🛠️ SKILLS SECTION
- Technical Skills: ${safeSkills}
- Project Experience: ${safeProjects}
- Professional Exposure: ${safeExperience}
- Strengths: Adaptability, problem solving, collaboration, and continuous learning

💻 PROJECTS SECTION
${safeProjects}

🎯 CAREER OBJECTIVE
${safeGoal}

💡 UNIQUE VALUE PROPOSITION
${safeName} stands out through initiative, curiosity, and a strong commitment to developing practical skills that matter in the modern workplace.`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, university, field, skills, projects, experience, goal } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json({ portfolio: buildFallbackPortfolio({ name, university, field, skills, projects, experience, goal }) });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `You are a professional portfolio writer for Sri Lankan students.

            Student Details:
            - Name: ${name}
            - University: ${university}
            - Field: ${field}
            - Skills: ${skills}
            - Projects: ${projects}
            - Experience: ${experience}
            - Career Goal: ${goal}

            Write a professional portfolio profile including:
            1. 👤 PERSONAL SUMMARY - 3 sentence professional bio
            2. 🛠️ SKILLS SECTION - organized by category
            3. 💻 PROJECTS SECTION - describe each project professionally
            4. 🎯 CAREER OBJECTIVE - one paragraph
            5. 💡 UNIQUE VALUE PROPOSITION - what makes them stand out

            Make it sound professional and impressive for Sri Lankan employers.`,
          },
        ],
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ portfolio: buildFallbackPortfolio({ name, university, field, skills, projects, experience, goal }), error }, { status: 200 });
    }

    const data = await response.json();
    const portfolio = data.choices?.[0]?.message?.content || buildFallbackPortfolio({ name, university, field, skills, projects, experience, goal });
    return NextResponse.json({ portfolio });
  } catch (error) {
    return NextResponse.json({ portfolio: buildFallbackPortfolio({ name: "", university: "", field: "", skills: "", projects: "", experience: "", goal: "" }), error: String(error) }, { status: 200 });
  }
}