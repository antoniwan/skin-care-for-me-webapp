import type { Messages } from "./messages/en";

function resolveMessage(
  messages: Messages,
  key: string,
): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, messages);

  return typeof value === "string" ? value : undefined;
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    params?.[name] !== undefined ? String(params[name]) : `{${name}}`,
  );
}

export function createTranslator(
  messages: Messages,
  fallback?: Messages,
) {
  return function translate(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    const value =
      resolveMessage(messages, key) ?? (fallback ? resolveMessage(fallback, key) : undefined);

    if (value === undefined) return key;

    return interpolate(value, params);
  };
}

export type TranslateFn = ReturnType<typeof createTranslator>;
