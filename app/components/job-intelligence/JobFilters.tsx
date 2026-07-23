import { District, JobFilterOption } from "@/app/data/sriLankaJobIntelligence";

interface JobFiltersProps {
  province: string;
  district: string;
  mode: string;
  type: string;
  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  provinceOptions: JobFilterOption[];
  districtOptions: JobFilterOption[];
  modeOptions: JobFilterOption[];
  typeOptions: JobFilterOption[];
}

export function JobFilters({
  province,
  district,
  mode,
  type,
  onProvinceChange,
  onDistrictChange,
  onModeChange,
  onTypeChange,
  provinceOptions,
  districtOptions,
  modeOptions,
  typeOptions,
}: JobFiltersProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-4">
      <label className="text-sm text-slate-600">
        <span className="mb-1 block font-medium">Province</span>
        <select value={province} onChange={(e) => onProvinceChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {provinceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <label className="text-sm text-slate-600">
        <span className="mb-1 block font-medium">District</span>
        <select value={district} onChange={(e) => onDistrictChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {districtOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <label className="text-sm text-slate-600">
        <span className="mb-1 block font-medium">Work Mode</span>
        <select value={mode} onChange={(e) => onModeChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {modeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <label className="text-sm text-slate-600">
        <span className="mb-1 block font-medium">Job Type</span>
        <select value={type} onChange={(e) => onTypeChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
