import styles from './PlanToggle.module.css';

interface PlanToggleProps {
  activePlan: 'A' | 'B';
  onPlanChange: (plan: 'A' | 'B') => void;
}

export function PlanToggle({ activePlan, onPlanChange }: PlanToggleProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>今天行程：</span>
      <div className={styles.toggle}>
        {(['A', 'B'] as const).map(plan => (
          <button
            key={plan}
            className={`${styles.option}${activePlan === plan ? ` ${styles.active}` : ''}`}
            onClick={() => onPlanChange(plan)}
          >
            Plan {plan}
          </button>
        ))}
      </div>
    </div>
  );
}
