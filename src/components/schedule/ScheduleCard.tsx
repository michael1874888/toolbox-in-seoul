import type { ReactElement } from 'react';
import { Landmark, Utensils, ShoppingBag, Train, Cookie, AlertTriangle, Lightbulb, Globe } from 'lucide-react';
import type { ScheduleItem, CardType } from '../../types';
import { useKoreaTime } from '../../hooks/useKoreaTime';
import { getRestaurantStatus } from '../../utils/restaurantStatus';
import { StatusBadge } from './StatusBadge';
import { CopyButton } from './CopyButton';
import { NaverMapLink } from './NaverMapLink';
import { SubItemList } from './SubItemList';
import styles from './ScheduleCard.module.css';

const TYPE_ICON: Record<CardType, ReactElement> = {
  attraction: <Landmark size={22} />,
  restaurant: <Utensils size={22} />,
  shopping: <ShoppingBag size={22} />,
  transport: <Train size={22} />,
  snack: <Cookie size={22} />,
};

interface ScheduleCardProps {
  item: ScheduleItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ScheduleCard({ item, isExpanded, onToggle }: ScheduleCardProps) {
  const now = useKoreaTime();
  const status = item.type === 'restaurant'
    ? getRestaurantStatus(item, now)
    : null;

  return (
    <article className={`${styles.card} ${styles[item.type]}`}>
      <button className={styles.header} onClick={onToggle} aria-expanded={isExpanded}>
        <span className={styles.typeIcon}>{TYPE_ICON[item.type]}</span>
        <div className={styles.headerMain}>
          <div className={styles.timeRange}>{item.time_start} – {item.time_end}</div>
          <div className={styles.name}>{item.name_zh}</div>
        </div>
        <div className={styles.headerMeta}>
          {status && <StatusBadge status={status} />}
          <span className={`${styles.chevron}${isExpanded ? ` ${styles.open}` : ''}`}>▼</span>
        </div>
      </button>

      {isExpanded && (
        <div className={styles.body}>
          {/* Korean + English names with copy */}
          <div className={styles.row}>
            <span className={styles.rowLabel}>韓文</span>
            <span className={`${styles.rowValue} ${styles.krText}`}>{item.name_kr}</span>
            <CopyButton text={item.name_kr} />
          </div>
          {item.name_en && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>英文</span>
              <span className={styles.rowValue}>{item.name_en}</span>
            </div>
          )}

          {/* Korean address with copy */}
          {item.address_kr && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>地址</span>
              <span className={`${styles.rowValue} ${styles.krText}`}>{item.address_kr}</span>
              <CopyButton text={item.address_kr} label="複製地址" />
            </div>
          )}

          {/* Hours */}
          {item.hours && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>時間</span>
              <div className={styles.rowValue}>
                <span>{item.hours}</span>
                {item.break_start && item.break_end && (
                  <div className={styles.hoursBreak}>
                    <AlertTriangle size={13} aria-hidden="true" /> {item.break_start}–{item.break_end} 休息
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price */}
          {item.price && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>費用</span>
              <span className={`${styles.rowValue} ${styles.price}`}>{item.price}</span>
            </div>
          )}

          {/* NAVER rating */}
          {item.naver_rating && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>評價</span>
              <span className={`${styles.rowValue} ${styles.rating}`}>
                ★ {item.naver_rating} / 5
              </span>
            </div>
          )}

          {/* Details */}
          {item.details && (
            <div className={styles.details}>{item.details}</div>
          )}

          {/* Tips */}
          {item.tips && item.tips.length > 0 && (
            <div className={styles.tipsSection}>
              {item.tips.map((tip, i) => (
                <div key={i} className={styles.tip}>
                  <Lightbulb size={13} aria-hidden="true" className={styles.tipIcon} />
                  {tip}
                </div>
              ))}
            </div>
          )}

          {/* Sub items */}
          {item.sub_items && item.sub_items.length > 0 && (
            <div className={styles.subSection}>
              <div className={styles.subTitle}>推薦店家 / 活動</div>
              <SubItemList items={item.sub_items} />
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <NaverMapLink query={item.naver_map_query} />
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                <Globe size={14} aria-hidden="true" /> 官方網站
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
