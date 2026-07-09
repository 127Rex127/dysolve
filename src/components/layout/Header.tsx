import { useLanguage } from '../../i18n'
import { LanguageSelector } from './LanguageSelector'

interface HeaderProps {
  hasText: boolean
  onShowInput: () => void
  onHome: () => void
  onScreening: () => void
  onTests: () => void
  onOpenPreferences: () => void
  isDark: boolean
  onToggleDark: (v: boolean) => void
  onShowShortcuts: () => void
}

export function Header({ hasText, onShowInput, onHome, onScreening, onTests, onOpenPreferences, isDark, onToggleDark, onShowShortcuts }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/95 border-b border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <button
          onClick={onHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Go to home page"
        >
          <img
            src={import.meta.env.BASE_URL + 'Logo.jpg'}
            alt="Dysolve logo"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-200 shadow-md shrink-0"
          />
          <span className="text-lg sm:text-xl font-bold text-blue-900 dark:text-sky-400 tracking-tight truncate">Dysolve</span>
          <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {t.nav.tagline ?? 'Dyslexia-Friendly Reader'}
          </span>
        </button>

        <nav className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Start Reading button — always visible */}
          <button
            onClick={onShowInput}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-3 py-1.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            {hasText ? (t.nav.loadText ?? 'Load New Text') : (t.hero?.cta1 ?? 'Start Reading')}
          </button>
          <button
            onClick={onScreening}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/40"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            {t.nav.screening}
          </button>
          <button
            onClick={onTests}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 px-3 py-1.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <path d="M9 12h6M9 16h4"/>
            </svg>
            <span className="hidden sm:inline">{t.nav.allTests ?? 'All Tests'}</span>
          </button>
          <LanguageSelector />
          {/* Keyboard shortcuts — desktop only */}
          <button
            onClick={onShowShortcuts}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 font-semibold text-sm"
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            ?
          </button>
          {/* Dark mode toggle */}
          <button
            onClick={() => onToggleDark(!isDark)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? (t.nav.lightMode ?? 'Light mode') : (t.nav.darkMode ?? 'Dark mode')}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            onClick={onOpenPreferences}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
            aria-label="Open preferences"
            title={t.nav.preferencesBtn ?? 'Preferences'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
