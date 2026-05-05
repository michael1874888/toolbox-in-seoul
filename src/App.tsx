import { useState } from 'react';
import type { TabId } from './types';
import { TopBar } from './components/layout/TopBar';
import { TabBar } from './components/layout/TabBar';
import { ChecklistPage } from './components/checklist/ChecklistPage';
import { SchedulePage } from './components/schedule/SchedulePage';
import { InfoPage } from './components/info/InfoPage';
import { ToolsPage } from './components/tools/ToolsPage';
import './styles/global.css';

const PAGE_BOTTOM_PADDING = 'calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px) + 8px)';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('schedule');

  return (
    <>
      <TopBar />
      <main style={{ paddingBottom: PAGE_BOTTOM_PADDING, flex: 1 }}>
        {activeTab === 'checklist' && <ChecklistPage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'info' && <InfoPage />}
        {activeTab === 'tools' && <ToolsPage />}
      </main>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
