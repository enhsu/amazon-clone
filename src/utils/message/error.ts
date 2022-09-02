export function getErrorMessage(err: unknown): string {
  let message: string;

  if (err instanceof Error) {
    message = err.message;
  } else {
    message = String(err);
  }

  return message;
}
