export function info(context: string, value: unknown): void {
  // eslint-disable-next-line no-console
  console.info(`[info][${context}]`, value);
}

export function error(context: string, value: unknown): void {
  // eslint-disable-next-line no-console
  console.trace(`[error][${context}]`, value);
}

export function warning(context: string, value: unknown): void {
  // eslint-disable-next-line no-console
  console.warn(`[warning][${context}]`, value);
}

export function debug(context: string, value: unknown): void {
  // eslint-disable-next-line no-console
  console.log(`[debug][${context}]`, value);
}
