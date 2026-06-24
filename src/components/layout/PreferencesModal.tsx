import { ReaderSettings, FontFamily } from '../../types'
import { FontFamilyControl } from '../controls/FontFamilyControl'
import { BackgroundColorControl } from '../controls/BackgroundColorControl'
import { Slider } from '../ui/Slider'
import { LanguageSelector } from './LanguageSelector'
import { useLanguage } from '../../i18n'

interface PreferencesModalProps {
  settings: ReaderSettings
  onUpdateSetting: <K extends keyof ReaderSettings>(key: K, value: ReaderSettings[K]) => void
  onResetSettings: () => void
  onClose: () => void
  isDark: boolean
  onToggleDark: (v: boolean) => void
}

export function PreferencesModal({ settings, onUpdateSetting, onResetSettings, onClose, isDark: _isDark, onToggleDark: _onToggleDark }: PreferencesModalProps) {
  const { t } = useLanguage()
  const s = t.sidebar

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">{s.preferencesTitle ?? 'Reading Preferences'}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onResetSettings}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {s.resetBtn}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Close preferences"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">

          {/* Language */}
          <section>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{s.languageSection ?? 'Language'}</p>
            <LanguageSelector />
          </section>

          {/* Font */}
          <section>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{s.fontSection}</p>
            <FontFamilyControl
              value={settings.fontFamily}
              onChange={(f: FontFamily) => onUpdateSetting('fontFamily', f)}
            />
          </section>

          {/* Text Size */}
          <section>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{s.textSizeSection}</p>
            <div className="space-y-3">
              <Slider
                label={s.fontSizeLabel}
                value={settings.fontSize}
                min={12} max={48} step={1}
                displayValue={`${settings.fontSize}px`}
                onChange={(v) => onUpdateSetting('fontSize', v)}
              />
              <Slider
                label={s.lineHeightLabel}
                value={settings.lineHeight}
                min={1} max={3} step={0.1}
                displayValue={settings.lineHeight.toFixed(1)}
                onChange={(v) => onUpdateSetting('lineHeight', v)}
              />
              <Slider
                label={s.lineWidthLabel}
                value={settings.maxWidth}
                min={400} max={1200} step={20}
                displayValue={`${settings.maxWidth}px`}
                onChange={(v) => onUpdateSetting('maxWidth', v)}
              />
            </div>
          </section>

          {/* Spacing */}
          <section>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{s.spacingSection}</p>
            <div className="space-y-3">
              <Slider
                label={s.letterSpacingLabel}
                value={settings.letterSpacing}
                min={-0.05} max={0.3} step={0.01}
                displayValue={`${settings.letterSpacing.toFixed(2)}em`}
                onChange={(v) => onUpdateSetting('letterSpacing', v)}
              />
              <Slider
                label={s.wordSpacingLabel}
                value={settings.wordSpacing}
                min={0} max={0.5} step={0.01}
                displayValue={`${settings.wordSpacing.toFixed(2)}em`}
                onChange={(v) => onUpdateSetting('wordSpacing', v)}
              />
            </div>
          </section>

          {/* Background Colour */}
          <section>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{s.bgSection}</p>
            <BackgroundColorControl
              value={settings.backgroundColor}
              onChange={(c) => onUpdateSetting('backgroundColor', c)}
            />
          </section>

          {/* Resources */}
          <section className="pb-2">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{t.nav.resources}</p>
            <a
              href="https://www.bdadyslexia.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">British Dyslexia Association</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">bdadyslexia.org.uk</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600 shrink-0">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
