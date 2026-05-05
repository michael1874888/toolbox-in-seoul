import type { SubItem } from '../../types';
import { NaverMapLink } from './NaverMapLink';
import styles from './SubItemList.module.css';

interface SubItemListProps {
  items: SubItem[];
}

export function SubItemList({ items }: SubItemListProps) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <span className={styles.category}>{item.category}</span>
          <div className={styles.info}>
            <span className={styles.name}>{item.name_zh}</span>
            {item.name_kr && <span className={styles.nameKr}>{item.name_kr}</span>}
            {item.note && <div className={styles.note}>{item.note}</div>}
            {item.hours && <div className={styles.note}>⏰ {item.hours}</div>}
          </div>
          {item.naver_map_query && (
            <div className={styles.actions}>
              <NaverMapLink query={item.naver_map_query} small />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
