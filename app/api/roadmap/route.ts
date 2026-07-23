import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
console.log("API KEY CHECK:", GROQ_API_KEY?.slice(0, 8));

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return NextResponse.json(
        { error: "Groq API key is missing" },
        { status: 500 }
      );
    }

    const { university, field, goal } = await req.json();

    if (!university || !field || !goal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an expert career advisor helping Sri Lankan university students.",
            },
            {
              role: "user",
              content: `
Create a career roadmap for this student:

University: ${university}
Field of Study: ${field}
Career Goal: ${goal}

Generate a practical 5-step roadmap.

For each step include:
1. Step title
2. What the student should do
3. Expected timeline
4. Skills or tools to learn

Make it clear and beginner-friendly.
              `,
            },
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Groq API Error:", errorText);

      return NextResponse.json(
        {
          error: "Groq API request failed",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const roadmap =
      data?.choices?.[0]?.message?.content ||
      "No roadmap generated.";

    return NextResponse.json({
      roadmap,
    });

  } catch (error) {
    console.error("Roadmap API Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}