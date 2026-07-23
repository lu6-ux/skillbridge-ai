interface CompanyCardProps {
  name: string;
  industry: string;
  openPositions: number;
  hiringStatus: string;
  logo: string;
  isSaved: boolean;
  onSave: () => void;
}

export function CompanyCard({ name, industry, openPositions, hiringStatus, logo, isSaved, onSave }: CompanyCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {logo}
        </div>
        <button onClick={onSave} className={`rounded-full px-2.5 py-1 text-xs ${isSaved ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
      <h4 className="mt-3 font-semibold text-slate-900">{name}</h4>
      <p className="text-sm text-slate-500">{industry}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span>{openPositions} open roles</span>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">{hiringStatus}</span>
      </div>
    </div>
  );
}
