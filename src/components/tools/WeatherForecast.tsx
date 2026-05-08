import { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { weatherCodeToEmoji, weatherCodeToText } from '../../utils/weatherCode';
import styles from './WeatherForecast.module.css';

const DAY_LABELS: Record<string, string> = {
  '2026-05-09': 'Day 1 (六)',
  '2026-05-10': 'Day 2 (日)',
  '2026-05-11': 'Day 3 (一)',
  '2026-05-12': 'Day 4 (二)',
  '2026-05-13': 'Day 5 (三)',
};

function formatUpdated(ts: number | null): string {
  if (!ts) return '';
  const d = new Date(ts);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `最後更新 ${hh}:${mm}`;
}

export function WeatherForecast() {
  const { days, updatedAt, isFallback } = useWeather();
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  return (
    <div className={styles.card}>
      <div className={styles.title}>🌤️ 天氣預報（首爾）</div>

      {days.map(day => {
        const isOpen = expandedDate === day.date;
        return (
          <div key={day.date}>
            <div
              className={styles.dayRow}
              onClick={() => setExpandedDate(isOpen ? null : day.date)}
            >
              <div className={styles.dateBlock}>
                <div className={styles.dateStr}>{day.date.slice(5)}</div>
                <div className={styles.dayLabel}>{DAY_LABELS[day.date] ?? ''}</div>
              </div>
              <span className={styles.weatherEmoji}>{weatherCodeToEmoji(day.weather_code)}</span>
              <div className={styles.tempRange}>
                <div>
                  <span className={styles.tempHigh}>{day.temp_max}°</span>
                  <span className={styles.tempLow}>{day.temp_min}°</span>
                </div>
                <div className={styles.precip}>☂ {day.precip_prob != null ? `${day.precip_prob}%` : '—'}</div>
                <div className={styles.weatherText}>{weatherCodeToText(day.weather_code)}</div>
              </div>
              <span className={`${styles.chevron}${isOpen ? ` ${styles.open}` : ''}`}>▼</span>
            </div>

            {isOpen && day.hourly && day.hourly.length > 0 && (
              <div className={styles.hourlyGrid}>
                {day.hourly.filter((_, i) => i % 3 === 0).map(h => (
                  <div key={h.time} className={styles.hourCell}>
                    <div className={styles.hourTime}>{h.time}</div>
                    <span className={styles.hourEmoji}>{weatherCodeToEmoji(h.weather_code)}</span>
                    <div className={styles.hourTemp}>{h.temp}°</div>
                    <div className={styles.hourPrecip}>{h.precip_prob != null ? `${h.precip_prob}%` : '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className={styles.meta}>
        {isFallback ? '⚠️ 顯示靜態預測資料' : formatUpdated(updatedAt)}
      </div>
    </div>
  );
}
