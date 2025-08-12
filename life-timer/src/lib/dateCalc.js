// Pure helper functions for time calculations since birth
// Returns an object with years, months, weeks, days, hours, minutes, seconds

export function diffSince(birthDate) {
  const start = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const now = new Date();
  const ms = now - start;
  if (Number.isNaN(ms) || ms < 0) return null;

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Years and months using calendar differences
  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();
  if (d < 0) {
    m -= 1;
    // approximate previous month length by moving to day 0 of current month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    d += prevMonth;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }

  return {
    years: y,
    months: m,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: seconds,
  };
}

export function formatMonospaceNumber(n) {
  return new Intl.NumberFormat(undefined, { useGrouping: true }).format(n);
}
