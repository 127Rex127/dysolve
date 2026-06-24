import { useLanguage } from '../../i18n'

interface ShortcutsModalProps {
  onClose: () => void
}

export function ShortcutsModal({ onClose }: ShortcutsModalProps) {
  const { t } = useLanguage()
  const s = t.sidebar

  const shortcuts = [
    { keys: ['Space'], desc: s.shortcutPlayPause ?? 'Play / Pause text-to-speech' },
    { keys: ['Esc'], desc: s.shortcutStop ?? 'Stop text-to-speech' },
    { keys: ['?'], desc: s.shortcutHelp ?? 'Show this shortcuts panel' },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h8"/>
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{s.shortcutsTitle ?? 'Keyboard Shortcuts'}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="px-6 py-4 space-y-3">
          {shortcuts.map((sc) => (
            <div key={sc.desc} className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">{sc.desc}</span>
              <div className="flex items-center gap-1 shrink-0">
                {sc.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 font-mono shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">{s.shortcutsNote ?? 'Shortcuts work when not typing in a text field.'}</p>
        </div>
      </div>
    </div>
  )
}
