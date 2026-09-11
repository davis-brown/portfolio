/**
 * Format a post date.
 *
 * Frontmatter dates are date-only strings ("2026-08-21"), which parse as UTC
 * midnight. Formatting those in a local timezone west of UTC rolls them back a
 * day: "2026-08-21" renders as "Aug 20, 2026" in California. Pinning the
 * formatter to UTC makes the output match what was authored, wherever the
 * build runs.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
