import { NextRequest, NextResponse } from "next/server";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { name, university, field, skills, projects, experience, goal } = await req.json();

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
            
            Make it sound professional and impressive for Sri Lankan employers.`
          }
        ],
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const portfolio = data.choices[0].message.content;
    return NextResponse.json({ portfolio });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}