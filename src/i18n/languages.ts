export interface LangMeta {
  code: string      // internal key
  label: string     // native name
  flag: string      // emoji flag
  ocrLang: string   // Tesseract code
  ttsLang: string   // BCP-47 prefix
}

export const LANGUAGES: LangMeta[] = [
  { code: 'en',    label: 'English',        flag: '🇬🇧', ocrLang: 'eng',     ttsLang: 'en' },
  { code: 'zh-CN', label: '中文（简体）',    flag: '🇨🇳', ocrLang: 'chi_sim', ttsLang: 'zh' },
  { code: 'zh-TW', label: '中文（繁體）',    flag: '🇹🇼', ocrLang: 'chi_tra', ttsLang: 'zh' },
  { code: 'es',    label: 'Español',        flag: '🇪🇸', ocrLang: 'spa',     ttsLang: 'es' },
  { code: 'fr',    label: 'Français',       flag: '🇫🇷', ocrLang: 'fra',     ttsLang: 'fr' },
  { code: 'de',    label: 'Deutsch',        flag: '🇩🇪', ocrLang: 'deu',     ttsLang: 'de' },
  { code: 'it',    label: 'Italiano',       flag: '🇮🇹', ocrLang: 'ita',     ttsLang: 'it' },
  { code: 'ja',    label: '日本語',          flag: '🇯🇵', ocrLang: 'jpn',     ttsLang: 'ja' },
  { code: 'ko',    label: '한국어',          flag: '🇰🇷', ocrLang: 'kor',     ttsLang: 'ko' },
  { code: 'ru',    label: 'Русский',        flag: '🇷🇺', ocrLang: 'rus',     ttsLang: 'ru' },
  { code: 'pt',    label: 'Português',      flag: '🇧🇷', ocrLang: 'por',     ttsLang: 'pt' },
  { code: 'hi',    label: 'हिन्दी',          flag: '🇮🇳', ocrLang: 'hin',     ttsLang: 'hi' },
  { code: 'tr',    label: 'Türkçe',         flag: '🇹🇷', ocrLang: 'tur',     ttsLang: 'tr' },
  { code: 'nl',    label: 'Nederlands',     flag: '🇳🇱', ocrLang: 'nld',     ttsLang: 'nl' },
  { code: 'pl',    label: 'Polski',         flag: '🇵🇱', ocrLang: 'pol',     ttsLang: 'pl' },
  { code: 'vi',    label: 'Tiếng Việt',     flag: '🇻🇳', ocrLang: 'vie',     ttsLang: 'vi' },
  { code: 'id',    label: 'Bahasa Indonesia', flag: '🇮🇩', ocrLang: 'ind',   ttsLang: 'id' },
  { code: 'uk',    label: 'Українська',     flag: '🇺🇦', ocrLang: 'ukr',     ttsLang: 'uk' },
  { code: 'el',    label: 'Ελληνικά',       flag: '🇬🇷', ocrLang: 'ell',     ttsLang: 'el' },
  { code: 'sv',    label: 'Svenska',        flag: '🇸🇪', ocrLang: 'swe',     ttsLang: 'sv' },
]
