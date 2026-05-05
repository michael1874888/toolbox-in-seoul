import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useExchangeRate } from '../../hooks/useExchangeRate';

const CACHE_KEY = 'seoul-exchange-rate-v1';
const FALLBACK_RATE = 46.6;

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useExchangeRate', () => {
  it('returns fallback rate when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network error'));
    const { result } = renderHook(() => useExchangeRate());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.rate).toBe(FALLBACK_RATE);
  });

  it('uses cached rate when cache is fresh', async () => {
    const cached = { rate: 42.5, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { result } = renderHook(() => useExchangeRate());
    await waitFor(() => {
      expect(result.current.rate).toBe(42.5);
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches fresh rate when cache is expired', async () => {
    const stale = { rate: 42.5, timestamp: Date.now() - 25 * 60 * 60 * 1000 };
    localStorage.setItem(CACHE_KEY, JSON.stringify(stale));
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ rates: { KRW: 38.2 } }),
    } as Response);
    const { result } = renderHook(() => useExchangeRate());
    await waitFor(() => {
      expect(result.current.rate).toBe(38.2);
    });
  });

  it('falls back when API response has unexpected shape', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ unexpected: 'shape' }),
    } as Response);
    const { result } = renderHook(() => useExchangeRate());
    await waitFor(() => {
      expect(result.current.rate).toBe(FALLBACK_RATE);
    });
  });
});
