import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <DesktopSidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        <MobileTopBar />
        <main className="mx-auto w-full max-w-lg flex-1 px-4 pt-5 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:max-w-3xl lg:px-8 lg:pb-10 lg:pt-10 xl:max-w-4xl">
          {children}
        </main>
        <MobileTabBar />
      </div>
    </div>
  );
}
