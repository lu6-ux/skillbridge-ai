import { SkillDemandItem } from "@/app/data/sriLankaJobIntelligence";

interface SkillDemandChartProps {
  skills: SkillDemandItem[];
}

export function SkillDemandChart({ skills }: SkillDemandChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Top In-Demand Skills</h3>
      <div className="mt-4 space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{skill.name}</span>
              <span className="text-slate-500">{skill.popularity}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${skill.popularity}%` }} />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span>Trend: {skill.trend}</span>
              <span>Demand: {skill.monthlyDemand[skill.monthlyDemand.length - 1]}x</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
