import type { TransportOption, TransportMode } from '../../types';
import styles from './TransportBadge.module.css';

const MODE_ICON: Record<TransportMode, string> = {
  walk: '🚶',
  taxi: '🚕',
  bus: '🚌',
  subway: '🚇',
};

const MODE_LABEL: Record<TransportMode, string> = {
  walk: '步行',
  taxi: '計程車',
  bus: '公車',
  subway: '地鐵',
};

interface TransportBadgeProps {
  options: TransportOption[];
}

export function TransportBadge({ options }: TransportBadgeProps) {
  if (options.length === 0) return null;
  return (
    <div className={styles.container}>
      {options.map((opt, i) => (
        <span key={i} className={styles.badge}>
          <span className={styles.icon}>{MODE_ICON[opt.mode]}</span>
          {MODE_LABEL[opt.mode]} {opt.duration}
          {opt.detail && ` (${opt.detail})`}
        </span>
      ))}
    </div>
  );
}
