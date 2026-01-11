/**
 * Week calculation utilities for Weekly Recap feature
 * Uses ISO 8601 week numbering (Monday-Sunday weeks)
 */

/**
 * Get ISO week string format: "YYYY-WXX"
 * @param date - Date to calculate week for (defaults to now)
 * @returns ISO week string (e.g., "2026-W02")
 */
export const getISOWeek = (date: Date = new Date()): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  // Thursday of current week determines the year
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
};

/**
 * Get start and end timestamps of the current week (Monday 00:00 to Sunday 23:59)
 * @param date - Reference date (defaults to now)
 * @returns Object with start and end Date objects
 */
export const getWeekBounds = (
  date: Date = new Date()
): { start: Date; end: Date } => {
  const d = new Date(date);
  const day = d.getDay();
  // Calculate Monday (day 1) - handle Sunday (day 0) as end of week
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(d);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
