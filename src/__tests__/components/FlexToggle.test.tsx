import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlexToggle } from '../../components/schedule/FlexToggle';
import type { ScheduleItem } from '../../types';

const makeItem = (id: string, name_zh: string): ScheduleItem => ({
  id,
  day: 3,
  plan: 'common',
  type: 'attraction',
  time_start: '10:00',
  time_end: '12:00',
  name_zh,
  name_kr: id,
  summary: name_zh,
  naver_map_query: id,
  flex_group: 'day3-morning',
  flex_default: id === 'item-a',
});

describe('FlexToggle', () => {
  const items = [makeItem('item-a', 'COEX 圖書館'), makeItem('item-b', '狎鷗亭')];

  it('renders all item names as buttons', () => {
    render(<FlexToggle items={items} activeId="item-a" onSelect={vi.fn()} />);
    expect(screen.getByText('COEX 圖書館')).toBeInTheDocument();
    expect(screen.getByText('狎鷗亭')).toBeInTheDocument();
  });

  it('calls onSelect with the correct id when a button is clicked', async () => {
    const onSelect = vi.fn();
    render(<FlexToggle items={items} activeId="item-a" onSelect={onSelect} />);
    await userEvent.click(screen.getByText('狎鷗亭'));
    expect(onSelect).toHaveBeenCalledWith('item-b');
  });
});
