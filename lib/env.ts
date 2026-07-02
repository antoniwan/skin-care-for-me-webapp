import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1).optional(),
});

type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (!cached) {
    cached = envSchema.parse({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    });
  }
  return cached;
}

export function hasOpenAiKey(): boolean {
  return Boolean(getEnv().OPENAI_API_KEY);
}
