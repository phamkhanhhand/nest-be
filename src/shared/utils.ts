export function isEmptyString(value?: string | null): boolean {
  return !value || value.trim() === '';
}