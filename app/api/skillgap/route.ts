import { NextRequest, NextResponse } from "next/server";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { currentSkills, jobRole } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
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
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    return NextResponse.json({ analysis });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}