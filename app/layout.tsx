import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "./globals.css";
import { ROOT_METADATA } from "@/lib/constants/metadata";
import { DEFAULT_LOCALE, getHtmlLang, LOCALE_STORAGE_KEY } from "@/lib/i18n/locales";
import { THEME_BOOTSTRAP } from "@/lib/theme/bootstrap";

const LOCALE_BOOTSTRAP = `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var l=localStorage.getItem(k);var h=${JSON.stringify(getHtmlLang(DEFAULT_LOCALE))};if(l==="en"){h="en"}else if(l==="es-419"){h="es-419"}document.documentElement.lang=h}catch(e){}})();`;

export const metadata: Metadata = ROOT_METADATA;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#E04362",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getHtmlLang(DEFAULT_LOCALE)} className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP }} />
      </head>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
