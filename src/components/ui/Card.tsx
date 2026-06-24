import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}>
      {title && (
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}
