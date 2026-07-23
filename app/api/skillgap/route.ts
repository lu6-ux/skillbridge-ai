import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

function buildFallbackAnalysis(currentSkills: string, jobRole: string) {
  const skills = currentSkills || "Python, communication, teamwork";
  const role = jobRole || "software engineer";

  return `✅ SKILLS YOU HAVE
- ${skills}

❌ SKILLS YOU ARE MISSING
- ${role === "software engineer" ? "React, SQL, GitHub, system design, and API integration" : "Industry-specific tools, project portfolio, and practical implementation experience"}

📚 WHAT TO LEARN NEXT
1. Build 2 small projects using the target stack and document them.
2. Practice one interview question set for ${role} and improve communication.
3. Follow free learning resources on YouTube, Coursera, and Microsoft Learn.

📊 READINESS PERCENTAGE
65% ready for ${role} role. You have a good foundation, but practical experience and portfolio evidence will strengthen your profile.`;
}

export async function POST(req: NextRequest) {
  try {
    const { currentSkills, jobRole } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json({ analysis: buildFallbackAnalysis(currentSkills, jobRole) });
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
            content: `You are a career advisor for Sri Lankan students.

            Student's current skills: ${currentSkills}
            Target job role: ${jobRole}

            Analyze the skill gap and provide:
            1. ✅ SKILLS YOU HAVE - list matching skills
            2. ❌ SKILLS YOU ARE MISSING - list missing skills
            3. 📚 WHAT TO LEARN NEXT - top 3 recommendations with free resources
            4. 📊 READINESS PERCENTAGE - how ready they are for this role

            Be specific and helpful for Sri Lankan job market.`
          }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ analysis: buildFallbackAnalysis(currentSkills, jobRole), error }, { status: 200 });
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || buildFallbackAnalysis(currentSkills, jobRole);
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ analysis: buildFallbackAnalysis("", ""), error: String(error) }, { status: 200 });
  }
}