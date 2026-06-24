import { useState, useCallback } from 'react'

export interface RecentText {
  id: string
  preview: string
  text: string
  timestamp: number
}

const STORAGE_KEY = 'readease-recent'
const MAX_RECENT = 5

function loadFromStorage(): RecentText[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useRecentTexts() {
  const [recent, setRecent] = useState<RecentText[]>(loadFromStorage)

  const addRecent = useCallback((text: string) => {
    const preview = text.slice(0, 120).replace(/\s+/g, ' ').trim()
    const id = Date.now().toString()
    const item: RecentText = { id, preview, text, timestamp: Date.now() }
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.text !== text).slice(0, MAX_RECENT - 1)
      const next = [item, ...filtered]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeRecent = useCallback((id: string) => {
    setRecent((prev) => {
      const next = prev.filter((r) => r.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { recent, addRecent, removeRecent }
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
