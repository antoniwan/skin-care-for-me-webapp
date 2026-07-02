export function PageLoading({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
      {message}
    </div>
  );
}
