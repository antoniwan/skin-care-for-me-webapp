import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
