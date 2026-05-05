import { useState } from 'react';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import styles from './CurrencyConverter.module.css';

const QUICK_KRW = [1000, 5000, 10000, 50000, 100000];
const QUICK_TWD = [100, 500, 1000, 5000];

function formatNum(n: number): string {
  return n.toLocaleString('zh-TW', { maximumFractionDigits: 1 });
}

function formatTime(ts: number | null): string {
  if (!ts) return '';
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export function CurrencyConverter() {
  const { rate, updatedAt, isFallback, isLoading } = useExchangeRate();
  const [krwToTwd, setKrwToTwd] = useState(true);
  const [input, setInput] = useState('');

  const parsed = parseFloat(input.replace(/,/g, ''));
  const amount = isNaN(parsed) || parsed < 0 ? 0 : parsed;
  const converted = krwToTwd
    ? amount / rate
    : amount * rate;

  const fromLabel = krwToTwd ? 'KRW 韓元' : 'TWD 台幣';
  const toLabel   = krwToTwd ? 'TWD 台幣' : 'KRW 韓元';
  const quickAmounts = krwToTwd ? QUICK_KRW : QUICK_TWD;

  return (
    <div className={styles.card}>
      <div className={styles.title}>💱 匯率換算</div>

      <div className={styles.dirRow}>
        <span className={styles.dirLabel}>{fromLabel} → {toLabel}</span>
        <button
          className={styles.swapBtn}
          aria-label="切換換算方向"
          onClick={() => { setKrwToTwd(v => !v); setInput(''); }}
        >
          ⇆
        </button>
      </div>

      <div className={styles.inputRow}>
        <span className={styles.currency}>{krwToTwd ? '₩' : 'NT$'}</span>
        <input
          className={styles.input}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          placeholder="輸入金額"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className={styles.inputRow}>
        <span className={styles.currency}>{krwToTwd ? 'NT$' : '₩'}</span>
        <div className={styles.result}>
          {amount > 0 ? formatNum(converted) : '—'}
        </div>
      </div>

      <div className={styles.quickButtons}>
        {quickAmounts.map(v => (
          <button key={v} className={styles.quickBtn} onClick={() => setInput(String(v))}>
            {v.toLocaleString()}
          </button>
        ))}
      </div>

      <div className={styles.meta}>
        {isLoading
          ? '匯率更新中...'
          : `1 TWD ≈ ${rate.toFixed(2)} KRW${isFallback ? '（預設匯率）' : updatedAt ? `｜更新於 ${formatTime(updatedAt)}` : ''}`}
      </div>
    </div>
  );
}
