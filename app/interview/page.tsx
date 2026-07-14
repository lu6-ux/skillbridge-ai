"use client";
import { useState } from "react";

export default function InterviewPage() {
  const [stage, setStage] = useState<"setup" | "interview" | "finished">("setup");
  const [jobRole, setJobRole] = useState("");
  const [interviewType, setInterviewType] = useState("HR");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [scores, setScores] = useState<string[]>([]);
  const [finalReport, setFinalReport] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (!jobRole) return;
    setLoading(true);

    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobRole,
        interviewType,
        stage: "get_questions",
      }),
    });

    const data = await res.json();
    if (data.error) {
      alert("Error: " + data.error);
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(data.result);
      setQuestions(parsed);
      setStage("interview");
    } catch {
      const lines = data.result.split("\n").filter((l: string) => l.trim());
      setQuestions(lines.slice(0, 5));
      setStage("interview");
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setFeedback("");

    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobRole,
        interviewType,
        question: questions[currentQ],
        answer,
        stage: "evaluate_answer",
      }),
    });

    const data = await res.json();
    setFeedback(data.result);

    const scoreMatch = data.result.match(/(\d+)\/10/);
    if (scoreMatch) {
      setScores(prev => [...prev, `Q${currentQ + 1}: ${scoreMatch[0]}`]);
    }
    setLoading(false);
  };

  const nextQuestion = async () => {
    if (currentQ + 1 >= questions.length) {
      setLoading(true);
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole,
          stage: "final_feedback",
          answer: scores.join(", "),
        }),
      });
      const data = await res.json();
      setFinalReport(data.result);
      setStage("finished");
      setLoading(false);
    } else {
      setCurrentQ(prev => prev + 1);
      setAnswer("");
      setFeedback("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">
        Mock Interview Simulator
      </h1>
      <p className="text-center text-blue-200 mb-10">
        Practice real interview questions and get AI feedback
      </p>

      {/* SETUP STAGE */}
      {stage === "setup" && (
        <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Job Role</label>
            <input
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
              placeholder="e.g. Software Engineer, Data Analyst, UI/UX Designer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-blue-200 mb-1">Interview Type</label>
            <select
              className="w-full bg-slate-800 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="HR">HR Interview</option>
              <option value="Technical">Technical Interview</option>
              <option value="Behavioral">Behavioral Interview</option>
            </select>
          </div>

          <button
            onClick={startInterview}
            disabled={loading || !jobRole}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Preparing questions..." : "Start Interview 🎤"}
          </button>
        </div>
      )}

      {/* INTERVIEW STAGE */}
      {stage === "interview" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex justify-between text-sm text-blue-200 mb-2">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>{jobRole} — {interviewType} Interview</span>
            </div>
            <div className="bg-white/10 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <p className="text-sm text-blue-300 mb-2">Question {currentQ + 1}:</p>
            <p className="text-lg font-medium text-white">
              {questions[currentQ]}
            </p>
          </div>

          {!feedback && (
            <div className="bg-white/10 rounded-2xl p-6 space-y-4">
              <label className="block text-sm text-blue-200">Your Answer:</label>
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-32 resize-none"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                onClick={submitAnswer}
                disabled={loading || !answer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Evaluating your answer..." : "Submit Answer ✅"}
              </button>
            </div>
          )}

          {feedback && (
            <div className="bg-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-blue-400">AI Feedback:</h3>
              <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
                {feedback}
              </pre>
              <button
                onClick={nextQuestion}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Loading..." : currentQ + 1 >= questions.length ? "Get Final Report 📊" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* FINISHED STAGE */}
      {stage === "finished" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Interview Complete! 🎉
            </h2>
            <pre className="text-blue-100 whitespace-pre-wrap text-sm leading-relaxed">
              {finalReport}
            </pre>
          </div>
          <button
            onClick={() => {
              setStage("setup");
              setQuestions([]);
              setCurrentQ(0);
              setAnswer("");
              setFeedback("");
              setScores([]);
              setFinalReport("");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            Practice Again 🔄
          </button>
        </div>
      )}

    </main>
  );
}