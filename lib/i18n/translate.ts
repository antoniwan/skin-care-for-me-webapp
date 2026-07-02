import type { Messages } from "./messages/en";

export function createTranslator(messages: Messages) {
  return function translate(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    const value = key.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, messages);

    if (typeof value !== "string") return key;

    return value.replace(/\{(\w+)\}/g, (_, name: string) =>
      params?.[name] !== undefined ? String(params[name]) : `{${name}}`,
    );
  };
}

export type TranslateFn = ReturnType<typeof createTranslator>;
