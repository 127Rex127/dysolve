import { FocusWindowState } from '../../types'
import { useLanguage } from '../../i18n'

interface FocusWindowProps {
  focusWindow: FocusWindowState
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void
}

export function FocusWindow({ focusWindow, onDragStart }: FocusWindowProps) {
  const { t } = useLanguage()
  if (!focusWindow.enabled) return null

  const { yPosition, stripHeight } = focusWindow

  return (
    <>
      {/* Top overlay */}
      <div
        className="fixed left-0 right-0 z-30 pointer-events-none"
        style={{ top: 0, height: yPosition, background: 'rgba(0,0,0,0.6)' }}
        aria-hidden="true"
      />

      {/* Reading strip — just the border lines, no pointer-events */}
      <div
        className="fixed left-0 right-0 z-30 pointer-events-none"
        style={{ top: yPosition, height: stripHeight }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-sky-400/70" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-400/70" />
      </div>

      {/* Bottom overlay */}
      <div
        className="fixed left-0 right-0 bottom-0 z-30 pointer-events-none"
        style={{ top: yPosition + stripHeight, background: 'rgba(0,0,0,0.6)' }}
        aria-hidden="true"
      />

      {/* Drag handle — separate fixed element at z-50, sitting in the right
          margin between the content area and the sidebar (right: 20rem + 8px) */}
      <div
        className="fixed z-50 pointer-events-auto"
        style={{
          top: yPosition + stripHeight / 2,
          right: 'calc(20rem + 8px)',
          transform: 'translateY(-50%)',
          cursor: 'ns-resize',
        }}
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
        role="slider"
        aria-label="Focus window position"
        aria-orientation="vertical"
        tabIndex={0}
      >
        <div className="bg-sky-500/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-1.5 shadow-xl hover:bg-sky-600/90 active:scale-95 transition-all select-none">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="7 11 12 6 17 11"/>
            <polyline points="7 17 12 22 17 17"/>
          </svg>
          <span className="text-white text-xs font-semibold">{t.sidebar.dragHandle ?? 'Drag'}</span>
        </div>
      </div>
    </>
  )
}
