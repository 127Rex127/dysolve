const FONTS_TO_PRELOAD = [
  { name: 'OpenDyslexic', weight: '400' },
  { name: 'Atkinson Hyperlegible', weight: '400' },
  { name: 'Comic Neue', weight: '400' },
  { name: 'Nunito', weight: '400' },
  { name: 'Quicksand', weight: '400' },
  { name: 'Roboto', weight: '400' },
  { name: 'Open Sans', weight: '400' },
]

export async function preloadFonts(): Promise<void> {
  if (typeof document === 'undefined') return
  try {
    await Promise.allSettled(
      FONTS_TO_PRELOAD.map(({ name, weight }) =>
        document.fonts.load(`${weight} 1em "${name}"`)
      )
    )
  } catch {
    // Font preloading is best-effort — silent failure is fine
  }
}
