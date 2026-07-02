import Link from "next/link";
import { AppLogo } from "@/components/layout/app-logo";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { BottomNav } from "./bottom-nav";
import { SideNav } from "./side-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-56">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur-md lg:hidden">
          <Link
            href="/"
            className="inline-flex rounded-md outline-offset-4 transition-opacity hover:opacity-90"
          >
            <AppLogo size="sm" />
          </Link>
          <LanguageToggle />
        </header>
        <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6 lg:max-w-6xl lg:px-8 lg:pb-8 lg:pt-8">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
