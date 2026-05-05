import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChecklist } from '../../hooks/useChecklist';

describe('Phase4: useChecklist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('初始狀態所有項目未勾選', () => {
    const { result } = renderHook(() => useChecklist());
    expect(Object.values(result.current.checked).every(v => !v)).toBe(true);
    expect(result.current.completedCount).toBe(0);
  });

  it('勾選後 localStorage 寫入正確值', () => {
    const { result } = renderHook(() => useChecklist());
    act(() => { result.current.toggle('passport'); });
    const stored = JSON.parse(localStorage.getItem('seoul-checklist-v1') ?? '{}');
    expect(stored['passport']).toBe(true);
  });

  it('再次 toggle 可取消勾選', () => {
    const { result } = renderHook(() => useChecklist());
    act(() => { result.current.toggle('passport'); });
    act(() => { result.current.toggle('passport'); });
    expect(result.current.checked['passport']).toBe(false);
  });

  it('completedCount 正確計算', () => {
    const { result } = renderHook(() => useChecklist());
    act(() => { result.current.toggle('passport'); });
    act(() => { result.current.toggle('esim'); });
    expect(result.current.completedCount).toBe(2);
  });

  it('重新載入後狀態從 localStorage 恢復', () => {
    localStorage.setItem('seoul-checklist-v1', JSON.stringify({ passport: true, esim: true }));
    const { result } = renderHook(() => useChecklist());
    expect(result.current.checked['passport']).toBe(true);
    expect(result.current.checked['esim']).toBe(true);
    expect(result.current.completedCount).toBe(2);
  });
});
