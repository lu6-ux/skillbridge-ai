import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { university, field, goal } = await req.json();

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
            Student details:
            - University: ${university}
            - Field of Study: ${field}
            - Career Goal: ${goal}
            
            Create a clear step-by-step career roadmap with 5 steps.
            For each step include:
            1. Step title
            2. What to do
            3. Timeline
            
            Format each step clearly with numbers.`
          }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const roadmap = data.choices[0].message.content;
    return NextResponse.json({ roadmap });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}