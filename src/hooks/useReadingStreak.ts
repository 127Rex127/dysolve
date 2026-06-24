const STORAGE_KEY = 'readease-streak'

interface StreakData {
  count: number
  lastDate: string // ISO date string YYYY-MM-DD
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as StreakData
  } catch { /* ignore */ }
  return { count: 0, lastDate: '' }
}

function saveStreak(data: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/** Call `recordReading()` whenever the user loads a text to read. */
export function recordReading(): number {
  const today = todayISO()
  const data = loadStreak()

  if (data.lastDate === today) {
    // Already recorded today — no change
    return data.count
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  const newCount = data.lastDate === yesterdayISO ? data.count + 1 : 1
  saveStreak({ count: newCount, lastDate: today })
  return newCount
}

export function getStreak(): number {
  return loadStreak().count
}
