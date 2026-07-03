"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/components/providers/locale-provider";
import { formatDocumentTitle } from "@/lib/i18n/ui";
import { getHtmlLang } from "@/lib/i18n/locales";

/** Keeps `document.title` and `html[lang]` in sync with the active locale. */
export function DocumentLocaleSync() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale);
    document.title = formatDocumentTitle(t, pathname);
  }, [t, locale, pathname]);

  return null;
}
