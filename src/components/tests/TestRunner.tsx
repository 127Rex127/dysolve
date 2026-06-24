import { useState, useMemo } from 'react'
import { useLanguage } from '../../i18n'
import type {
  TestDefinition, TestResult, TestQuestion,
  RightWrongResult, LikertResult, MbtiResult, BigFiveResult, SbtiResult, TypeTestResult,
} from '../../data/tests/types'

interface Props {
  test: TestDefinition
  onComplete: (result: TestResult, answers: number[]) => void
  onBack: () => void
  /** Navigate all the way back to the test hub grid */
  onBackToHub: () => void
}

/** Fisher-Yates shuffle returning a new array */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Select N random questions from the pool, preserving relative order */
function selectQuestions(pool: TestQuestion[], count: number): TestQuestion[] {
  if (pool.length <= count) return pool
  return shuffleArray(pool).slice(0, count)
}

function computeResult(test: TestDefinition, answers: number[]): TestResult {
  const { scoringMode, questions } = test

  if (scoringMode === 'rightWrong') {
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++
    })
    const score = Math.round((correct / questions.length) * 100)
    return { mode: 'rightWrong', score, correct, total: questions.length } satisfies RightWrongResult
  }

  if (scoringMode === 'likert') {
    const score = answers.reduce((sum, a) => sum + (a ?? 0), 0)
    const maxScore = questions.length * 3
    return { mode: 'likert', score, maxScore } satisfies LikertResult
  }

  if (scoringMode === 'mbti') {
    const scores = { EI: 0, SN: 0, TF: 0, JP: 0 }
    questions.forEach((q, i) => {
      const d = q.dichotomy!
      const ds = q.dichotomyScores!
      scores[d] += ds[answers[i]] ?? 0
    })
    const typeLetters = [
      scores.EI >= 0 ? 'E' : 'I',
      scores.SN >= 0 ? 'S' : 'N',
      scores.TF >= 0 ? 'T' : 'F',
      scores.JP >= 0 ? 'J' : 'P',
    ]
    return { mode: 'mbti', type: typeLetters.join(''), scores } satisfies MbtiResult
  }

  if (scoringMode === 'bigFive') {
    const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 }
    questions.forEach((q, i) => {
      const trait = q.trait!
      const raw = answers[i] ?? 0
      scores[trait] += q.reversed ? (3 - raw) : raw
    })
    const maxPerTrait = 12
    return { mode: 'bigFive', scores, maxPerTrait } satisfies BigFiveResult
  }

  if (scoringMode === 'typeTest') {
    const dims = test.typeDimensions ?? ['type0', 'type1', 'type2', 'type3']
    const scores: Record<string, number> = { [dims[0]]: 0, [dims[1]]: 0, [dims[2]]: 0, [dims[3]]: 0 }
    questions.forEach((_q, i) => {
      const sel = answers[i] ?? 0
      const dim = dims[Math.min(sel, 3)]
      scores[dim]++
    })
    const sorted = (Object.entries(scores)).sort((a, b) => b[1] - a[1])
    return {
      mode: 'typeTest',
      scores,
      primaryType: sorted[0][0],
      secondaryType: sorted[1][0],
    } satisfies TypeTestResult
  }

  // sbti
  const scores = { driver: 0, expressive: 0, amiable: 0, analytical: 0 }
  const dimOrder = ['driver', 'expressive', 'amiable', 'analytical'] as const
  questions.forEach((_q, i) => {
    const sel = answers[i] ?? 0
    scores[dimOrder[sel]]++
  })
  const sorted = (Object.entries(scores) as [string, number][]).sort((a, b) => b[1] - a[1])
  return {
    mode: 'sbti',
    scores,
    primaryType: sorted[0][0],
    secondaryType: sorted[1][0],
  } satisfies SbtiResult
}

