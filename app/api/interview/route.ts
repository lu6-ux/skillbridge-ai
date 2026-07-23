import { NextRequest, NextResponse } from "next/server";
import { GROQ_API_KEY as CONFIG_KEY } from "../../lib/config";

const GROQ_API_KEY = CONFIG_KEY || process.env.GROQ_API_KEY || "";

function buildFallbackQuestions(jobRole: string, interviewType: string) {
  return [
    `Tell me about yourself and why you are interested in a ${jobRole} role.`,
    `Describe a project or experience that shows your strength for ${jobRole}.`,
    `How would you handle a challenge or mistake during your first month in this role?`,
    `What skills do you think are most important for a ${interviewType} ${jobRole} position?`,
    `Why should we hire you for this ${jobRole} opportunity?`,
  ];
}

function buildFallbackEvaluation(question: string, answer: string) {
  return `⭐ SCORE - 7/10

✅ WHAT WAS GOOD
- Your answer was clear and structured.
- You shared relevant experience and showed effort.

❌ WHAT TO IMPROVE
- Add more specific examples.
- Mention measurable results when possible.
- Connect your answer directly to the role requirements.

💡 IDEAL ANSWER HINT
Focus on a strong example, explain your actions, and finish with the result.`;
}

function buildFallbackFeedback() {
  return `🎯 OVERALL SCORE - 7.5/10

💪 STRONGEST POINTS
- Clear communication
- Good preparation and effort

📈 AREAS TO IMPROVE
- More specific examples
- Stronger confidence in technical answers

🚀 NEXT STEPS
1. Practice 5 common questions daily.
2. Prepare 2 STAR examples.
3. Review one role description before each interview.

✅ VERDICT
Need more practice before the next interview.`;
}

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

    if (!GROQ_API_KEY) {
      if (stage === "get_questions") {
        return NextResponse.json({ result: JSON.stringify(buildFallbackQuestions(jobRole, interviewType)) });
      }
      if (stage === "evaluate_answer") {
        return NextResponse.json({ result: buildFallbackEvaluation(question, answer) });
      }
      return NextResponse.json({ result: buildFallbackFeedback() });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      if (stage === "get_questions") {
        return NextResponse.json({ result: JSON.stringify(buildFallbackQuestions(jobRole, interviewType)), error }, { status: 200 });
      }
      if (stage === "evaluate_answer") {
        return NextResponse.json({ result: buildFallbackEvaluation(question, answer), error }, { status: 200 });
      }
      return NextResponse.json({ result: buildFallbackFeedback(), error }, { status: 200 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ result: "", error: String(error) }, { status: 200 });
  }
}