import { useState, useEffect } from 'react'
import { ReaderSettings, DEFAULT_SETTINGS } from '../types'

const STORAGE_KEY = 'dyslexia-reader-settings'

function loadFromStorage(): ReaderSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // private browsing — silent fallback
    }
  }, [settings])

  function updateSetting<K extends keyof ReaderSettings>(
    key: K,
    value: ReaderSettings[K]
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS)
  }

  return { settings, updateSetting, resetSettings }
}
