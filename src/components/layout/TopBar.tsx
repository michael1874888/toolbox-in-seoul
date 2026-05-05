import { useKoreaTime } from '../../hooks/useKoreaTime';
import styles from './TopBar.module.css';

interface TopBarProps {
  countdown?: string | null;
}

export function TopBar({ countdown }: TopBarProps) {
  const time = useKoreaTime();

  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const ss = time.getSeconds().toString().padStart(2, '0');

  return (
    <header className={styles.topBar}>
      <span className={styles.title}>工具箱 in Seoul</span>
      <div className={styles.timeBlock}>
        <span className={styles.timeLabel}>首爾時間 KST</span>
        <span className={styles.time}>{hh}:{mm}:{ss}</span>
        {countdown && <span className={styles.countdown}>{countdown}</span>}
      </div>
    </header>
  );
}
