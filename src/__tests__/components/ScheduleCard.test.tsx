import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScheduleCard } from '../../components/schedule/ScheduleCard';
import { setTimeOverride } from '../../utils/timeOverride';
import type { ScheduleItem } from '../../types';

const baseItem: ScheduleItem = {
  id: 'test-item',
  day: 1,
  plan: 'common',
  type: 'attraction',
  time_start: '10:00',
  time_end: '12:00',
  name_zh: '景福宮',
  name_kr: '경복궁',
  name_en: 'Gyeongbokgung',
  address_kr: '서울 종로구 사직로 161',
  summary: '朝鮮最大宮殿',
  naver_map_query: '경복궁',
  details: '朝鮮最大宮殿',
  price: '3,000 韓元',
  tips: ['穿韓服免費'],
};

beforeEach(() => {
  setTimeOverride(new Date('2026-05-09T11:00:00+09:00'));
});

describe('ScheduleCard collapsed', () => {
  it('shows name and time range', () => {
    render(<ScheduleCard item={baseItem} isExpanded={false} onToggle={vi.fn()} />);
    expect(screen.getByText('景福宮')).toBeInTheDocument();
    expect(screen.getByText('10:00 – 12:00')).toBeInTheDocument();
  });

  it('does not show expanded details when collapsed', () => {
    render(<ScheduleCard item={baseItem} isExpanded={false} onToggle={vi.fn()} />);
    expect(screen.queryByText('朝鮮最大宮殿')).not.toBeInTheDocument();
    expect(screen.queryByText('경복궁')).not.toBeInTheDocument();
  });

  it('calls onToggle when header is clicked', async () => {
    const onToggle = vi.fn();
    render(<ScheduleCard item={baseItem} isExpanded={false} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: /景福宮/i }));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});

describe('ScheduleCard expanded', () => {
  it('shows Korean name in expanded state', () => {
    render(<ScheduleCard item={baseItem} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText('경복궁')).toBeInTheDocument();
  });

  it('shows address in expanded state', () => {
    render(<ScheduleCard item={baseItem} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText('서울 종로구 사직로 161')).toBeInTheDocument();
  });

  it('shows details text in expanded state', () => {
    render(<ScheduleCard item={baseItem} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText('朝鮮最大宮殿')).toBeInTheDocument();
  });

  it('shows tips in expanded state', () => {
    render(<ScheduleCard item={baseItem} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText(/穿韓服免費/)).toBeInTheDocument();
  });

  it('renders sub_items when present', () => {
    const itemWithSubs: ScheduleItem = {
      ...baseItem,
      sub_items: [{ name_zh: '子店家A', name_kr: '서브A', category: '逛', naver_map_query: '서브A' }],
    };
    render(<ScheduleCard item={itemWithSubs} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText('子店家A')).toBeInTheDocument();
  });

  it('does not render sub_items section when absent', () => {
    render(<ScheduleCard item={baseItem} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.queryByText('推薦店家 / 活動')).not.toBeInTheDocument();
  });
});
