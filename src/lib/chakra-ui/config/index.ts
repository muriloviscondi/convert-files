// Utility functions for Chakra UI
import { type ClassValue, clsx } from 'clsx'

// Helper function for combining class names (kept for any custom CSS classes)
export function cx(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Helper function for responsive values in Chakra UI
export function responsive<T>(base: T, md?: T, lg?: T) {
  const result: { base: T; md?: T; lg?: T } = { base }
  if (md !== undefined) result.md = md
  if (lg !== undefined) result.lg = lg
  return result
}
