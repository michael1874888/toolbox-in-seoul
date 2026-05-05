import { checklistData } from '../../data/checklist';
import { useChecklist } from '../../hooks/useChecklist';
import { ChecklistItem } from './ChecklistItem';
import styles from './ChecklistPage.module.css';

const TOTAL = checklistData.length;

const CATEGORY_ORDER = ['證件', '通訊', '電子', '現金', '盥洗', 'APP'];

export function ChecklistPage() {
  const { checked, toggle, completedCount } = useChecklist();
  const progressPct = Math.round((completedCount / TOTAL) * 100);
  const isComplete = completedCount === TOTAL;

  const byCategory = CATEGORY_ORDER.map(cat => ({
    category: cat,
    items: checklistData.filter(i => i.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div className={styles.page}>
      {/* Progress bar */}
      <div className={styles.progressCard}>
        <div className={styles.progressTitle}>行前準備</div>
        <div className={styles.progressText}>
          已完成 {completedCount} / {TOTAL} 項{isComplete ? ' 🎉 全部完成！' : ''}
        </div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill}${isComplete ? ` ${styles.complete}` : ''}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Category sections */}
      {byCategory.map(({ category, items }) => (
        <div key={category} className={styles.section}>
          <div className={styles.sectionTitle}>{category}</div>
          {items.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              checked={!!checked[item.id]}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
