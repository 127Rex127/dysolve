import { COLOR_PRESETS } from '../../utils/colorPresets'
import { useLanguage } from '../../i18n'

interface BackgroundColorControlProps {
  value: string
  onChange: (color: string) => void
}

export function BackgroundColorControl({ value, onChange }: BackgroundColorControlProps) {
  const { t } = useLanguage()
  return (
    <div className="space-y-3">
      {/* Preset swatches */}
      <div className="flex flex-wrap gap-2">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            title={preset.label}
            className={`w-9 h-9 rounded-xl border-2 transition-all hover:scale-105 ${
              value === preset.value
                ? 'border-sky-400 ring-2 ring-sky-300 ring-offset-1'
                : 'border-slate-200'
            }`}
            style={{ backgroundColor: preset.value }}
            aria-label={preset.label}
          />
        ))}
      </div>

      {/* Custom colour picker */}
      <div className="flex items-center gap-3">
        <label className="text-xs text-slate-500 font-medium">{t.sidebar.customColorLabel ?? 'Custom:'}</label>
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white"
            title={t.sidebar.customColorTitle ?? 'Pick a custom background colour'}
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">{value}</span>
      </div>
    </div>
  )
}
