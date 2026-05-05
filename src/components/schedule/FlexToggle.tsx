import type { ScheduleItem } from '../../types';
import styles from './FlexToggle.module.css';

interface FlexToggleProps {
  items: ScheduleItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function FlexToggle({ items, activeId, onSelect }: FlexToggleProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>二擇一：</span>
      <div className={styles.toggle}>
        {items.map(item => (
          <button
            key={item.id}
            className={`${styles.option}${activeId === item.id ? ` ${styles.active}` : ''}`}
            onClick={() => onSelect(item.id)}
          >
            {item.name_zh}
          </button>
        ))}
      </div>
    </div>
  );
}
