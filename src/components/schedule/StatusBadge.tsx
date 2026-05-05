import { AlertTriangle } from 'lucide-react';
import type { RestaurantStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: RestaurantStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'open') return <span className={`${styles.badge} ${styles.open}`}>● 營業中</span>;
  if (status === 'break') return (
    <span className={`${styles.badge} ${styles.break}`}>
      <AlertTriangle size={11} aria-hidden="true" /> 目前休息中
    </span>
  );
  return <span className={`${styles.badge} ${styles.closed}`}>● 已打烊</span>;
}
