import { useState, useRef, useEffect, useCallback } from 'react'
import { OCRState } from '../types'
import { initWorker, recognizeImage, cleanupWorker } from '../utils/ocrWorker'
import type Tesseract from 'tesseract.js'
type Worker = Tesseract.Worker

export function useOCR(lang = 'eng') {
  const [ocrState, setOcrState] = useState<OCRState>({
    isProcessing: false,
    progress: 0,
    error: null,
  })
  const workerRef = useRef<Worker | null>(null)
  const isMounted = useRef(true)
  const currentLang = useRef(lang)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      if (workerRef.current) {
        cleanupWorker(workerRef.current)
        workerRef.current = null
      }
    }
  }, [])

  // When language changes, destroy the existing worker so next processImage creates a fresh one
  useEffect(() => {
    if (currentLang.current !== lang) {
      currentLang.current = lang
      if (workerRef.current) {
        cleanupWorker(workerRef.current)
        workerRef.current = null
      }
    }
  }, [lang])

  const processImage = useCallback(async (file: File): Promise<string> => {
    setOcrState({ isProcessing: true, progress: 0, error: null })

    try {
      if (!workerRef.current) {
        workerRef.current = await initWorker((pct) => {
          if (isMounted.current) {
            setOcrState((prev) => ({ ...prev, progress: pct }))
          }
        }, currentLang.current)
      }

      const text = await recognizeImage(workerRef.current, file)
      if (isMounted.current) {
        setOcrState({ isProcessing: false, progress: 100, error: null })
      }
      return text
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'OCR failed. Please try again.'
      if (isMounted.current) {
        setOcrState({ isProcessing: false, progress: 0, error: message })
      }
      return ''
    }
  }, [])

  return { processImage, ocrState }
}
