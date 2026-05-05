import { useMemo } from 'react';
import { scheduleData } from '../data/schedule';
import { getKoreaTime } from '../utils/timeOverride';
import { useKoreaTime } from './useKoreaTime';

function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function useNextEvent(day: 1 | 2 | 3 | 4 | 5, plan: 'A' | 'B'): string | null {
  const now = useKoreaTime();

  return useMemo(() => {
    void now; // depend on now for re-execution
    const current = getKoreaTime();
    const currentMin = current.getHours() * 60 + current.getMinutes();

    const items = scheduleData.filter(
      i => i.day === day && (i.plan === 'common' || i.plan === plan)
    );

    const next = items.find(i => timeToMinutes(i.time_start) > currentMin);
    if (!next) return null;

    const diff = timeToMinutes(next.time_start) - currentMin;
    if (diff <= 0) return null;
    if (diff < 60) return `距「${next.name_zh}」還有 ${diff} 分鐘`;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `距「${next.name_zh}」還有 ${h} 小時 ${m > 0 ? `${m} 分` : ''}`;
  }, [now, day, plan]);
}
