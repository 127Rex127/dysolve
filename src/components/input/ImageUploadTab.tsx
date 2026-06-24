import { useState, useRef, DragEvent } from 'react'
import { useOCR } from '../../hooks/useOCR'
import { ProgressBar } from '../ui/ProgressBar'
import { Button } from '../ui/Button'
import { useLanguage } from '../../i18n'

interface ImageUploadTabProps {
  onTextLoaded: (text: string) => void
  ocrLang?: string
}

export function ImageUploadTab({ onTextLoaded, ocrLang }: ImageUploadTabProps) {
  const { t } = useLanguage()
  const { processImage, ocrState } = useOCR(ocrLang)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    const text = await processImage(file)
    if (text.trim()) {
      onTextLoaded(text.trim())
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-all
          ${isDragOver
            ? 'border-sky-400 bg-sky-50'
            : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="sr-only"
        />

        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Uploaded preview"
              className="max-h-40 mx-auto rounded-lg object-contain shadow"
            />
            <p className="text-xs text-slate-400">{t.input.replaceImage ?? 'Click or drop to replace'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-600">{t.input.dropTitle}</p>
              <p className="text-sm text-slate-400 mt-1">{t.input.dropSub}</p>
            </div>
          </div>
        )}
      </div>

      {/* OCR progress */}
      {ocrState.isProcessing && (
        <div className="space-y-2">
          <ProgressBar value={ocrState.progress} label={t.input.extracting} />
          <p className="text-xs text-slate-400 text-center">{t.input.wait}</p>
        </div>
      )}

      {/* Error */}
      {ocrState.error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
          <svg className="text-red-400 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700">{t.input.failed}</p>
            <p className="text-xs text-red-500 mt-0.5">{ocrState.error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-red-400"
            onClick={() => fileInputRef.current?.click()}
          >
            {t.input.retryBtn}
          </Button>
        </div>
      )}

      {/* Success */}
      {!ocrState.isProcessing && ocrState.progress === 100 && !ocrState.error && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
          <svg className="text-emerald-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <p className="text-sm font-medium text-emerald-700">{t.input.success}</p>
        </div>
      )}
    </div>
  )
}
