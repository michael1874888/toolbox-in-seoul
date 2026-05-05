import { useState } from 'react';
import { useKoreaTime } from '../../hooks/useKoreaTime';
import { useNextEvent } from '../../hooks/useNextEvent';
import { DayTabs } from './DayTabs';
import { PlanToggle } from './PlanToggle';
import { Timeline } from './Timeline';

const TRIP_DATES: Record<number, string> = {
  1: '2026-05-09',
  2: '2026-05-10',
  3: '2026-05-11',
  4: '2026-05-12',
  5: '2026-05-13',
};

function getTodayTripDay(now: Date): 1 | 2 | 3 | 4 | 5 {
  const str = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const found = Object.entries(TRIP_DATES).find(([, d]) => d === str);
  return found ? (Number(found[0]) as 1 | 2 | 3 | 4 | 5) : 1;
}

export function SchedulePage() {
  const now = useKoreaTime();
  const todayDay = getTodayTripDay(now);
  const [activeDay, setActiveDay] = useState<1 | 2 | 3 | 4 | 5>(todayDay);
  const [activePlan, setActivePlan] = useState<'A' | 'B'>('A');
  const hasPlan = activeDay === 2 || activeDay === 4;
  const countdown = useNextEvent(activeDay, activePlan);

  return (
    <div>
      <DayTabs activeDay={activeDay} onDayChange={setActiveDay} />
      {hasPlan && (
        <PlanToggle activePlan={activePlan} onPlanChange={setActivePlan} />
      )}
      {countdown && (
        <div style={{
          padding: '8px 16px',
          fontSize: '12px',
          color: '#2a5a6a',
          background: 'var(--color-primary-light)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          ⏱ {countdown}
        </div>
      )}
      <Timeline day={activeDay} plan={activePlan} />
    </div>
  );
}
