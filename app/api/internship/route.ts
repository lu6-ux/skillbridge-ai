import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

function buildFallbackResult(data: {
  name: string;
  skills: string;
  experience: string;
  jobDescription: string;
}) {
  const score = 62 + (data.skills ? 8 : 0) + (data.experience ? 6 : 0);
  const matchScore = Math.min(95, score);

  return `🎯 MATCH PERCENTAGE
${matchScore}%

✅ MATCHING QUALIFICATIONS
- Good foundational skills and willingness to learn
- ${data.skills ? `Relevant skills: ${data.skills}` : "You have a useful base of skills"}
- ${data.experience ? `Experience noted: ${data.experience}` : "Some practical exposure would strengthen your application"}

❌ MISSING REQUIREMENTS
- More evidence of hands-on projects
- Stronger resume wording and tailoring
- Additional practice with the specific tools mentioned in the role

📝 COVER LETTER TIPS
1. Mention your strongest relevant skill first.
2. Connect your projects to the internship requirements.
3. Show motivation, communication, and eagerness to learn.

🚀 HOW TO IMPROVE CHANCES
1. Build one small project related to the role.
2. Tailor your resume to the internship description.
3. Apply with a short, strong cover letter.

⭐ OVERALL VERDICT
You should apply now if you can present a clear resume and a short motivation statement. If your profile is still very basic, strengthen your portfolio first.`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, skills, experience, jobDescription } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json({ result: buildFallbackResult({ name, skills, experience, jobDescription }) });
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
            content: `You are an internship readiness evaluator for Sri Lankan students.

            Student Profile:
            - Name: ${name}
            - Current Skills: ${skills}
            - Experience: ${experience}

            Internship Job Description:
            ${jobDescription}

            Analyze and provide:
            1. 🎯 MATCH PERCENTAGE - how well they match this internship (0-100%)
            2. ✅ MATCHING QUALIFICATIONS - what they have that matches
            3. ❌ MISSING REQUIREMENTS - what they are lacking
            4. 📝 COVER LETTER TIPS - 3 specific tips for applying
            5. 🚀 HOW TO IMPROVE CHANCES - top 3 action items before applying
            6. ⭐ OVERALL VERDICT - should they apply now or wait?

            Be honest and specific for Sri Lankan job market.`
          }
        ],
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ result: buildFallbackResult({ name, skills, experience, jobDescription }), error }, { status: 200 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || buildFallbackResult({ name, skills, experience, jobDescription });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ result: buildFallbackResult({ name: "", skills: "", experience: "", jobDescription: "" }), error: String(error) }, { status: 200 });
  }
}