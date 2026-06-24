import { useRef } from 'react'
import { useOCR } from '../../hooks/useOCR'
import { ProgressBar } from '../ui/ProgressBar'
import { useLanguage } from '../../i18n'

interface CameraTabProps {
  onTextLoaded: (text: string) => void
  ocrLang?: string
}

export function CameraTab({ onTextLoaded, ocrLang }: CameraTabProps) {
  const { t } = useLanguage()
  const input = t.input
  const { processImage, ocrState } = useOCR(ocrLang)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const text = await processImage(file)
    if (text.trim()) onTextLoaded(text.trim())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="sr-only"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="sr-only"
      />

      {/* Illustration */}
      {!ocrState.isProcessing && ocrState.progress === 0 && (
        <div className="w-full rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/40 flex flex-col items-center justify-center py-12 gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-200">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{t.sidebar.cameraDesc ?? 'Scan a document with your camera'}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t.sidebar.cameraSub ?? 'Books, letters, menus, signs — anything with text'}</p>
          </div>
        </div>
      )}

      {/* Processing */}
      {ocrState.isProcessing && (
        <div className="space-y-2">
          <ProgressBar value={ocrState.progress} label={input.extracting} />
          <p className="text-xs text-slate-400 text-center">{input.wait}</p>
        </div>
      )}

      {/* Error */}
      {ocrState.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-3 text-sm text-red-600 dark:text-red-400 text-center">
          {input.failed}
        </div>
      )}

      {/* Success */}
      {!ocrState.isProcessing && ocrState.progress === 100 && !ocrState.error && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl p-3 flex items-center gap-2">
          <svg className="text-emerald-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{input.success}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={ocrState.isProcessing}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold text-base transition-all shadow-lg shadow-violet-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          {input.cameraBtnCapture ?? 'Take Photo'}
        </button>
        <button
          onClick={() => galleryInputRef.current?.click()}
          disabled={ocrState.isProcessing}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          {t.sidebar.chooseGallery ?? 'Choose from Gallery'}
        </button>
      </div>
    </div>
  )
}
