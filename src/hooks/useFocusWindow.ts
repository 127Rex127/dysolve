import { useState, useCallback, useRef } from 'react'
import { FocusWindowState } from '../types'

export function useFocusWindow() {
  const [focusWindow, setFocusWindow] = useState<FocusWindowState>({
    enabled: false,
    yPosition: 200,
    stripHeight: 80,
  })

  const isDragging = useRef(false)
  const startY = useRef(0)
  const startPos = useRef(0)

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      isDragging.current = true
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      startY.current = clientY
      startPos.current = focusWindow.yPosition

      const onMove = (moveEvent: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return
        const currentY =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY
        const delta = currentY - startY.current
        const newPos = startPos.current + delta
        const maxPos = window.innerHeight - focusWindow.stripHeight
        setFocusWindow((prev) => ({
          ...prev,
          yPosition: Math.max(0, Math.min(newPos, maxPos)),
        }))
      }

      const onEnd = () => {
        isDragging.current = false
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onEnd)
        window.removeEventListener('touchmove', onMove)
        window.removeEventListener('touchend', onEnd)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onMove)
      window.addEventListener('touchend', onEnd)
    },
    [focusWindow.yPosition, focusWindow.stripHeight]
  )

  const setEnabled = useCallback((enabled: boolean) => {
    setFocusWindow((prev) => ({ ...prev, enabled }))
  }, [])

  const setStripHeight = useCallback((stripHeight: number) => {
    setFocusWindow((prev) => ({ ...prev, stripHeight }))
  }, [])

  const setYPosition = useCallback((y: number) => {
    setFocusWindow((prev) => {
      const maxPos = window.innerHeight - prev.stripHeight
      return { ...prev, yPosition: Math.max(0, Math.min(y, maxPos)) }
    })
  }, [])

  return { focusWindow, setEnabled, setStripHeight, setYPosition, handleDragStart }
}
