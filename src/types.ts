export type FontFamily =
  // Dyslexia-specific
  | 'OpenDyslexic'
  | 'LexieReadable'
  // Accessibility
  | 'AtkinsonHyperlegible'
  // Rounded / Friendly
  | 'ComicNeue'
  | 'Nunito'
  | 'Quicksand'
  | 'VarelaRound'
  // Clean sans-serif
  | 'Arial'
  | 'Verdana'
  | 'Roboto'
  | 'OpenSans'
  | 'Lato'
  | 'SourceSans3'
  | 'Ubuntu'
  | 'Cabin'
  | 'Oxygen'
  | 'PTSans'
  | 'Mulish'
  | 'Karla'
  // Modern
  | 'Raleway'
  | 'Exo2'
  // Serif / Reading
  | 'Georgia'
  | 'Merriweather'
  | 'LibreBaskerville'
  | 'Literata'

export interface ReaderSettings {
  fontSize: number
  lineHeight: number
  maxWidth: number
  fontFamily: FontFamily
  letterSpacing: number
  wordSpacing: number
  backgroundColor: string
  bionicMode: boolean
}

export interface FocusWindowState {
  enabled: boolean
  yPosition: number
  stripHeight: number
}

export interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  currentWordIndex: number | null
}

export interface OCRState {
  isProcessing: boolean
  progress: number
  error: string | null
}

export const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 20,
  lineHeight: 1.8,
  maxWidth: 700,
  fontFamily: 'OpenDyslexic',
  letterSpacing: 0.05,
  wordSpacing: 0.1,
  backgroundColor: '#FFFDF5',
  bionicMode: false,
}

export const FONT_FAMILY_MAP: Record<FontFamily, string> = {
  // Dyslexia-specific
  OpenDyslexic:         '"OpenDyslexic", sans-serif',
  LexieReadable:        '"Lexie Readable", sans-serif',
  // Accessibility
  AtkinsonHyperlegible: '"Atkinson Hyperlegible", sans-serif',
  // Rounded / Friendly
  ComicNeue:            '"Comic Neue", cursive',
  Nunito:               '"Nunito", sans-serif',
  Quicksand:            '"Quicksand", sans-serif',
  VarelaRound:          '"Varela Round", sans-serif',
  // Clean sans-serif
  Arial:                'Arial, Helvetica, sans-serif',
  Verdana:              'Verdana, Geneva, sans-serif',
  Roboto:               '"Roboto", sans-serif',
  OpenSans:             '"Open Sans", sans-serif',
  Lato:                 '"Lato", sans-serif',
  SourceSans3:          '"Source Sans 3", sans-serif',
  Ubuntu:               '"Ubuntu", sans-serif',
  Cabin:                '"Cabin", sans-serif',
  Oxygen:               '"Oxygen", sans-serif',
  PTSans:               '"PT Sans", sans-serif',
  Mulish:               '"Mulish", sans-serif',
  Karla:                '"Karla", sans-serif',
  // Modern
  Raleway:              '"Raleway", sans-serif',
  Exo2:                 '"Exo 2", sans-serif',
  // Serif / Reading
  Georgia:              'Georgia, "Times New Roman", serif',
  Merriweather:         '"Merriweather", serif',
  LibreBaskerville:     '"Libre Baskerville", serif',
  Literata:             '"Literata", serif',
}

export const BACKGROUND_PRESETS = [
  { label: 'Cream', value: '#FFFDF5' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Soft Yellow', value: '#FEFCE8' },
  { label: 'Soft Blue', value: '#EFF6FF' },
  { label: 'Soft Grey', value: '#F5F5F5' },
  { label: 'Mint', value: '#F0FDF4' },
] as const
