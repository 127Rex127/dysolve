import { useState } from 'react'
import { ReaderSettings, FocusWindowState, TTSState, FontFamily } from '../../types'
import { SoundId } from '../../utils/soundEngine'
import { Slider } from '../ui/Slider'
import { Toggle } from '../ui/Toggle'
import { Button } from '../ui/Button'
import { FontFamilyControl } from './FontFamilyControl'
import { BackgroundColorControl } from './BackgroundColorControl'
import { TTSControl } from './TTSControl'
import { SoundscapeControl } from './SoundscapeControl'
import { useLanguage } from '../../i18n'

interface ControlsSidebarProps {
  settings: ReaderSettings
  onUpdateSetting: <K extends keyof ReaderSettings>(key: K, value: ReaderSettings[K]) => void
  onResetSettings: () => void
  focusWindow: FocusWindowState
  onFocusWindowToggle: (enabled: boolean) => void
  onStripHeightChange: (h: number) => void
  ttsState: TTSState
  totalWords: number
  hasText: boolean
  onSpeak: () => void
  availableVoices: SpeechSynthesisVoice[]
  selectedVoiceURI: string
  onVoiceChange: (uri: string) => void
  activeSoundId: SoundId | null
  soundVolume: number
  onPlaySound: (id: SoundId) => void
  onStopSound: () => void
  onSoundVolume: (v: number) => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  boldModeEnabled: boolean
  onBoldModeToggle: (v: boolean) => void
  followTTS: boolean
  onFollowTTSToggle: (v: boolean) => void
  ttsRate: number
  onTtsRateChange: (v: number) => void
  displayText: string
  streak: number
  isOpen: boolean
  onToggleOpen: (open: boolean) => void
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-100 dark:border-slate-700 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sky-500">{icon}</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`text-slate-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  )
}

