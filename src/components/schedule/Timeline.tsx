import { useState, useMemo } from 'react';
import type { ScheduleItem } from '../../types';
import { scheduleData } from '../../data/schedule';
import { ScheduleCard } from './ScheduleCard';
import { TransportBadge } from './TransportBadge';
import { FlexToggle } from './FlexToggle';
import styles from './Timeline.module.css';

interface TimelineProps {
  day: 1 | 2 | 3 | 4 | 5;
  plan: 'A' | 'B';
}

export function Timeline({ day, plan }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flexSelections, setFlexSelections] = useState<Record<string, string>>({});

  const dayItems = useMemo(() => {
    return scheduleData.filter(item => {
      if (item.day !== day) return false;
      if (item.plan !== 'common' && item.plan !== plan) return false;
      return true;
    });
  }, [day, plan]);

  // Group flex items by flex_group
  const flexGroups = useMemo(() => {
    const groups: Record<string, ScheduleItem[]> = {};
    dayItems.forEach(item => {
      if (item.flex_group) {
        if (!groups[item.flex_group]) groups[item.flex_group] = [];
        groups[item.flex_group].push(item);
      }
    });
    return groups;
  }, [dayItems]);

  const getFlexActive = (group: string): string => {
    if (flexSelections[group]) return flexSelections[group];
    const groupItems = flexGroups[group] ?? [];
    const defaultItem = groupItems.find(i => i.flex_default);
    return defaultItem?.id ?? groupItems[0]?.id ?? '';
  };

  // Build the visible list (dedup flex groups to only show active)
  const visibleItems = useMemo(() => {
    const seen = new Set<string>();
    const result: ScheduleItem[] = [];
    dayItems.forEach(item => {
      if (item.flex_group) {
        if (seen.has(item.flex_group)) return;
        seen.add(item.flex_group);
        const activeId = getFlexActive(item.flex_group);
        const active = flexGroups[item.flex_group]?.find(i => i.id === activeId);
        if (active) result.push(active);
      } else {
        result.push(item);
      }
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayItems, flexSelections, flexGroups]);

  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      {visibleItems.map((item, idx) => {
        const flexGroup = item.flex_group
          ? flexGroups[item.flex_group]
          : null;

        return (
          <div key={item.id} className={styles.cardWrapper}>
            {/* Transport from previous */}
            {idx > 0 && item.transport_from_prev && item.transport_from_prev.length > 0 && (
              <div className={styles.transportWrapper}>
                <TransportBadge options={item.transport_from_prev} />
              </div>
            )}

            {/* Flex toggle before the card */}
            {flexGroup && (
              <FlexToggle
                items={flexGroup}
                activeId={getFlexActive(item.flex_group!)}
                onSelect={id => setFlexSelections(prev => ({ ...prev, [item.flex_group!]: id }))}
              />
            )}

            <ScheduleCard
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
