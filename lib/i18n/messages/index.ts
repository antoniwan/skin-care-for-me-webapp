export type { Messages } from "./en";
export { en } from "./en";
export { es419 } from "./es-419";

import type { Locale } from "../locales";
import { en } from "./en";
import { es419 } from "./es-419";

export const messagesByLocale = {
  en,
  "es-419": es419,
} as const;

export function getMessages(locale: Locale) {
  return messagesByLocale[locale];
}
