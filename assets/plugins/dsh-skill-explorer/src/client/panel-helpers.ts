/**
 * Shared panel helpers: always use the Chinese dictionary and the tiny
 * {name} interpolator. All copy stays in locales.ts.
 */
import { zh, type SkillExplorerKey } from './locales.ts'

/** Template values accepted by the interpolator. */
export type TranslateValues = Record<string, string | number>

/** Active dictionary — always Chinese. */
export function dictionary(): Record<string, string> {
  return { ...zh }
}

/** Translate a key with optional {name} template params (current language). */
export function tt(key: SkillExplorerKey, values?: TranslateValues): string {
  let text: string = dictionary()[key] ?? key
  if (values !== undefined) {
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
  }
  return text
}

