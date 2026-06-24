import { createWorker } from 'tesseract.js'
import type Tesseract from 'tesseract.js'

type Worker = Tesseract.Worker

export async function initWorker(
  onProgress: (pct: number) => void,
  lang = 'eng'
): Promise<Worker> {
  const worker = await createWorker(lang, 1, {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === 'recognizing text') {
        onProgress(Math.round(m.progress * 100))
      }
    },
  })
  return worker
}

export async function recognizeImage(
  worker: Worker,
  imageData: File | string
): Promise<string> {
  const { data } = await worker.recognize(imageData)
  return data.text
}

export async function cleanupWorker(worker: Worker): Promise<void> {
  try {
    await worker.terminate()
  } catch {
    // ignore cleanup errors
  }
}
