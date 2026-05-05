import type { RestaurantStatus } from '../types';

interface HoursInfo {
  hours_open?: string;
  hours_close?: string;
  break_start?: string;
  break_end?: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function getRestaurantStatus(item: HoursInfo, now: Date): RestaurantStatus | null {
  if (!item.hours_open || !item.hours_close) return null;

  const currentMin = now.getHours() * 60 + now.getMinutes();
  const openMin = toMinutes(item.hours_open);
  const closeMin = toMinutes(item.hours_close);
  const isCrossDay = closeMin < openMin;

  const isOpen = isCrossDay
    ? currentMin >= openMin || currentMin < closeMin
    : currentMin >= openMin && currentMin < closeMin;

  if (!isOpen) return 'closed';

  if (item.break_start && item.break_end) {
    const breakStart = toMinutes(item.break_start);
    const breakEnd = toMinutes(item.break_end);
    if (currentMin >= breakStart && currentMin < breakEnd) return 'break';
  }

  return 'open';
}
