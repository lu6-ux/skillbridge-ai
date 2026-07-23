import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { cvText } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "user",
          content: `You are a professional CV reviewer for Sri Lankan students.

Analyze this CV content and provide:

1. 📊 CV SCORE - Rate out of 100
2. ✅ STRENGTHS - What is done well (list 3-5 points)
3. ❌ WEAKNESSES - What needs improvement (list 3-5 points)
4. 🔧 MISSING SECTIONS - Important sections not included
5. 💡 TOP 5 IMPROVEMENTS - Specific actionable changes to make
6. 🎯 ATS SCORE - How well it would pass ATS systems (out of 100)
7. 📝 SUMMARY - One paragraph overall assessment

CV Content:
${cvText}

Be specific and helpful for Sri Lankan job market.`
        }],
        max_tokens: 1500,
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