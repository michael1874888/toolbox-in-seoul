import { useEffect, useRef } from 'react';
import { useKoreaTime } from '../../hooks/useKoreaTime';
import styles from './DayTabs.module.css';

const DAYS = [
  { day: 1 as const, date: '05/09', weekday: '六' },
  { day: 2 as const, date: '05/10', weekday: '日' },
  { day: 3 as const, date: '05/11', weekday: '一' },
  { day: 4 as const, date: '05/12', weekday: '二' },
  { day: 5 as const, date: '05/13', weekday: '三' },
];

const TRIP_DATES: Record<number, string> = {
  1: '2026-05-09',
  2: '2026-05-10',
  3: '2026-05-11',
  4: '2026-05-12',
  5: '2026-05-13',
};

interface DayTabsProps {
  activeDay: 1 | 2 | 3 | 4 | 5;
  onDayChange: (day: 1 | 2 | 3 | 4 | 5) => void;
}

export function DayTabs({ activeDay, onDayChange }: DayTabsProps) {
  const now = useKoreaTime();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeDay]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs} role="tablist">
        {DAYS.map(({ day, date, weekday }) => {
          const isToday = TRIP_DATES[day] === todayStr;
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              ref={isActive ? activeRef : null}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab}${isActive ? ` ${styles.active}` : ''}${isToday ? ` ${styles.today}` : ''}`}
              onClick={() => onDayChange(day)}
            >
              <span className={styles.dayNum}>Day {day}</span>
              <span className={styles.dateStr}>{date} {weekday}{isToday ? ' ●' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
