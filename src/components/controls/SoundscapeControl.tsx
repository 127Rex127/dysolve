import { SoundId, SOUNDS } from '../../utils/soundEngine'
import { Slider } from '../ui/Slider'
import { useLanguage } from '../../i18n'

interface SoundscapeControlProps {
  activeSoundId: SoundId | null
  volume: number
  onPlay: (id: SoundId) => void
  onStop: () => void
  onVolumeChange: (v: number) => void
  error?: string | null
}

export function SoundscapeControl({
  activeSoundId,
  volume,
  onPlay,
  onStop,
  onVolumeChange,
  error,
}: SoundscapeControlProps) {
  const { t } = useLanguage()
  const s = t.sidebar

  return (
    <div className="space-y-4">
      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          {error}
        </div>
      )}

      {/* Sound grid */}
      <div className="grid grid-cols-2 gap-2">
        {SOUNDS.map((sound) => {
          const active = activeSoundId === sound.id
          const soundLabel = t.sounds?.[sound.id]?.label ?? sound.label
          const soundDesc = t.sounds?.[sound.id]?.desc ?? sound.desc
          return (
            <button
              key={sound.id}
              onClick={() => onPlay(sound.id)}
              title={soundDesc}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left
                transition-all duration-150 group
                ${active
                  ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/30 ring-1 ring-sky-300 dark:ring-sky-700 shadow-sm'
                  : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:bg-sky-50/50 dark:hover:bg-sky-900/20'
                }
              `}
            >
              <span className="text-base leading-none">{sound.emoji}</span>
              <span className={`text-xs font-medium leading-tight ${active ? 'text-sky-700 dark:text-sky-300' : 'text-slate-600 dark:text-slate-300'}`}>
                {soundLabel}
              </span>
              {active && (
                <span className="ml-auto flex gap-0.5 items-end shrink-0">
                  {[3, 5, 4, 6, 3].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-sky-400 rounded-full animate-bounce"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Volume */}
      <Slider
        label={s.volumeLabel}
        value={volume}
        min={0}
        max={1}
        step={0.01}
        displayValue={`${Math.round(volume * 100)}%`}
        onChange={onVolumeChange}
      />

      {/* Stop button */}
      {activeSoundId && (
        <button
          onClick={onStop}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
          </svg>
          {s.stopSoundBtn}
        </button>
      )}
    </div>
  )
}
