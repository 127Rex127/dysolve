interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  displayValue: string
  onChange: (value: number) => void
}

export function Slider({ label, value, min, max, step, displayValue, onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md min-w-[3.5rem] text-center">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer slider-thumb"
        aria-label={label}
      />
    </div>
  )
}
