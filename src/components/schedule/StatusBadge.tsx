import type { RestaurantStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: RestaurantStatus;
}

const STATUS_CONFIG: Record<RestaurantStatus, { label: string; className: string }> = {
  open: { label: '● 營業中', className: styles.open },
  break: { label: '⚠️ 目前休息中', className: styles.break },
  closed: { label: '● 已打烊', className: styles.closed },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`${styles.badge} ${config.className}`}>
      {config.label}
    </span>
  );
}
