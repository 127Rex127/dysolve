import { useState } from 'react'
import { ScreeningResult, RISK_COLORS } from '../../utils/screeningScorer'
import { useLanguage } from '../../i18n'
import type { ReaderSettings } from '../../types'

// Recommended settings per risk level
const RECOMMENDED_SETTINGS: Record<'Low' | 'Medium' | 'High', Partial<ReaderSettings>> = {
  Low: {
    fontFamily: 'ComicNeue',
    fontSize: 20,
    lineHeight: 1.8,
    maxWidth: 700,
    letterSpacing: 0.03,
    wordSpacing: 0.08,
    backgroundColor: '#FFFDF5',
  },
  Medium: {
    fontFamily: 'OpenDyslexic',
    fontSize: 20,
    lineHeight: 2.0,
    maxWidth: 680,
    letterSpacing: 0.1,
    wordSpacing: 0.15,
    backgroundColor: '#FFFDF5',
  },
  High: {
    fontFamily: 'OpenDyslexic',
    fontSize: 22,
    lineHeight: 2.0,
    maxWidth: 660,
    letterSpacing: 0.1,
    wordSpacing: 0.15,
    backgroundColor: '#FEFCE8',
  },
}

interface PersonalisedPlanProps {
  result: ScreeningResult
  onApplySettings: (settings: Partial<ReaderSettings>) => void
  onStartReading: () => void
}

export function PersonalisedPlan({ result, onApplySettings, onStartReading }: PersonalisedPlanProps) {
  const { t } = useLanguage()
  const [applied, setApplied] = useState(false)

  const plan = t.plan
  const sidebar = t.sidebar
  const riskKey = result.risk.toLowerCase() as 'low' | 'medium' | 'high'
  const riskPlan = plan[riskKey]
  const recommended = RECOMMENDED_SETTINGS[result.risk]

  function handleApply() {
    onApplySettings(recommended)
    setApplied(true)
  }

  const questions = t.screening.questions
  const challenges = result.categoryBreakdown
    .filter((c) => c.score >= 2)
    .map((c) => questions[c.categoryIndex]?.category ?? c.category)
  const strengths = result.categoryBreakdown
    .filter((c) => c.score === 0)
    .map((c) => questions[c.categoryIndex]?.category ?? c.category)
    .slice(0, 3)

  return (
    <div
      className="min-h-screen px-4 pt-24 pb-16 relative"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative w-full max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <div
            className="inline-block text-xs font-bold px-4 py-1.5 rounded-full text-white mb-3"
            style={{ backgroundColor: RISK_COLORS[result.risk] }}
          >
            {result.score}/100
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{plan.title}</h1>
          <p className="text-slate-500 mt-2">{plan.sub}</p>
        </div>

        {/* Challenges & Strengths */}
        {(challenges.length > 0 || strengths.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenges.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{plan.challengesLabel}</h3>
                <ul className="space-y-1.5">
                  {challenges.slice(0, 5).map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {strengths.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{plan.strengthsLabel}</h3>
                <ul className="space-y-1.5">
                  {strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Recommended Dysolve setup */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{plan.setupTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            {[
              { label: sidebar.fontSection, value: recommended.fontFamily },
              { label: sidebar.fontSizeLabel, value: `${recommended.fontSize}px` },
              { label: sidebar.lineHeightLabel, value: String(recommended.lineHeight) },
              { label: sidebar.letterSpacingLabel, value: `${recommended.letterSpacing}em` },
              { label: sidebar.wordSpacingLabel, value: `${recommended.wordSpacing}em` },
              { label: sidebar.bgSection, value: recommended.backgroundColor ?? '#FFFDF5' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                  {String(value).startsWith('#') ? (
                    <>
                      <span
                        className="w-4 h-4 rounded border border-slate-200 shrink-0"
                        style={{ backgroundColor: value as string }}
                      />
                      <span className="text-xs font-semibold text-slate-700 truncate">{value}</span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-slate-700">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleApply}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              applied
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-200'
            }`}
          >
            {applied ? plan.appliedBtn : plan.applyBtn}
          </button>
        </div>

        {/* Strategy */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{plan.strategyTitle}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{riskPlan.strategy}</p>
        </div>

        {/* 4-Week Plan */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{plan.weekTitle}</h3>
          <div className="space-y-3">
            {riskPlan.weeks.map((week, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{week}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Tips */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{plan.tipsTitle}</h3>
          <ul className="space-y-3">
            {riskPlan.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onStartReading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-base transition-all shadow-lg shadow-sky-200"
        >
          {t.screening.startReadingBtn}
        </button>
      </div>
    </div>
  )
}
