# Dysolve — CLAUDE.md

Dyslexia-friendly reading web app with screening tests, psychological assessments, ambient soundscapes, flashcards, and 20-language support. Fully client-side — no backend, no auth, no database.

## Environment

Node.js is **not** in the system PATH. Always use the full Anaconda paths:

```bash
/opt/anaconda3/bin/node          # Node runtime
/opt/anaconda3/bin/npm           # npm
/opt/anaconda3/bin/npx vite      # Vite dev server / build
/opt/anaconda3/bin/npx tsc       # TypeScript compiler
```

## Running the app

```bash
/opt/anaconda3/bin/npx vite                     # dev server → http://localhost:5173
/opt/anaconda3/bin/npx tsc --noEmit             # type check only
/opt/anaconda3/bin/npx vite build               # production build → dist/
```

## Tech stack

- **React 19** + **TypeScript 6** + **Vite 5**
- **Tailwind CSS 3** — utility-first styling
- **Tesseract.js 7** — client-side OCR (image → text)
- **Web Speech API** — text-to-speech (browser built-in, no library)
- **Web Audio API** — ambient soundscapes synthesized at runtime (no audio files)
- **MyMemory API** — word translation (70+ languages)
- **Free Dictionary API** — English word definitions
- **Playwright** — end-to-end testing (dev dependency)
- **localStorage** — settings persistence (key: `dyslexia-reader-settings`), reading streak, recent texts, bookmarks

## Project structure

```
src/
  App.tsx                          # Root — owns all state, routes between 7 views
  types.ts                         # Shared interfaces, DEFAULT_SETTINGS, FONT_FAMILY_MAP, BACKGROUND_PRESETS
  index.css                        # Tailwind directives + .reader-article CSS vars + slider thumb styles
  main.tsx                         # React root mount + preloadFonts()

  hooks/
    useReaderSettings.ts           # ReaderSettings state + localStorage sync
    useTTS.ts                      # Web Speech API (speak/pause/resume/stop + word highlighting)
    useOCR.ts                      # Tesseract.js worker lifecycle + progress state
    useFocusWindow.ts              # Draggable focus strip position (mouse + touch)
    useAmbientSound.ts             # Web Audio API context management + volume control for soundscapes
    useWordDefinition.ts           # Translation (MyMemory API) + definition (Free Dictionary API) lookup
    useReadingStreak.ts            # Daily reading streak tracking via localStorage
    useRecentTexts.ts              # Recent texts history with preview, stored in localStorage

  utils/
    colorPresets.ts                # Background colour preset definitions
    fontLoader.ts                  # Preloads fonts via FontFace API to avoid FOUT
    ocrWorker.ts                   # Tesseract createWorker wrapper (initWorker / recognizeImage / cleanupWorker)
    soundEngine.ts                 # Web Audio API synthesis — 18 ambient sounds (rain, ocean, birds, noise, etc.)
    screeningScorer.ts             # Dyslexia screening scorer — risk bands (Low/Medium/High) + personalised suggestions

  i18n/
    index.ts                       # LanguageProvider context, useLanguage() hook, interpolation helper
    types.ts                       # Translations interface (full string schema)
    languages.ts                   # LANGUAGES array — metadata, flags, OCR codes, TTS codes
    translations/                  # 20 language files: en, zh-CN, zh-TW, es, fr, de, it, ja, ko,
                                   #   ru, pt, hi, tr, nl, pl, vi, id, uk, el, sv

  data/
    sampleTexts.ts                 # Sample reading content for demo
    screeningQuestions.ts           # 20 dyslexia screening questions with categories and options
    tests/
      types.ts                     # Test data structures (questions, scoring, categories)
      index.ts                     # Test registry — exports all 28 tests
      iq.ts, ravens.ts, wechsler.ts, stanfordBinet.ts, moca.ts           # IQ / Intelligence
      phq9.ts, gad7.ts, beckDepression.ts, pcl5.ts, mmpi.ts             # Mental health
      mbti.ts, enneagram.ts, bigFive.ts, disc.ts, sbti.ts,              # Personality
        attachmentStyle.ts, empathyEQi.ts, sixteenPF.ts, eq.ts
      vark.ts, hollandCode.ts                                            # Learning / Career
      logic.ts, math.ts, english.ts, stroop.ts, trailMaking.ts, iat.ts  # Cognitive
      adhdAsrs.ts                                                        # ADHD

  components/
    layout/
      Header.tsx                   # Frosted glass top bar + nav buttons
      HeroSection.tsx              # Landing page (shown when no text is loaded)
      LanguageSelector.tsx         # Dropdown language picker with country flags
      PreferencesModal.tsx         # Modal for settings, language, and dark mode
      ShortcutsModal.tsx           # Keyboard shortcuts reference modal
    input/
      TextInputPanel.tsx           # Tab switcher: Paste | Upload Image | Camera/Scan
      PasteTextTab.tsx             # Textarea + Load / Sample buttons
      ImageUploadTab.tsx           # Drag-drop zone + OCR progress + error handling
      CameraTab.tsx                # Camera/mobile capture + gallery upload (uses useOCR)
    reader/
      ReaderView.tsx               # Article element — applies all settings as inline CSS
      WordHighlighter.tsx          # Splits text into <span> per word for TTS highlighting
      FocusWindow.tsx              # Three-div fixed overlay (top / strip / bottom)
      ReadingProgress.tsx          # Fixed progress bar at top of page
      FlashcardView.tsx            # Interactive flashcard review from bolded words
      WordDefinitionPopup.tsx      # Context-aware definition/translation popup
    controls/
      ControlsSidebar.tsx          # Collapsible right panel housing all controls
      TTSControl.tsx               # Play/Pause/Stop + speaking animation + word counter
      FontFamilyControl.tsx        # Radio card group for font selection (25 fonts)
      BackgroundColorControl.tsx   # Colour swatches + custom <input type="color">
      SoundscapeControl.tsx        # Grid UI for 18 ambient sounds with animated active state
    screening/
      ScreeningTest.tsx            # 20-question dyslexia screening with progressive interface
      PersonalisedPlan.tsx         # Results visualization with recommended settings
    tests/
      AllTestsHub.tsx              # Browse and launch 28 psychological/cognitive tests
      TestRunner.tsx               # Generic test execution framework
      TestResultView.tsx           # Results display and scoring
    ui/
      Slider.tsx                   # Range input with label + value badge
      Button.tsx                   # Variants: primary / secondary / ghost / danger
      Card.tsx                     # Rounded shadow card wrapper
      ProgressBar.tsx              # Animated gradient progress bar
      Toggle.tsx                   # On/off toggle switch
```

