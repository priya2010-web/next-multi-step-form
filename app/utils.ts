import { ZodError } from "zod";

export const stringifyError = (
  error: unknown,
  fallbackMessage?: string
): string => {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(", ");
  }
  return error instanceof Error
    ? error.message
    : fallbackMessage || String(error);
};
