import { describe, it, expect } from 'vitest';
import { getRestaurantStatus } from '../../utils/restaurantStatus';

describe('Phase3: Restaurant Status', () => {
  // 光化門豬肉湯飯：12:00-21:00，休息 15:00-17:00
  const gwanghwamun = {
    hours_open: '12:00',
    hours_close: '21:00',
    break_start: '15:00',
    break_end: '17:00',
  };

  it('營業時間內 → open', () => {
    const d = new Date('2026-05-09T12:30:00');
    expect(getRestaurantStatus(gwanghwamun, d)).toBe('open');
  });

  it('休息時間內 → break', () => {
    const d = new Date('2026-05-09T15:30:00');
    expect(getRestaurantStatus(gwanghwamun, d)).toBe('break');
  });

  it('打烊後 → closed', () => {
    const d = new Date('2026-05-09T21:30:00');
    expect(getRestaurantStatus(gwanghwamun, d)).toBe('closed');
  });

  it('開門前 → closed', () => {
    const d = new Date('2026-05-09T08:00:00');
    expect(getRestaurantStatus(gwanghwamun, d)).toBe('closed');
  });

  // NO MORE PIZZA：10:00-03:00（跨日）
  const pizza = { hours_open: '10:00', hours_close: '03:00' };

  it('跨日：凌晨 01:00 → open', () => {
    const d = new Date('2026-05-10T01:00:00');
    expect(getRestaurantStatus(pizza, d)).toBe('open');
  });

  it('跨日：凌晨 04:00 → closed', () => {
    const d = new Date('2026-05-10T04:00:00');
    expect(getRestaurantStatus(pizza, d)).toBe('closed');
  });

  it('跨日：正午 12:00 → open', () => {
    const d = new Date('2026-05-10T12:00:00');
    expect(getRestaurantStatus(pizza, d)).toBe('open');
  });

  it('無營業時間 → null', () => {
    expect(getRestaurantStatus({}, new Date())).toBeNull();
  });
});
