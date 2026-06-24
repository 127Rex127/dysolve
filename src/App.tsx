import { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from './i18n'
import { useReaderSettings } from './hooks/useReaderSettings'
import { useTTS } from './hooks/useTTS'
import { useFocusWindow } from './hooks/useFocusWindow'
import { useAmbientSound } from './hooks/useAmbientSound'
import { useRecentTexts } from './hooks/useRecentTexts'
import { recordReading, getStreak } from './hooks/useReadingStreak'
import { Header } from './components/layout/Header'
import { PreferencesModal } from './components/layout/PreferencesModal'
import { ShortcutsModal } from './components/layout/ShortcutsModal'
import { HeroSection } from './components/layout/HeroSection'
import { ReadingProgress } from './components/reader/ReadingProgress'
import { TextInputPanel } from './components/input/TextInputPanel'
import { ReaderView } from './components/reader/ReaderView'
import { FlashcardView } from './components/reader/FlashcardView'
import { FocusWindow } from './components/reader/FocusWindow'
import { ControlsSidebar } from './components/controls/ControlsSidebar'
import { ScreeningTest } from './components/screening/ScreeningTest'
import { PersonalisedPlan } from './components/screening/PersonalisedPlan'
import { AllTestsHub } from './components/tests/AllTestsHub'
import type { ScreeningResult } from './utils/screeningScorer'
import type { ReaderSettings } from './types'

type View = 'hero' | 'input' | 'reader' | 'screening' | 'plan' | 'tests'

function AppInner() {
  const { t } = useLanguage()
  const [view, setView] = useState<View>('hero')
  const [displayText, setDisplayText] = useState('')
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(null)
  const [boldedWords, setBoldedWords] = useState<Map<number, string>>(new Map())
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [boldModeEnabled, setBoldModeEnabled] = useState(false)
  const [followTTS, setFollowTTS] = useState(false)
  const [ttsRate, setTtsRate] = useState(0.88)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('readease-dark') === '1')
  const [streak, setStreak] = useState(() => getStreak())

  const { recent, addRecent, removeRecent } = useRecentTexts()

  // Apply / remove dark class on document root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('readease-dark', isDark ? '1' : '0')
  }, [isDark])

  // URL hash — load shared text on mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#text=')) {
      try {
        const text = decodeURIComponent(atob(hash.slice(6)))
        if (text.trim()) {
          setDisplayText(text.trim())
          setView('reader')
          window.history.replaceState(null, '', window.location.pathname)
        }
      } catch { /* ignore malformed hash */ }
    }
  }, [])

  // Bookmarking — save scroll position when leaving reader
  useEffect(() => {
    return () => {
      if (view === 'reader' && displayText) {
        const key = 'readease-pos-' + displayText.slice(0, 80)
        localStorage.setItem(key, String(Math.round(window.scrollY)))
      }
    }
  }, [view, displayText])

  // Bookmarking — restore scroll position when entering reader
  useEffect(() => {
    if (view === 'reader' && displayText) {
      const key = 'readease-pos-' + displayText.slice(0, 80)
      const saved = localStorage.getItem(key)
      if (saved && parseInt(saved) > 100) {
        const y = parseInt(saved)
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
      }
    }
  }, [view, displayText])

  const { settings, updateSetting, resetSettings } = useReaderSettings()
  const {
    speak, pause, resume, stop, ttsState, totalWords,
    availableVoices, selectedVoiceURI, setVoiceURI,
  } = useTTS(displayText, t.ttsLangCode, ttsRate)
  const { focusWindow, setEnabled, setStripHeight, setYPosition, handleDragStart } = useFocusWindow()
  const { activeSoundId, volume: soundVolume, play: playSound, stop: stopSound, setVolume: setSoundVolume } = useAmbientSound()

  // Keyboard shortcuts: Space = play/pause TTS, Escape = stop, ? = shortcuts modal
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      // ? — shortcuts modal (any view, not typing)
      if (e.key === '?' && !isTyping) {
        setShowShortcuts((s) => !s)
        return
      }

      if (view !== 'reader' || isTyping) return

      if (e.code === 'Space') {
        e.preventDefault()
        if (ttsState.isPlaying && !ttsState.isPaused) pause()
        else if (ttsState.isPaused) resume()
        else speak()
      }
      if (e.code === 'Escape') stop()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [view, ttsState, speak, pause, resume, stop])

  const wordCount = displayText ? displayText.trim().split(/\s+/).filter(Boolean).length : 0
  const readingMinutes = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 150)) : 0

  function handleTextLoaded(text: string) {
    setDisplayText(text)
    addRecent(text)
    setStreak(recordReading())
    stop()
    setView('reader')
  }

  // Follow TTS — move focus window to the current spoken word's position
  useEffect(() => {
    if (!followTTS || !focusWindow.enabled || ttsState.currentWordIndex == null) return
    const el = document.querySelector(`[data-word-index="${ttsState.currentWordIndex}"]`)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const targetY = rect.top - focusWindow.stripHeight / 2 + rect.height / 2
    setYPosition(targetY)
  }, [ttsState.currentWordIndex, followTTS, focusWindow.enabled, focusWindow.stripHeight, setYPosition])

  function handleToggleBold(index: number, word: string) {
    setBoldedWords((prev) => {
      const next = new Map(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.set(index, word)
      }
      return next
    })
  }

  function handleScreeningComplete(result: ScreeningResult) {
    setScreeningResult(result)
    setView('plan')
  }

  function handleApplyPlanSettings(planSettings: Partial<ReaderSettings>) {
    for (const [key, value] of Object.entries(planSettings)) {
      updateSetting(key as keyof ReaderSettings, value as ReaderSettings[keyof ReaderSettings])
    }
  }

  function handleStartReading() {
    setView(displayText ? 'reader' : 'input')
  }

  return (
    <div
      className="min-h-screen font-sans dark:bg-slate-900"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}${isDark ? 'dark_background.jpg' : 'background.jpg'}')`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}
    >
      <Header
        hasText={!!displayText}
        onShowInput={() => setView('input')}
        onHome={() => setView('hero')}
        onScreening={() => setView('screening')}
        onTests={() => setView('tests')}
        onOpenPreferences={() => setShowPreferences(true)}
        isDark={isDark}
        onToggleDark={setIsDark}
        onShowShortcuts={() => setShowShortcuts(true)}
      />

      {view === 'hero' && (
        <HeroSection
          onGetStarted={() => setView('input')}
          onScreening={() => setView('screening')}
          onTests={() => setView('tests')}
        />
      )}

      {view === 'input' && (
        <TextInputPanel
          onTextLoaded={handleTextLoaded}
          onDismiss={displayText ? () => setView('reader') : undefined}
          hasText={!!displayText}
          ocrLang={t.ocrLang}
          recent={recent}
          onRemoveRecent={removeRecent}
        />
      )}

      {view === 'screening' && (
        <ScreeningTest
          onDone={() => setView(displayText ? 'reader' : 'input')}
          onViewPlan={handleScreeningComplete}
        />
      )}

      {view === 'plan' && screeningResult && (
        <PersonalisedPlan
          result={screeningResult}
          onApplySettings={handleApplyPlanSettings}
          onStartReading={handleStartReading}
        />
      )}

      {view === 'tests' && (
        <AllTestsHub onBack={() => setView(displayText ? 'reader' : 'hero')} />
      )}

      {view === 'reader' && <ReadingProgress />}

      {view === 'reader' && wordCount > 0 && (
        <div className={`fixed top-[4.25rem] left-0 z-30 flex justify-end px-8 py-1 pointer-events-none transition-all duration-300 ${sidebarOpen ? 'right-80' : 'right-0'}`}>
          <span className="text-xs text-slate-400 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {wordCount.toLocaleString()} {t.sidebar.wordsLabel ?? 'words'} · ~{readingMinutes} {t.sidebar.minLabel ?? 'min'}
          </span>
        </div>
      )}

      {view === 'reader' && (
        <div data-testid="reader-container" className={`transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
          <ReaderView
            text={displayText}
            settings={settings}
            ttsState={ttsState}
            boldedWords={boldedWords}
            onToggleBold={handleToggleBold}
            boldModeEnabled={boldModeEnabled}
          />
        </div>
      )}

      {/* Flashcard trigger button */}
      {view === 'reader' && boldedWords.size > 0 && !showFlashcards && (
        <button
          onClick={() => setShowFlashcards(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-full shadow-lg font-semibold text-sm hover:bg-amber-600 transition-all hover:scale-105 active:scale-95"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          {t.sidebar.flashcardBtn ?? 'Create Flashcards'} ({boldedWords.size} {t.sidebar.wordsLabel ?? 'word'}{boldedWords.size > 1 ? 's' : ''})
        </button>
      )}

      {/* Flashcard view overlay */}
      {showFlashcards && (
        <FlashcardView
          boldedWords={boldedWords}
          sourceLang={t.ttsLangCode}
          onClose={() => setShowFlashcards(false)}
        />
      )}

      <FocusWindow focusWindow={focusWindow} onDragStart={handleDragStart} />

      {showPreferences && (
        <PreferencesModal
          settings={settings}
          onUpdateSetting={updateSetting}
          onResetSettings={resetSettings}
          onClose={() => setShowPreferences(false)}
          isDark={isDark}
          onToggleDark={setIsDark}
        />
      )}

      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}

      {view === 'reader' && (
        <ControlsSidebar
          settings={settings}
          onUpdateSetting={updateSetting}
          onResetSettings={resetSettings}
          focusWindow={focusWindow}
          onFocusWindowToggle={setEnabled}
          onStripHeightChange={setStripHeight}
          ttsState={ttsState}
          totalWords={totalWords}
          hasText={!!displayText}
          onSpeak={speak}
          onPause={pause}
          onResume={resume}
          onStop={stop}
          availableVoices={availableVoices}
          selectedVoiceURI={selectedVoiceURI}
          onVoiceChange={setVoiceURI}
          activeSoundId={activeSoundId}
          soundVolume={soundVolume}
          onPlaySound={playSound}
          onStopSound={stopSound}
          onSoundVolume={setSoundVolume}
          boldModeEnabled={boldModeEnabled}
          onBoldModeToggle={setBoldModeEnabled}
          followTTS={followTTS}
          onFollowTTSToggle={setFollowTTS}
          ttsRate={ttsRate}
          onTtsRateChange={setTtsRate}
          displayText={displayText}
          streak={streak}
          isOpen={sidebarOpen}
          onToggleOpen={setSidebarOpen}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
