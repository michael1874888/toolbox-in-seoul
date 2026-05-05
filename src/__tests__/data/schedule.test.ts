import { describe, it, expect } from 'vitest';
import { scheduleData } from '../../data/schedule';
import { flightsData } from '../../data/flights';
import { checklistData } from '../../data/checklist';
import { personalBudget } from '../../data/budget';

describe('Phase1: Schedule Data Integrity', () => {
  it('每天至少有 1 張卡片', () => {
    for (let day = 1; day <= 5; day++) {
      const cards = scheduleData.filter(c => c.day === day);
      expect(cards.length, `Day ${day} 應有卡片`).toBeGreaterThan(0);
    }
  });

  it('卡片總數在合理範圍（37~45 張）', () => {
    expect(scheduleData.length).toBeGreaterThanOrEqual(37);
    expect(scheduleData.length).toBeLessThanOrEqual(45);
  });

  it('Day 2 Plan A 有卡片', () => {
    const cards = scheduleData.filter(c => c.day === 2 && c.plan === 'A');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('Day 2 Plan B 有卡片', () => {
    const cards = scheduleData.filter(c => c.day === 2 && c.plan === 'B');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('Day 4 Plan A 有卡片', () => {
    const cards = scheduleData.filter(c => c.day === 4 && c.plan === 'A');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('Day 4 Plan B 有卡片', () => {
    const cards = scheduleData.filter(c => c.day === 4 && c.plan === 'B');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('所有卡片 ID 唯一', () => {
    const ids = scheduleData.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('景福宮兩張卡片 id 不同但 naver_map_query 相同', () => {
    const tour = scheduleData.find(c => c.id === 'day2-gyeongbok-tour');
    const photo = scheduleData.find(c => c.id === 'day2-gyeongbok-photo');
    expect(tour).toBeDefined();
    expect(photo).toBeDefined();
    expect(tour!.id).not.toBe(photo!.id);
    expect(tour!.naver_map_query).toBe(photo!.naver_map_query);
  });

  it('所有卡片都有 naver_map_query 且非空', () => {
    scheduleData.forEach(c => {
      expect(c.naver_map_query, `${c.id} 缺少 naver_map_query`).toBeTruthy();
      expect(c.naver_map_query.trim().length, `${c.id} naver_map_query 為空`).toBeGreaterThan(0);
    });
  });

  it('所有餐廳卡片都有 hours_open', () => {
    const restaurants = scheduleData.filter(c => c.type === 'restaurant');
    restaurants.forEach(c => {
      expect(c.hours_open, `${c.id} 餐廳缺少 hours_open`).toBeDefined();
    });
  });

  it('flex_group 內恰好有 1 張 flex_default: true', () => {
    const groups = new Map<string, typeof scheduleData>();
    scheduleData.forEach(c => {
      if (c.flex_group) {
        if (!groups.has(c.flex_group)) groups.set(c.flex_group, []);
        groups.get(c.flex_group)!.push(c);
      }
    });
    expect(groups.size).toBeGreaterThan(0);
    groups.forEach((cards, group) => {
      const defaults = cards.filter(c => c.flex_default === true);
      expect(defaults.length, `${group} 應恰好有 1 張 flex_default:true`).toBe(1);
    });
  });

  it('flex_group 內恰好有 2 張卡片', () => {
    const groups = new Map<string, typeof scheduleData>();
    scheduleData.forEach(c => {
      if (c.flex_group) {
        if (!groups.has(c.flex_group)) groups.set(c.flex_group, []);
        groups.get(c.flex_group)!.push(c);
      }
    });
    groups.forEach((cards, group) => {
      expect(cards.length, `${group} 應恰好有 2 張卡片`).toBe(2);
    });
  });

  it('跨日營業：NO MORE PIZZA close < open', () => {
    const pizza = scheduleData.find(c => c.id === 'day1-no-more-pizza');
    expect(pizza).toBeDefined();
    expect(pizza!.hours_open).toBe('10:00');
    expect(pizza!.hours_close).toBe('03:00');
    expect(pizza!.hours_close! < pizza!.hours_open!).toBe(true);
  });

  it('大瓦房沒有錯誤的樂天超市連結', () => {
    const giwajip = scheduleData.filter(c => c.id.includes('keun-giwajip'));
    expect(giwajip.length).toBeGreaterThan(0);
    giwajip.forEach(c => {
      expect(c.website ?? '').not.toContain('lottemartzetta');
    });
  });

  it('所有韓文名稱非空', () => {
    scheduleData.forEach(c => {
      expect(c.name_kr, `${c.id} 缺少 name_kr`).toBeTruthy();
      expect(c.name_kr.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('Phase1: Flights Data', () => {
  it('3 人各有去回 2 航班', () => {
    expect(flightsData.length).toBe(3);
    flightsData.forEach(person => {
      expect(person.flights.length).toBe(2);
      const outbound = person.flights.filter(f => f.direction === 'outbound');
      const inbound = person.flights.filter(f => f.direction === 'inbound');
      expect(outbound.length).toBe(1);
      expect(inbound.length).toBe(1);
    });
  });

  it('Umi 去程為 ZIPAIR', () => {
    const umi = flightsData.find(p => p.person === 'Umi');
    expect(umi).toBeDefined();
    const outbound = umi!.flights.find(f => f.direction === 'outbound');
    expect(outbound!.airline).toContain('ZIPAIR');
  });
});

describe('Phase1: Checklist Data', () => {
  it('恰好有 11 項', () => {
    expect(checklistData.length).toBe(11);
  });

  it('包含 APP 類別', () => {
    const apps = checklistData.filter(c => c.category === 'APP');
    expect(apps.length).toBe(4);
  });
});

describe('Phase1: Budget Data', () => {
  it('景福宮門票 amount_krw 為 0', () => {
    const gyeongbok = personalBudget.find(b => b.label.includes('景福宮'));
    expect(gyeongbok).toBeDefined();
    expect(gyeongbok!.amount_krw).toBe(0);
  });
});
