import { NextRequest, NextResponse } from "next/server";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { name, university, field, skills, experience, hasResume, hasCertificates, goalRole } = await req.json();

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
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    return NextResponse.json({ result });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}