export function ControlsSidebar({
  settings,
  onUpdateSetting,
  onResetSettings,
  focusWindow,
  onFocusWindowToggle,
  onStripHeightChange,
  ttsState,
  totalWords,
  hasText,
  onSpeak,
  onPause,
  onResume,
  onStop,
  availableVoices,
  selectedVoiceURI,
  onVoiceChange,
  activeSoundId,
  soundVolume,
  onPlaySound,
  onStopSound,
  onSoundVolume,
  boldModeEnabled,
  onBoldModeToggle,
  followTTS,
  onFollowTTSToggle,
  ttsRate,
  onTtsRateChange,
  displayText,
  streak,
  isOpen,
  onToggleOpen,
}: ControlsSidebarProps) {
  const { t } = useLanguage()
  const s = t.sidebar
  const [copied, setCopied] = useState(false)

  function handleShare() {
    if (!displayText) return
    try {
      const encoded = btoa(encodeURIComponent(displayText))
      const url = `${window.location.origin}${window.location.pathname}#text=${encoded}`
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    } catch { /* ignore */ }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => onToggleOpen(!isOpen)}
        className={`fixed top-20 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-md rounded-l-xl p-2.5 transition-all duration-300 hover:bg-sky-50 dark:hover:bg-slate-700 ${
          isOpen ? 'right-80' : 'right-0'
        }`}
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
      >
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        >
          {isOpen ? (
            <polyline points="9 18 15 12 9 6"/>
          ) : (
            <polyline points="15 18 9 12 15 6"/>
          )}
        </svg>
      </button>

      {/* Sidebar panel */}
      <aside
        className={`fixed top-16 right-0 bottom-0 w-80 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 shadow-xl z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">
                🔥 {streak} {s.streakLabel ?? 'day streak'}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={onResetSettings} className="text-xs text-slate-400">
              {s.resetBtn}
            </Button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Text-to-Speech */}
          <Section
            title={s.ttsSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            }
          >
            <TTSControl
              ttsState={ttsState}
              hasText={hasText}
              totalWords={totalWords}
              availableVoices={availableVoices}
              selectedVoiceURI={selectedVoiceURI}
              onSpeak={onSpeak}
              onPause={onPause}
              onResume={onResume}
              onStop={onStop}
              onVoiceChange={onVoiceChange}
            />
            <Slider
              label={s.readingSpeed ?? 'Reading Speed'}
              value={ttsRate}
              min={0.5}
              max={2.0}
              step={0.05}
              displayValue={ttsRate === 1.0 ? (s.speedNormal ?? 'Normal') : ttsRate < 1.0 ? `${ttsRate.toFixed(2)}× ${s.speedSlow ?? 'Slow'}` : `${ttsRate.toFixed(2)}× ${s.speedFast ?? 'Fast'}`}
              onChange={onTtsRateChange}
            />
          </Section>

          {/* Focus Window */}
          <Section
            title={s.focusSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="8" width="18" height="8" rx="2"/>
              </svg>
            }
          >
            <Toggle
              checked={focusWindow.enabled}
              onChange={onFocusWindowToggle}
              label={s.enableFocus}
              description={s.focusDesc}
            />
            {focusWindow.enabled && (
              <>
                <Slider
                  label={s.stripHeight}
                  value={focusWindow.stripHeight}
                  min={40}
                  max={200}
                  step={5}
                  displayValue={`${focusWindow.stripHeight}px`}
                  onChange={onStripHeightChange}
                />
                <Toggle
                  checked={followTTS}
                  onChange={onFollowTTSToggle}
                  label={s.followVoice ?? 'Follow Voice'}
                  description={s.followVoiceDesc ?? 'Focus strip tracks the spoken word automatically'}
                />
              </>
            )}
            <Toggle
              checked={boldModeEnabled}
              onChange={onBoldModeToggle}
              label={s.boldMode ?? 'Bold Mode'}
              description={s.boldModeDesc ?? 'Click or highlight any word to bold it instantly'}
            />
            <Toggle
              checked={settings.bionicMode}
              onChange={(v) => onUpdateSetting('bionicMode', v)}
              label={s.bionicMode ?? 'Bionic Reading'}
              description={s.bionicModeDesc ?? 'Bold the first half of every word to guide the eye'}
            />
          </Section>

          {/* Font */}
          <Section
            title={s.fontSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 7 4 4 20 4 20 7"/>
                <line x1="9" y1="20" x2="15" y2="20"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
              </svg>
            }
          >
            <FontFamilyControl
              value={settings.fontFamily}
              onChange={(f: FontFamily) => onUpdateSetting('fontFamily', f)}
            />
          </Section>

          {/* Text Size */}
          <Section
            title={s.textSizeSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" opacity="0"/>
                <text x="2" y="18" fontSize="16" fill="currentColor" stroke="none" fontWeight="bold">A</text>
              </svg>
            }
          >
            {/* Quick size presets */}
            <div className="space-y-1.5">
              <p className="text-xs text-slate-400 font-medium">{s.fontPresetsLabel ?? 'Quick Size'}</p>
              <div className="flex gap-1.5">
                {([['S', 14], ['M', 18], ['L', 22], ['XL', 28]] as [string, number][]).map(([label, size]) => (
                  <button
                    key={label}
                    onClick={() => onUpdateSetting('fontSize', size)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      settings.fontSize === size
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Slider
              label={s.fontSizeLabel}
              value={settings.fontSize}
              min={12}
              max={48}
              step={1}
              displayValue={`${settings.fontSize}px`}
              onChange={(v) => onUpdateSetting('fontSize', v)}
            />
            <Slider
              label={s.lineHeightLabel}
              value={settings.lineHeight}
              min={1}
              max={3}
              step={0.1}
              displayValue={settings.lineHeight.toFixed(1)}
              onChange={(v) => onUpdateSetting('lineHeight', v)}
            />
            <Slider
              label={s.lineWidthLabel}
              value={settings.maxWidth}
              min={400}
              max={1200}
              step={20}
              displayValue={`${settings.maxWidth}px`}
              onChange={(v) => onUpdateSetting('maxWidth', v)}
            />
          </Section>

          {/* Spacing */}
          <Section
            title={s.spacingSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
            }
          >
            <Slider
              label={s.letterSpacingLabel}
              value={settings.letterSpacing}
              min={-0.05}
              max={0.3}
              step={0.01}
              displayValue={`${settings.letterSpacing.toFixed(2)}em`}
              onChange={(v) => onUpdateSetting('letterSpacing', v)}
            />
            <Slider
              label={s.wordSpacingLabel}
              value={settings.wordSpacing}
              min={0}
              max={0.5}
              step={0.01}
              displayValue={`${settings.wordSpacing.toFixed(2)}em`}
              onChange={(v) => onUpdateSetting('wordSpacing', v)}
            />
          </Section>

          {/* Ambient Sounds */}
          <Section
            title={s.soundsSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            }
            defaultOpen={true}
          >
            <SoundscapeControl
              activeSoundId={activeSoundId}
              volume={soundVolume}
              onPlay={onPlaySound}
              onStop={onStopSound}
              onVolumeChange={onSoundVolume}
            />
          </Section>

          {/* Background Colour */}
          <Section
            title={s.bgSection}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            }
          >
            <BackgroundColorControl
              value={settings.backgroundColor}
              onChange={(c) => onUpdateSetting('backgroundColor', c)}
            />
          </Section>

          {/* Print & Share */}
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              {s.printBtn ?? 'Print / Save as PDF'}
            </button>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-emerald-500">{s.linkCopied ?? 'Link copied!'}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  {s.shareLink ?? 'Share Link'}
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
