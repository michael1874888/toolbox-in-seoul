import { personalBudget, sharedBudget } from '../../data/budget';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import type { BudgetItem } from '../../types';
import styles from './BudgetTable.module.css';

function krwToTwd(krw: number, rate: number): number {
  return Math.round(krw / rate);
}

function formatKrw(n: number): string {
  return n.toLocaleString();
}

const PAY_LABEL: Record<BudgetItem['payment'], string> = {
  cash: '現金',
  card: '刷卡',
  free: '免費',
  unknown: '未確認',
};

const PAY_CLASS: Record<BudgetItem['payment'], string> = {
  cash: styles.cash,
  card: styles.card,
  free: styles.free,
  unknown: styles.unknown,
};

function BudgetRow({ item, rate }: { item: BudgetItem; rate: number }) {
  const effectiveKrw = item.is_shared && item.share_count
    ? Math.round(item.amount_krw / item.share_count)
    : item.amount_krw;

  return (
    <div className={styles.row}>
      <div style={{ flex: 1 }}>
        <div className={styles.label}>{item.label}</div>
        {item.is_shared && item.share_count && (
          <div className={styles.note}>共攤 ÷{item.share_count} → 每人 {formatKrw(effectiveKrw)} KRW</div>
        )}
        {item.note && <div className={styles.note}>{item.note}</div>}
      </div>
      <span className={`${styles.payBadge} ${PAY_CLASS[item.payment]}`}>
        {PAY_LABEL[item.payment]}
      </span>
      <div className={styles.amount}>
        {item.payment === 'free' ? (
          <div className={styles.amountKrw}>免費</div>
        ) : (
          <>
            <div className={styles.amountKrw}>
              {item.is_estimate && <span className={styles.estimateMark}>~</span>}
              {formatKrw(effectiveKrw)} KRW
            </div>
            <div className={styles.amountTwd}>≈ {krwToTwd(effectiveKrw, rate)} TWD</div>
          </>
        )}
      </div>
    </div>
  );
}

export function BudgetTable() {
  const { rate } = useExchangeRate();

  const personalTotal = personalBudget
    .filter(i => i.payment !== 'free')
    .reduce((sum, i) => sum + i.amount_krw, 0);

  const sharedTotal = sharedBudget.reduce((sum, i) => {
    const perPerson = i.share_count ? Math.round(i.amount_krw / i.share_count) : i.amount_krw;
    return sum + perPerson;
  }, 0);

  const grandTotal = personalTotal + sharedTotal;

  return (
    <div className={styles.card}>
      <div className={styles.sectionHeader}>個人費用</div>
      {personalBudget.map((item, i) => (
        <BudgetRow key={i} item={item} rate={rate} />
      ))}

      <div className={styles.sectionHeader}>共攤費用（每人）</div>
      {sharedBudget.map((item, i) => (
        <BudgetRow key={i} item={item} rate={rate} />
      ))}

      <div className={styles.totalRow}>
        <div className={styles.totalLabel}>預估總計</div>
        <div>
          <div className={styles.totalAmount}>{formatKrw(grandTotal)} KRW</div>
          <div className={styles.totalTwd}>≈ {krwToTwd(grandTotal, rate)} TWD</div>
        </div>
      </div>
    </div>
  );
}