## App views

`App.tsx` manages 7 views via a `view` state variable:

| View | Description |
|------|-------------|
| `hero` | Landing page with feature overview |
| `input` | Text input panel (paste / image upload / camera) |
| `reader` | Main reading view with settings sidebar |
| `screening` | 20-question dyslexia screening test |
| `plan` | Personalised plan based on screening results |
| `tests` | Browse and run 28 psychological/cognitive assessments |
| `flashcards` | Overlay — flashcard review from bolded words |

## Key architecture decisions

**Reader settings via CSS custom properties** — all text settings (font size, line height, etc.) are applied as inline `style` on the `<article>` element in `ReaderView`, not as dynamic Tailwind classes (Tailwind's static scan doesn't support runtime class generation).

**Focus window** — three `position:fixed` divs (top overlay, transparent strip, bottom overlay). All overlays have `pointer-events:none`; only the drag handle has `pointer-events:auto`. Rendered at App root level so it covers the full viewport regardless of scroll position.

**TTS word highlighting** — `useTTS` pre-builds a character-offset → word-index lookup table when `speak()` is called. The `SpeechSynthesisUtterance.onboundary` event provides `charIndex`; this is mapped to a word index and stored in state. `WordHighlighter` applies a sky-blue highlight to the matching `<span>`. If no `onboundary` events fire within 2s (Firefox behaviour), highlighting is silently disabled.

**Tesseract OCR** — worker is lazy-initialised on first image upload and reused for the session.

**Ambient soundscapes** — all 18 sounds are synthesised at runtime using the Web Audio API (`soundEngine.ts`). No audio files are loaded. Categories: Rain (4), Water (3), Nature (2), Fire (1), Ambience (2), Noise (4). The `useAmbientSound` hook manages the AudioContext lifecycle and volume.

**i18n** — `LanguageProvider` wraps the app. `useLanguage()` returns a `t` object with all translated strings. Translation files are static imports (no lazy loading). Each language file also provides OCR language codes for Tesseract and TTS language codes for the Web Speech API.

**Dark mode** — toggled via CSS class on `document.documentElement`. Background images switch between `/background.jpg` (light) and `/dark_background.jpg` (dark).

**URL sharing** — text can be shared via `#text=` hash encoding in the URL.

**Bookmarking** — scroll position is persisted per text in localStorage so users can resume where they left off.

**Reading streak** — `useReadingStreak` tracks daily reading activity in localStorage and displays the current streak count.

**Tailwind config** — use `tailwind.config.ts` (TypeScript). Never run `npx tailwindcss init` — it generates a `tailwind.config.js` that takes precedence and has empty content paths, breaking class scanning.

**Vite base path** — `base: '/readease/'` is set in `vite.config.ts` for deployment under a subpath.

## Adding new fonts

1. Add a CDN `<link>` in `index.html`
2. Add the new `FontFamily` variant to the union type in `src/types.ts`
3. Add the CSS font-family string to `FONT_FAMILY_MAP` in `src/types.ts`
4. Add the font card to the `FONTS` array in `src/components/controls/FontFamilyControl.tsx`
5. Add the font to `FONTS_TO_PRELOAD` in `src/utils/fontLoader.ts`

## Adding new background colour presets

Edit `src/utils/colorPresets.ts` — add an entry to the `COLOR_PRESETS` array. Also update `BACKGROUND_PRESETS` in `src/types.ts` if used elsewhere.

## Adding new ambient sounds

1. Add the synthesis function in `src/utils/soundEngine.ts`
2. Register it in the sound registry within the same file
3. Add the sound card to `src/components/controls/SoundscapeControl.tsx`

## Adding new psychological/cognitive tests

1. Create a new test data file in `src/data/tests/` following the schema in `src/data/tests/types.ts`
2. Register it in `src/data/tests/index.ts`
3. The test will automatically appear in `AllTestsHub.tsx`

## Adding a new language

1. Create a translation file in `src/i18n/translations/` exporting a `Translations` object (follow `en.ts` as template)
2. Add the language to the `LANGUAGES` array in `src/i18n/languages.ts` with flag, OCR code, and TTS code
3. Import and register the translation in `src/i18n/index.ts`

## Settings schema

All reader settings live in `src/types.ts` under `ReaderSettings`. Defaults are in `DEFAULT_SETTINGS`. Adding a new setting requires:
1. Adding the field to the `ReaderSettings` interface
2. Adding a default value to `DEFAULT_SETTINGS`
3. Adding the corresponding control in `ControlsSidebar.tsx`
4. Applying the value in `ReaderView.tsx`
