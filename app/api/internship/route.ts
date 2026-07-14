import { NextRequest, NextResponse } from "next/server";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
export async function POST(req: NextRequest) {
  try {
    const { name, skills, experience, jobDescription } = await req.json();

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
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    return NextResponse.json({ result });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}