export function cn(
  ...arr: (string | number | boolean | null | undefined)[]
): string {
  return arr.filter(Boolean).join(' ');
}
