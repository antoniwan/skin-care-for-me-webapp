import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "./globals.css";
import { ROOT_METADATA } from "@/lib/constants/metadata";

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
    <html lang="es-419" className="h-full" suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
