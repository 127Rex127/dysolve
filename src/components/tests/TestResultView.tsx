import { useLanguage } from '../../i18n'
import type {
  TestDefinition, TestResult, RightWrongResult, LikertResult,
  MbtiResult, BigFiveResult, SbtiResult, TypeTestResult,
} from '../../data/tests/types'
import { MBTI_DESCRIPTIONS } from '../../data/tests/mbti'
import { BIG_FIVE_TRAIT_INFO } from '../../data/tests/bigFive'
import { SBTI_TYPE_INFO } from '../../data/tests/sbti'

interface Props {
  test: TestDefinition
  result: TestResult
  onRetake: () => void
  onBack: () => void
}

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function ActionSection({ title, items, bg, text }: { title: string; items: string[]; bg: string; text: string }) {
  return (
    <div className={`rounded-xl p-4 ${bg}`}>
      <div className={`text-xs font-bold uppercase tracking-wide mb-2 ${text}`}>{title}</div>
      <ul className="space-y-1.5">
        {items.map((s, i) => (
          <li key={i} className="text-sm text-slate-700 dark:text-slate-200 leading-snug">• {s}</li>
        ))}
      </ul>
    </div>
  )
}

function RightWrongResultView({ test, result, whatThisMeans, nextSteps }: {
  test: TestDefinition; result: RightWrongResult; whatThisMeans: string; nextSteps: string
}) {
  const pct = result.score
  const band = test.resultBands?.find(b => pct >= b.min && pct <= b.max)
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="#38bdf8" strokeWidth="10"
              strokeDasharray={`${(pct / 100) * 263.9} 263.9`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800 dark:text-white">{pct}%</span>
            <span className="text-xs text-slate-500">{result.correct}/{result.total}</span>
          </div>
        </div>
        {band && (
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${band.color} ${band.textColor}`}>{band.label}</span>
        )}
      </div>
      {band && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{whatThisMeans}</div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{band.description}</p>
          </div>
          {pct < 75 && (
            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-sky-600 dark:text-sky-400 mb-2">{nextSteps}</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {pct < 40
                  ? 'Start with foundational exercises: daily 10-minute puzzle sessions, number sequences, and verbal analogy practice. Apps like Lumosity or Elevate provide structured cognitive training. Give yourself 4–6 weeks of consistent practice before retaking.'
                  : 'Focus on your weakest question types. Review each answer you missed and understand why the correct answer is right. Spaced repetition — returning to difficult concepts after a day, then a week — is the most effective learning strategy.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function LikertResultView({ test, result, whatThisMeans, nextSteps }: {
  test: TestDefinition; result: LikertResult; whatThisMeans: string; nextSteps: string
}) {
  const band = test.resultBands?.find(b => result.score >= b.min && result.score <= b.max)
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="text-5xl font-bold text-slate-800 dark:text-white">
          {result.score}<span className="text-2xl text-slate-400">/{result.maxScore}</span>
        </div>
        {band && (
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${band.color} ${band.textColor}`}>{band.label}</span>
        )}
        <div className="w-full max-w-xs">
          <ScoreBar value={result.score} max={result.maxScore} color="bg-sky-400" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0</span><span>{result.maxScore}</span></div>
        </div>
      </div>
      {band && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{whatThisMeans}</div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{band.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function MbtiResultView({ result, strengthsLabel, growthAreasLabel, whatThisMeans }: {
  result: MbtiResult; strengthsLabel: string; growthAreasLabel: string; whatThisMeans: string
}) {
  const info = MBTI_DESCRIPTIONS[result.type]
  const dichotomies: Array<{ key: 'EI' | 'SN' | 'TF' | 'JP'; left: string; right: string; desc: string }> = [
    { key: 'EI', left: 'E', right: 'I', desc: 'Energy source' },
    { key: 'SN', left: 'S', right: 'N', desc: 'Information processing' },
    { key: 'TF', left: 'T', right: 'F', desc: 'Decision making' },
    { key: 'JP', left: 'J', right: 'P', desc: 'Lifestyle' },
  ]
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-widest">{result.type}</div>
        {info && <div className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-1">{info.title}</div>}
      </div>
      <div className="space-y-3 max-w-sm mx-auto">
        {dichotomies.map(({ key, left, right, desc }) => {
          const score = result.scores[key]
          const total = 10
          const activeLetter = score >= 0 ? left : right
          return (
            <div key={key}>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-0.5">
                <span className={score > 0 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>{left}</span>
                <span className="text-slate-400">{desc}</span>
                <span className={score < 0 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>{right}</span>
              </div>
              <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full">
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-400 dark:bg-slate-500" />
                <div
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{
                    left: score > 0 ? '50%' : `${Math.round(Math.max(0, Math.min(100, 50 + (score / total) * 50)))}%`,
                    width: `${Math.abs(score / total) * 50}%`,
                  }}
                />
              </div>
              <div className="text-right text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">{activeLetter}</div>
            </div>
          )
        })}
      </div>
      {info && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{whatThisMeans}</div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{info.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionSection title={strengthsLabel} items={info.strengths} bg="bg-green-50 dark:bg-green-900/20" text="text-green-700 dark:text-green-400" />
            <ActionSection title={growthAreasLabel} items={info.growthAreas} bg="bg-amber-50 dark:bg-amber-900/20" text="text-amber-700 dark:text-amber-400" />
          </div>
        </div>
      )}
    </div>
  )
}

function BigFiveResultView({ result, bigFiveSub, strengthsLabel, growthAreasLabel }: {
  result: BigFiveResult; bigFiveSub: string; strengthsLabel: string; growthAreasLabel: string
}) {
  const traits = ['O', 'C', 'E', 'A', 'N'] as const
  const highTraits = traits.filter(t => result.scores[t] / result.maxPerTrait >= 0.6)
  const lowTraits  = traits.filter(t => result.scores[t] / result.maxPerTrait <= 0.4)
  return (
    <div className="space-y-5">
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">{bigFiveSub}</p>
      <div className="space-y-4 max-w-sm mx-auto">
        {traits.map(trait => {
          const info = BIG_FIVE_TRAIT_INFO[trait]
          const score = result.scores[trait]
          const pct = score / result.maxPerTrait
          const level = pct >= 0.67 ? 'High' : pct >= 0.33 ? 'Mid' : 'Low'
          return (
            <div key={trait}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{info.name}</span>
                <span className="text-xs font-medium text-slate-500">{level} · {score}/{result.maxPerTrait}</span>
              </div>
              <ScoreBar value={score} max={result.maxPerTrait} color={info.color} />
              <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                <span>{info.low}</span>
                <span className="text-right">{info.high}</span>
              </div>
            </div>
          )
        })}
      </div>
      {(highTraits.length > 0 || lowTraits.length > 0) && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {highTraits.length > 0 && (
            <ActionSection
              title={strengthsLabel}
              items={highTraits.map(t => `High ${BIG_FIVE_TRAIT_INFO[t].name}: ${BIG_FIVE_TRAIT_INFO[t].high}`)}
              bg="bg-green-50 dark:bg-green-900/20"
              text="text-green-700 dark:text-green-400"
            />
          )}
          {lowTraits.length > 0 && (
            <ActionSection
              title={growthAreasLabel}
              items={lowTraits.map(t => `Low ${BIG_FIVE_TRAIT_INFO[t].name}: ${BIG_FIVE_TRAIT_INFO[t].low}`)}
              bg="bg-amber-50 dark:bg-amber-900/20"
              text="text-amber-700 dark:text-amber-400"
            />
          )}
        </div>
      )}
    </div>
  )
}

function SbtiResultView({ result, withTendencies, strengthsLabel, growthAreasLabel }: {
  result: SbtiResult; withTendencies: string; strengthsLabel: string; growthAreasLabel: string
}) {
  const info = SBTI_TYPE_INFO[result.primaryType]
  const secondaryInfo = SBTI_TYPE_INFO[result.secondaryType]
  const dims = ['driver', 'expressive', 'amiable', 'analytical'] as const
  const total = Object.values(result.scores).reduce((a, b) => a + b, 0) || 1
  const withLabel = withTendencies.replace('{type}', secondaryInfo?.name ?? result.secondaryType)
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-2">{info?.emoji}</div>
        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">{info?.name}</div>
        {secondaryInfo && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{withLabel}</div>}
      </div>
      <div className="space-y-3 max-w-sm mx-auto">
        {dims.map(d => {
          const di = SBTI_TYPE_INFO[d]
          const pct = Math.round((result.scores[d] / total) * 100)
          return (
            <div key={d}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{di.emoji} {di.name}</span>
                <span className="text-xs text-slate-400">{pct}%</span>
              </div>
              <ScoreBar
                value={result.scores[d]}
                max={total}
                color={d === result.primaryType ? 'bg-orange-400' : d === result.secondaryType ? 'bg-amber-300' : 'bg-slate-300 dark:bg-slate-500'}
              />
            </div>
          )
        })}
      </div>
      {info && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{info.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionSection title={strengthsLabel} items={info.strengths} bg="bg-orange-50 dark:bg-orange-900/20" text="text-orange-700 dark:text-orange-400" />
            <ActionSection title={growthAreasLabel} items={info.growthAreas} bg="bg-amber-50 dark:bg-amber-900/20" text="text-amber-700 dark:text-amber-400" />
          </div>
          {info.worksWith && (
            <p className="text-xs text-slate-400 text-center italic px-2">{info.worksWith}</p>
          )}
        </div>
      )}
    </div>
  )
}

function TypeTestResultView({ test, result, withTendencies, strengthsLabel, growthAreasLabel }: {
  test: TestDefinition; result: TypeTestResult; withTendencies: string; strengthsLabel: string; growthAreasLabel: string
}) {
  const typeInfo = test.typeInfo ?? {}
  const info = typeInfo[result.primaryType]
  const secondaryInfo = typeInfo[result.secondaryType]
  const dims = test.typeDimensions ?? Object.keys(result.scores)
  const total = Object.values(result.scores).reduce((a, b) => a + b, 0) || 1
  const withLabel = withTendencies.replace('{type}', secondaryInfo?.name ?? result.secondaryType)

  // Colour palette for the bars
  const barColors = [
    'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500',
    'bg-pink-500', 'bg-cyan-500',
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        {info?.emoji && <div className="text-5xl mb-2">{info.emoji}</div>}
        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">
          {info?.name ?? result.primaryType}
        </div>
        {secondaryInfo && (
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{withLabel}</div>
        )}
      </div>

      {/* Score breakdown */}
      <div className="space-y-3 max-w-sm mx-auto">
        {dims.map((dim, idx) => {
          const dimInfo = typeInfo[dim]
          const score = result.scores[dim] ?? 0
          const pct = Math.round((score / total) * 100)
          const isPrimary = dim === result.primaryType
          const isSecondary = dim === result.secondaryType
          return (
            <div key={dim}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {dimInfo?.emoji} {dimInfo?.name ?? dim}
                  {isPrimary && <span className="ml-2 text-xs font-bold text-violet-600 dark:text-violet-400">Primary</span>}
                  {isSecondary && !isPrimary && <span className="ml-2 text-xs font-semibold text-slate-400">Secondary</span>}
                </span>
                <span className="text-xs text-slate-400">{pct}%</span>
              </div>
              <ScoreBar
                value={score}
                max={total}
                color={isPrimary ? barColors[0] : isSecondary ? barColors[1] : 'bg-slate-300 dark:bg-slate-600'}
              />
            </div>
          )
        })}
      </div>

      {/* Primary type description */}
      {info && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{info.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionSection title={strengthsLabel} items={info.strengths} bg="bg-violet-50 dark:bg-violet-900/20" text="text-violet-700 dark:text-violet-400" />
            <ActionSection title={growthAreasLabel} items={info.growthAreas} bg="bg-amber-50 dark:bg-amber-900/20" text="text-amber-700 dark:text-amber-400" />
          </div>
          {info.worksWith && (
            <p className="text-xs text-slate-400 text-center italic px-2">{info.worksWith}</p>
          )}
        </div>
      )}
    </div>
  )
}

export function TestResultView({ test, result, onRetake, onBack }: Props) {
  const { t } = useLanguage()
  const tt = t.tests ?? {}

  const strengthsLabel   = tt.strengths   ?? 'Strengths'
  const growthAreasLabel = tt.growthAreas ?? 'Growth areas'
  const testName = tt.testMeta?.[test.id]?.name ?? test.name
  const whatThisMeans = tt.whatThisMeans ?? 'What this means'
  const nextSteps     = tt.nextSteps     ?? 'Next steps'
  const disclaimer    = tt.testMeta?.[test.id]?.disclaimer ?? test.disclaimer

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className={`rounded-2xl bg-gradient-to-br ${test.color} p-6 text-white text-center mb-6`}>
          <div className="text-4xl mb-2">{test.icon}</div>
          <h1 className="text-2xl font-bold">{testName}</h1>
          <p className="text-white/80 text-sm mt-1">{tt.yourResults ?? 'Your Results'}</p>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            {disclaimer}
          </div>
        )}

        {/* Result content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          {result.mode === 'rightWrong' && (
            <RightWrongResultView test={test} result={result} whatThisMeans={whatThisMeans} nextSteps={nextSteps} />
          )}
          {result.mode === 'likert' && (
            <LikertResultView test={test} result={result} whatThisMeans={whatThisMeans} nextSteps={nextSteps} />
          )}
          {result.mode === 'mbti' && (
            <MbtiResultView result={result} strengthsLabel={strengthsLabel} growthAreasLabel={growthAreasLabel} whatThisMeans={whatThisMeans} />
          )}
          {result.mode === 'bigFive' && (
            <BigFiveResultView
              result={result}
              bigFiveSub={tt.bigFiveSub ?? 'Your personality across the five core dimensions'}
              strengthsLabel={strengthsLabel}
              growthAreasLabel={growthAreasLabel}
            />
          )}
          {result.mode === 'sbti' && (
            <SbtiResultView
              result={result}
              withTendencies={tt.withTendencies ?? 'with {type} tendencies'}
              strengthsLabel={strengthsLabel}
              growthAreasLabel={growthAreasLabel}
            />
          )}
          {result.mode === 'typeTest' && (
            <TypeTestResultView
              test={test}
              result={result}
              withTendencies={tt.withTendencies ?? 'with {type} tendencies'}
              strengthsLabel={strengthsLabel}
              growthAreasLabel={growthAreasLabel}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            ← {tt.allTestsBtn ?? 'All Tests'}
          </button>
          <button
            onClick={onRetake}
            className={`flex-1 px-4 py-3 rounded-xl bg-gradient-to-r ${test.color} text-white font-semibold hover:opacity-90 transition-opacity`}
          >
            {tt.retakeBtn ?? 'Retake'}
          </button>
        </div>
      </div>
    </div>
  )
}
