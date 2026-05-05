let overrideTime: Date | null = null;

export function setTimeOverride(time: Date | null): void {
  overrideTime = time;
}

export function getKoreaTime(): Date {
  if (overrideTime) return new Date(overrideTime);
  const now = new Date();
  const koreaOffset = 9 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + koreaOffset * 60000);
}
