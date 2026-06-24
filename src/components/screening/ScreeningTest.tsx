import { useState } from 'react'
import { calculateResult, ScreeningResult, RISK_COLORS } from '../../utils/screeningScorer'
import { useLanguage, interp } from '../../i18n'

interface ScreeningTestProps {
  onDone: () => void
  onViewPlan: (result: ScreeningResult) => void
}

type Phase = 'intro' | 'questions' | 'results'

export function ScreeningTest({ onDone, onViewPlan }: ScreeningTestProps) {
  const { t } = useLanguage()
  const questions = t.screening.questions
  const [phase, setPhase] = useState<Phase>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(-1))
  const [selected, setSelected] = useState<number>(-1)
  const [result, setResult] = useState<ScreeningResult | null>(null)

  function handleStart() {
    setPhase('questions')
    setCurrent(0)
    setSelected(-1)
  }

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex)
  }

  function handleNext() {
    if (selected === -1) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(-1)
    } else {
      const translatedCategories = questions.map((q) => q.category)
      const res = calculateResult(newAnswers, translatedCategories)
      setResult(res)
      setPhase('results')
    }
  }

  function handleRestart() {
    setPhase('intro')
    setCurrent(0)
    setAnswers(Array(20).fill(-1))
    setSelected(-1)
    setResult(null)
  }

  const q = questions[current]
  const progress = (current / questions.length) * 100

  function riskLabel(risk: 'Low' | 'Medium' | 'High') {
    if (risk === 'Low') return t.screening.lowRisk
    if (risk === 'Medium') return t.screening.medRisk
    return t.screening.highRisk
  }

  function getHeadline(risk: 'Low' | 'Medium' | 'High') {
    if (risk === 'Low') return t.screening.lowHeadline
    if (risk === 'Medium') return t.screening.medHeadline
    return t.screening.highHeadline
  }

  function getExplanation(result: ScreeningResult) {
    const highAreas = result.categoryBreakdown.filter((c) => c.score >= 2).map((c) => c.category)
    const areas = highAreas.slice(0, 4).join(', ')
    const vars = { score: result.score, areas }
    if (result.risk === 'Low') return interp(t.screening.lowExplain, vars)
    if (result.risk === 'Medium') return interp(t.screening.medExplain, vars)
    return interp(t.screening.highExplain, vars)
  }

  return (
    <div className="theme-bg min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden">
      <div className="theme-overlay absolute inset-0" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-300/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-3xl">

        {/* ── INTRO ─────────────────────────────────────────────────── */}
        {phase === 'intro' && (
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">

            {/* Attention-grabbing header band */}
            <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 px-8 py-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)' }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {t.screening.hookBadge ?? 'Free · Private · 5 minutes'}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  {t.screening.hookTitle ?? 'Could it be dyslexia?'}
                </h1>
                <p className="text-sky-100 mt-2 text-base max-w-lg mx-auto leading-relaxed">
                  {t.screening.sub}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-7 space-y-7">

              {/* Hook question cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { emoji: '📖', q: t.screening.hookQ1 ?? 'Do words seem to jump or blur on the page?' },
                  { emoji: '🔤', q: t.screening.hookQ2 ?? 'Do you often mix up letters like b, d, p, or q?' },
                  { emoji: '⏱️', q: t.screening.hookQ3 ?? 'Does reading feel much harder than it should?' },
                ].map((item) => (
                  <div key={item.q} className="bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <p className="text-xs font-medium text-sky-800 dark:text-sky-300 leading-snug">{item.q}</p>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                {t.screening.hookFamiliar ?? 'If any of these feel familiar — this test is for you.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: '📝', label: t.screening.stat1Label, sub: t.screening.stat1Sub },
                  { icon: '⏱️', label: t.screening.stat2Label, sub: t.screening.stat2Sub },
                  { icon: '🔒', label: t.screening.stat3Label, sub: t.screening.stat3Sub },
                ].map((f) => (
                  <div key={f.label} className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-4">
                    <div className="text-2xl mb-1.5">{f.icon}</div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">{f.sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed text-center">{t.screening.notice}</p>

              <button
                onClick={handleStart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-base transition-all shadow-xl shadow-sky-200 hover:-translate-y-0.5"
              >
                {t.screening.startBtn} →
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTIONS ─────────────────────────────────────────────── */}
        {phase === 'questions' && q && (
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Progress bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500 rounded-r-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="px-8 py-8 space-y-7">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full">
                  {q.category}
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500 font-semibold">
                  {current + 1} <span className="text-slate-300">/</span> {questions.length}
                </span>
              </div>

              {/* Question — large, easy to read */}
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">{q.text}</h2>

              {/* Options — bigger, more padding */}
              <div className="space-y-3">
                {q.options.map((optText, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`
                      w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-150 flex items-center gap-4
                      ${selected === i
                        ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50 hover:border-sky-200 hover:bg-sky-50/60 dark:hover:bg-sky-900/20'
                      }
                    `}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                      ${selected === i ? 'border-sky-500 bg-sky-500' : 'border-slate-300 bg-white'}`}
                    >
                      {selected === i && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <span className={`text-base leading-snug ${selected === i ? 'text-sky-800 dark:text-sky-200 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>
                      {optText}
                    </span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => { if (current > 0) { setCurrent(current - 1); setSelected(answers[current - 1]) } }}
                  disabled={current === 0}
                  className="text-sm text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  {t.screening.backBtn}
                </button>
                <button
                  onClick={handleNext}
                  disabled={selected === -1}
                  className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-sky-200"
                >
                  {current === questions.length - 1 ? t.screening.finishBtn : t.screening.nextBtn}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ───────────────────────────────────────────────── */}
        {phase === 'results' && result && (
          <div className="space-y-5">
            {/* Score card */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Score circle */}
                <div className="shrink-0 relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={RISK_COLORS[result.risk]}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                      style={{ transition: 'stroke-dashoffset 1s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{result.score}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">/ 100</span>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <span
                    className="inline-block text-sm font-bold px-4 py-1.5 rounded-full text-white mb-3"
                    style={{ backgroundColor: RISK_COLORS[result.risk] }}
                  >
                    {riskLabel(result.risk)}
                  </span>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">{getHeadline(result.risk)}</h2>
                </div>
              </div>

              <p className="mt-5 text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-5">
                {getExplanation(result)}
              </p>
            </div>

            {/* Category breakdown */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">{t.screening.breakdownTitle}</h3>
              <div className="space-y-3">
                {result.categoryBreakdown.map((cat) => (
                  <div key={cat.categoryIndex} className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400 w-44 shrink-0">
                      {questions[cat.categoryIndex]?.category ?? cat.category}
                    </span>
                    <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(cat.score / cat.max) * 100}%`,
                          backgroundColor: cat.score === 0 ? '#22c55e' : cat.score === 1 ? '#84cc16' : cat.score === 2 ? '#f59e0b' : '#ef4444',
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 w-8 text-right">{cat.score}/{cat.max}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan teaser */}
            <div className="bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800 rounded-2xl px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-sky-800 dark:text-sky-300">{t.plan.title}</p>
                <p className="text-xs text-sky-600 dark:text-sky-400 mt-0.5">{t.plan.sub}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onViewPlan(result)}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-base transition-all shadow-xl shadow-sky-200"
              >
                {t.screening.startReadingBtn}
              </button>
              <button
                onClick={onDone}
                className="py-4 px-6 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 font-semibold transition-all"
              >
                {t.hero.cta1}
              </button>
              <button
                onClick={handleRestart}
                className="py-4 px-6 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 font-semibold transition-all"
              >
                {t.screening.retakeBtn}
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500 px-4">{t.screening.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
