import type { ChecklistItem as ChecklistItemType } from '../../types';
import styles from './ChecklistItem.module.css';

interface ChecklistItemProps {
  item: ChecklistItemType;
  checked: boolean;
  onToggle: () => void;
}

export function ChecklistItem({ item, checked, onToggle }: ChecklistItemProps) {
  return (
    <div className={styles.item} onClick={onToggle} role="checkbox" aria-checked={checked}>
      <div className={`${styles.checkbox}${checked ? ` ${styles.checked}` : ''}`}>
        {checked && <span className={styles.checkmark}>✓</span>}
      </div>
      <div className={styles.content}>
        <div className={`${styles.label}${checked ? ` ${styles.checked}` : ''}`}>
          {item.label}
        </div>
        {item.warning && <div className={styles.warning}>{item.warning}</div>}
        {item.note && <div className={styles.note}>{item.note}</div>}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={e => e.stopPropagation()}
          >
            🔗 下載 / 開啟
          </a>
        )}
      </div>
    </div>
  );
}
