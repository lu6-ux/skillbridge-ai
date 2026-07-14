import { NextRequest, NextResponse } from "next/server";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { jobRole, interviewType, question, answer, stage } = await req.json();

    let prompt = "";

    if (stage === "get_questions") {
      prompt = `You are an interviewer for a ${jobRole} position in Sri Lanka.
      Generate 5 ${interviewType} interview questions for this role.
      Return ONLY a JSON array like this format:
      ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
      No other text, just the JSON array.`;
    } else if (stage === "evaluate_answer") {
      prompt = `You are an interviewer evaluating a candidate for ${jobRole} in Sri Lanka.
      
      Interview Question: ${question}
      Candidate's Answer: ${answer}
      
      Evaluate the answer and provide:
      1. ⭐ SCORE - rate the answer out of 10
      2. ✅ WHAT WAS GOOD - specific positive points
      3. ❌ WHAT TO IMPROVE - specific areas to improve
      4. 💡 IDEAL ANSWER HINT - brief hint about what a great answer includes
      
      Be constructive and encouraging.`;
    } else if (stage === "final_feedback") {
      prompt = `You are an interviewer who just finished interviewing a ${jobRole} candidate in Sri Lanka.
      
      Overall scores: ${answer}
      
      Give a final interview performance report:
      1. 🎯 OVERALL SCORE - average out of 10
      2. 💪 STRONGEST POINTS - what they did well overall
      3. 📈 AREAS TO IMPROVE - main weaknesses
      4. 🚀 NEXT STEPS - 3 specific things to practice before next interview
      5. ✅ VERDICT - Ready to interview / Need more practice / Not ready yet`;
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
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