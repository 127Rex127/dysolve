import { FontFamily } from '../../types'
import { useLanguage } from '../../i18n'

interface FontFamilyControlProps {
  value: FontFamily
  onChange: (font: FontFamily) => void
}

type FontEntry = { id: FontFamily; label: string; tag: string; sample: string; style: string }

const FONTS: FontEntry[] = [
  // ── Dyslexia-specific ──────────────────────────────────────────────────────
  { id: 'OpenDyslexic',         label: 'OpenDyslexic',          tag: 'Dyslexia',     sample: 'Abc', style: '"OpenDyslexic", sans-serif' },
  { id: 'LexieReadable',        label: 'Lexie Readable',        tag: 'Dyslexia',     sample: 'Abc', style: '"Lexie Readable", sans-serif' },
  // ── Accessibility ──────────────────────────────────────────────────────────
  { id: 'AtkinsonHyperlegible', label: 'Atkinson Hyperlegible', tag: 'Accessibility',sample: 'Abc', style: '"Atkinson Hyperlegible", sans-serif' },
  // ── Rounded / Friendly ─────────────────────────────────────────────────────
  { id: 'ComicNeue',            label: 'Comic Neue',            tag: 'Friendly',     sample: 'Abc', style: '"Comic Neue", cursive' },
  { id: 'Nunito',               label: 'Nunito',                tag: 'Rounded',      sample: 'Abc', style: '"Nunito", sans-serif' },
  { id: 'Quicksand',            label: 'Quicksand',             tag: 'Rounded',      sample: 'Abc', style: '"Quicksand", sans-serif' },
  { id: 'VarelaRound',          label: 'Varela Round',          tag: 'Rounded',      sample: 'Abc', style: '"Varela Round", sans-serif' },
  // ── Clean sans-serif ───────────────────────────────────────────────────────
  { id: 'Roboto',               label: 'Roboto',                tag: 'Clean',        sample: 'Abc', style: '"Roboto", sans-serif' },
  { id: 'OpenSans',             label: 'Open Sans',             tag: 'Clean',        sample: 'Abc', style: '"Open Sans", sans-serif' },
  { id: 'Lato',                 label: 'Lato',                  tag: 'Clean',        sample: 'Abc', style: '"Lato", sans-serif' },
  { id: 'SourceSans3',          label: 'Source Sans 3',         tag: 'Clean',        sample: 'Abc', style: '"Source Sans 3", sans-serif' },
  { id: 'Ubuntu',               label: 'Ubuntu',                tag: 'Clean',        sample: 'Abc', style: '"Ubuntu", sans-serif' },
  { id: 'Cabin',                label: 'Cabin',                 tag: 'Clean',        sample: 'Abc', style: '"Cabin", sans-serif' },
  { id: 'Oxygen',               label: 'Oxygen',                tag: 'Minimal',      sample: 'Abc', style: '"Oxygen", sans-serif' },
  { id: 'PTSans',               label: 'PT Sans',               tag: 'Clean',        sample: 'Abc', style: '"PT Sans", sans-serif' },
  { id: 'Mulish',               label: 'Mulish',                tag: 'Clean',        sample: 'Abc', style: '"Mulish", sans-serif' },
  { id: 'Karla',                label: 'Karla',                 tag: 'Compact',      sample: 'Abc', style: '"Karla", sans-serif' },
  { id: 'Arial',                label: 'Arial',                 tag: 'Simple',       sample: 'Abc', style: 'Arial, Helvetica, sans-serif' },
  { id: 'Verdana',              label: 'Verdana',               tag: 'Simple',       sample: 'Abc', style: 'Verdana, Geneva, sans-serif' },
  // ── Modern ─────────────────────────────────────────────────────────────────
  { id: 'Raleway',              label: 'Raleway',               tag: 'Modern',       sample: 'Abc', style: '"Raleway", sans-serif' },
  { id: 'Exo2',                 label: 'Exo 2',                 tag: 'Modern',       sample: 'Abc', style: '"Exo 2", sans-serif' },
  // ── Serif / Reading ────────────────────────────────────────────────────────
  { id: 'Georgia',              label: 'Georgia',               tag: 'Serif',        sample: 'Abc', style: 'Georgia, serif' },
  { id: 'Merriweather',         label: 'Merriweather',          tag: 'Serif',        sample: 'Abc', style: '"Merriweather", serif' },
  { id: 'LibreBaskerville',     label: 'Libre Baskerville',     tag: 'Serif',        sample: 'Abc', style: '"Libre Baskerville", serif' },
  { id: 'Literata',             label: 'Literata',              tag: 'Reading',      sample: 'Abc', style: '"Literata", serif' },
]

const TAG_COLORS: Record<string, string> = {
  Dyslexia:      'bg-sky-100 text-sky-600',
  Accessibility: 'bg-violet-100 text-violet-600',
  Friendly:      'bg-emerald-100 text-emerald-600',
  Rounded:       'bg-teal-100 text-teal-600',
  Clean:         'bg-slate-100 text-slate-500',
  Minimal:       'bg-slate-100 text-slate-400',
  Simple:        'bg-slate-100 text-slate-500',
  Compact:       'bg-orange-100 text-orange-500',
  Modern:        'bg-purple-100 text-purple-500',
  Serif:         'bg-rose-100 text-rose-600',
  Reading:       'bg-amber-100 text-amber-600',
}

export function FontFamilyControl({ value, onChange }: FontFamilyControlProps) {
  const { t } = useLanguage()
  const s = t.sidebar
  const tagLabels: Record<string, string> = {
    Dyslexia:      s.fontTagDyslexia      ?? 'Dyslexia',
    Accessibility: s.fontTagAccessibility ?? 'Accessibility',
    Friendly:      s.fontTagFriendly      ?? 'Friendly',
    Rounded:       s.fontTagRounded       ?? 'Rounded',
    Clean:         s.fontTagClean         ?? 'Clean',
    Minimal:       s.fontTagMinimal       ?? 'Minimal',
    Compact:       s.fontTagCompact       ?? 'Compact',
    Simple:        s.fontTagSimple        ?? 'Simple',
    Modern:        s.fontTagModern        ?? 'Modern',
    Serif:         s.fontTagSerif         ?? 'Serif',
    Reading:       s.fontTagReading       ?? 'Reading',
  }
  return (
    <div className="grid grid-cols-1 gap-1.5">
      {FONTS.map((font) => (
        <button
          key={font.id}
          onClick={() => onChange(font.id)}
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
            value === font.id
              ? 'border-sky-400 bg-sky-50 ring-1 ring-sky-300'
              : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium text-slate-600 truncate">{font.label}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-wide ${TAG_COLORS[font.tag] ?? 'bg-slate-100 text-slate-500'}`}>
              {tagLabels[font.tag] ?? font.tag}
            </span>
          </div>
          <span className="text-base text-slate-800 shrink-0 ml-2" style={{ fontFamily: font.style }}>
            {font.sample}
          </span>
        </button>
      ))}
    </div>
  )
}
