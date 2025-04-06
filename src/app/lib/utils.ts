// This is a simplified version of the utils file with just what's needed for the components

/**
 * Combines multiple class names into a single string
 */
export function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ")
  }
  
  