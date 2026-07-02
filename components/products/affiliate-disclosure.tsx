export function AffiliateDisclosure() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      Shop on Amazon links may earn a commission at no extra cost to you. Set{" "}
      <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
        NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG
      </code>{" "}
      in your environment to use your Associates tag.
    </p>
  );
}