export function TestRunner({ test, onComplete, onBack, onBackToHub }: Props) {
  const { t } = useLanguage()
  const tt = t.tests ?? {}

  // Sample questions once on mount (or use all if no selectCount)
  const activeQuestions = useMemo(() => {
    const count = test.selectCount ?? test.questions.length
    return selectQuestions(test.questions, count)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(() => new Array(activeQuestions.length).fill(-1))
  const [selected, setSelected] = useState<number>(-1)
  const [showDisclaimer, setShowDisclaimer] = useState(!!test.disclaimer)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)

  const testName = tt.testMeta?.[test.id]?.name ?? test.name
  const testMeta = tt.testMeta?.[test.id]

  const rawQuestion = activeQuestions[currentIndex]
  // Look up translation by question id (string key) first, fall back to array index
  const qId = String(rawQuestion.id)
  const translatedByKey = (testMeta?.questions as Record<string, { text: string; options: [string,string,string,string] }> | undefined)?.[qId]
  const translatedByIdx = Array.isArray(testMeta?.questions) ? (testMeta.questions as Array<{ text: string; options: [string,string,string,string] }>)[currentIndex] : undefined
  const translatedQ = translatedByKey ?? translatedByIdx
  const question = {
    ...rawQuestion,
    text: translatedQ?.text ?? rawQuestion.text,
    options: translatedQ?.options ?? rawQuestion.options,
  }
  const disclaimer = testMeta?.disclaimer ?? test.disclaimer

  const progress = (currentIndex / activeQuestions.length) * 100
  const isLast = currentIndex === activeQuestions.length - 1
  const hasAnswer = selected !== -1

  const questionLabel = (tt.questionOf ?? 'Question {n} of {total}')
    .replace('{n}', String(currentIndex + 1))
    .replace('{total}', String(activeQuestions.length))

  function handleSelect(idx: number) {
    setSelected(idx)
  }

  function handleNext() {
    if (!hasAnswer) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = selected

    if (isLast) {
      const result = computeResult({ ...test, questions: activeQuestions }, newAnswers)
      onComplete(result, newAnswers)
    } else {
      setAnswers(newAnswers)
      const nextSelected = newAnswers[currentIndex + 1] ?? -1
      setSelected(nextSelected)
      setCurrentIndex(currentIndex + 1)
    }
  }

  function handleBack() {
    if (currentIndex === 0) {
      onBack()
      return
    }
    const newAnswers = [...answers]
    newAnswers[currentIndex] = selected
    setAnswers(newAnswers)
    setSelected(newAnswers[currentIndex - 1] ?? -1)
    setCurrentIndex(currentIndex - 1)
  }

  // Quit confirm overlay
  if (showQuitConfirm) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-sm w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center space-y-4">
          <div className="text-4xl">🚪</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{tt.quitTitle ?? 'Quit this test?'}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{tt.quitSub ?? 'Your progress will be lost. You can retake the test any time.'}</p>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowQuitConfirm(false)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm">
              {tt.continueTestBtn ?? 'Keep going'}
            </button>
            <button onClick={onBackToHub} className="flex-1 px-4 py-3 rounded-xl bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 font-semibold hover:opacity-90 transition-opacity text-sm">
              {tt.quitBtn ?? 'Quit'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Disclaimer screen
  if (showDisclaimer) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className={`rounded-2xl bg-gradient-to-br ${test.color} p-6 text-white text-center mb-6`}>
            <div className="text-4xl mb-2">{test.icon}</div>
            <h1 className="text-xl font-bold">{testName}</h1>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 space-y-4">
            <div className="text-amber-600 dark:text-amber-400 font-semibold text-sm">{tt.importantNotice ?? 'Important notice'}</div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{disclaimer}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={onBack} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm">
                {tt.goBack ?? 'Go back'}
              </button>
              <button onClick={() => setShowDisclaimer(false)} className={`flex-1 px-4 py-3 rounded-xl bg-gradient-to-r ${test.color} text-white font-semibold hover:opacity-90 transition-opacity text-sm`}>
                {tt.continueBtn ?? 'I understand — continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-bold text-lg flex-shrink-0"
            title={tt.goBack ?? 'Go back'}
          >
            ←
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="truncate">{testName}</span>
              <span className="ml-2 flex-shrink-0 font-semibold text-slate-800 dark:text-white">{questionLabel}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${test.color} transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* Quit button */}
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="flex-shrink-0 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            title={tt.allTestsBtn ?? 'All Tests'}
          >
            ✕
          </button>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-5">
          <p className="text-2xl font-semibold text-slate-800 dark:text-white leading-relaxed whitespace-pre-line mb-8">
            {question.text}
          </p>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 text-base font-medium ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mr-4 flex-shrink-0 ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
            hasAnswer
              ? `bg-gradient-to-r ${test.color} hover:opacity-90 active:scale-95`
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          {isLast ? `${tt.seeResults ?? 'See My Results'} →` : `${tt.nextBtn ?? 'Next'} →`}
        </button>
      </div>
    </div>
  )
}
