import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

function buildFallbackResult(data: {
  name: string;
  university: string;
  field: string;
  skills: string;
  experience: string;
  hasResume: boolean;
  hasCertificates: boolean;
  goalRole: string;
}) {
  const score = 68 + (data.hasResume ? 6 : 0) + (data.hasCertificates ? 4 : 0) + (data.experience ? 4 : 0);
  const clampedScore = Math.min(95, score);

  return `🎯 CAREER READINESS SCORE
${clampedScore}/100

💪 STRENGTHS
- Strong academic foundation in ${data.field || "your field"}
- Good initiative and willingness to learn
- ${data.skills ? `Relevant skills: ${data.skills}` : "You have a solid base of transferable skills"}

⚠️ WEAKNESSES
- More practical project evidence would improve your profile
- ${data.hasResume ? "Resume is present, but it can be strengthened" : "A polished resume is still missing"}
- ${data.hasCertificates ? "Certificates help, but more hands-on experience would boost your profile" : "Adding certificates or project proof would help"}

📋 TOP 5 ACTION ITEMS
1. Build 2 portfolio projects and document them clearly.
2. Update your resume and LinkedIn profile.
3. Apply for internships or freelance tasks this month.
4. Practice mock interviews for ${data.goalRole || "your target role"}.
5. Add one certification or online course relevant to your field.

⏱️ ESTIMATED TIME TO BE JOB READY
Around 2–3 months with steady effort and consistent skill-building.`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, university, field, skills, experience, hasResume, hasCertificates, goalRole } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json({ result: buildFallbackResult({ name, university, field, skills, experience, hasResume, hasCertificates, goalRole }) });
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
            content: `You are a career readiness evaluator for Sri Lankan students.

            Student Profile:
            - Name: ${name}
            - University: ${university}
            - Field: ${field}
            - Current Skills: ${skills}
            - Work/Internship Experience: ${experience}
            - Has Resume: ${hasResume}
            - Has Certificates: ${hasCertificates}
            - Target Role: ${goalRole}

            Evaluate and provide:
            1. 🎯 CAREER READINESS SCORE - give a score out of 100
            2. 💪 STRENGTHS - what they are doing well
            3. ⚠️ WEAKNESSES - what needs improvement
            4. 📋 TOP 5 ACTION ITEMS - specific things to do this month
            5. ⏱️ ESTIMATED TIME TO BE JOB READY - realistic timeline

            Be encouraging but honest. Focus on Sri Lankan job market.`
          }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ result: buildFallbackResult({ name, university, field, skills, experience, hasResume, hasCertificates, goalRole }), error }, { status: 200 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || buildFallbackResult({ name, university, field, skills, experience, hasResume, hasCertificates, goalRole });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ result: buildFallbackResult({ name: "", university: "", field: "", skills: "", experience: "", hasResume: false, hasCertificates: false, goalRole: "" }), error: String(error) }, { status: 200 });
  }
}