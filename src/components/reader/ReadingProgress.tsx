import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-0.5 bg-slate-100">
      <div
        className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
