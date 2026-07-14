export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SkillBridge <span className="text-blue-600">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="/roadmap" className="text-sm text-gray-600 hover:text-blue-600 transition">Roadmap</a>
          <a href="/skillgap" className="text-sm text-gray-600 hover:text-blue-600 transition">Skill Gap</a>
          <a href="/readiness" className="text-sm text-gray-600 hover:text-blue-600 transition">Readiness</a>
          <a href="/portfolio" className="text-sm text-gray-600 hover:text-blue-600 transition">Portfolio</a>
          <a href="/progress" className="text-sm text-gray-600 hover:text-blue-600 transition">Progress</a>
          <a href="/interview" className="text-sm text-gray-600 hover:text-blue-600 transition">Interview</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition font-medium">Sign in</a>
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          Built for Sri Lankan University Students
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your AI-Powered
          <span className="text-blue-600"> Career Coach</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get personalized career roadmaps, identify skill gaps, build your portfolio, 
          and prepare for internships — all powered by AI.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition shadow-sm">
            Start for Free →
          </a>
          <a href="/roadmap" className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-8 py-3 rounded-lg text-base font-medium transition">
            Try Career Roadmap
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required · Free to use</p>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "93%", label: "Students would use SkillBridge AI" },
            { value: "6+", label: "AI-powered career features" },
            { value: "8", label: "Universities represented" },
            { value: "Free", label: "To get started" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to launch your career
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From your first CV to your first job offer — SkillBridge AI guides you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Career Roadmap", desc: "Get a personalized step-by-step plan from your degree to your dream job.", icon: "🗺️", href: "/roadmap", tag: "Most Popular" },
            { title: "Skill Gap Analysis", desc: "See exactly which skills you need to get hired for your target role.", icon: "🔍", href: "/skillgap", tag: "" },
            { title: "Career Readiness Score", desc: "Get a 0–100 score showing how job-ready you are with actionable tips.", icon: "🏆", href: "/readiness", tag: "" },
            { title: "Portfolio Builder", desc: "AI writes your professional portfolio based on your projects and skills.", icon: "💼", href: "/portfolio", tag: "" },
            { title: "Progress Tracker", desc: "Track your skill development and career milestones visually.", icon: "📈", href: "/progress", tag: "" },
            { title: "Mock Interview", desc: "Practice with AI-generated questions and get instant feedback.", icon: "🎤", href: "/interview", tag: "New" },
            { title: "Internship Readiness", desc: "Paste any job description and see your match percentage instantly.", icon: "🎓", href: "/internship", tag: "" },
          ].map((feature, i) => (
            <a key={i} href={feature.href} className="group border border-gray-200 hover:border-blue-500 rounded-xl p-6 transition cursor-pointer hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{feature.icon}</span>
                {feature.tag && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${feature.tag === "New" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {feature.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500">Get career-ready in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us about yourself", desc: "Enter your university, field of study, and career goals. Takes less than 2 minutes.", icon: "👤" },
              { step: "02", title: "Get AI-powered insights", desc: "Our AI analyzes your profile and generates personalized career guidance instantly.", icon: "🤖" },
              { step: "03", title: "Take action and grow", desc: "Follow your roadmap, track progress, and practice interviews to land your dream job.", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <p className="text-blue-600 font-bold text-sm mb-2">STEP {item.step}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="bg-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to bridge the gap?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of Sri Lankan students using SkillBridge AI to launch their careers.
          </p>
          <a href="/login" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-base font-semibold transition inline-block">
            Get Started for Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">SkillBridge AI</span>
          </div>
          <p className="text-sm text-gray-400">Built for Sri Lankan students · YGC 15 · 2026</p>
          <div className="flex gap-6">
            <a href="/roadmap" className="text-sm text-gray-400 hover:text-blue-600 transition">Roadmap</a>
            <a href="/skillgap" className="text-sm text-gray-400 hover:text-blue-600 transition">Skill Gap</a>
            <a href="/interview" className="text-sm text-gray.400 hover:text-blue-600 transition">Interview</a>
          </div>
        </div>
      </footer>

    </main>
  );
}