import type { ReactElement } from 'react';
import { ClipboardList, CalendarDays, Plane, Wrench } from 'lucide-react';
import type { TabId } from '../../types';
import styles from './TabBar.module.css';

interface TabConfig {
  id: TabId;
  icon: ReactElement;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'checklist', icon: <ClipboardList size={22} />, label: '行前' },
  { id: 'schedule', icon: <CalendarDays size={22} />, label: '行程' },
  { id: 'info', icon: <Plane size={22} />, label: '資訊' },
  { id: 'tools', icon: <Wrench size={22} />, label: '工具' },
];

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className={styles.tabBar} role="tablist">
      {TABS.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`${styles.tab}${activeTab === tab.id ? ` ${styles.active}` : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
