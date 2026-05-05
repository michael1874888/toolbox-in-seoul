import { useState, useEffect } from 'react';

const FALLBACK_RATE = 46.6;
const CACHE_KEY = 'seoul-exchange-rate-v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const API_URL = 'https://open.er-api.com/v6/latest/TWD';

interface CacheEntry {
  rate: number;
  timestamp: number;
}

function loadCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) return entry;
    return null;
  } catch {
    return null;
  }
}

function saveCache(rate: number): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ rate, timestamp: Date.now() }));
  } catch { /* ignore */ }
}

function loadStaleCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CacheEntry) : null;
  } catch {
    return null;
  }
}

export interface ExchangeRateState {
  rate: number;
  updatedAt: number | null;
  isLoading: boolean;
  isFallback: boolean;
}

export function useExchangeRate(): ExchangeRateState {
  const cached = loadCache();
  const [state, setState] = useState<ExchangeRateState>({
    rate: cached?.rate ?? FALLBACK_RATE,
    updatedAt: cached?.timestamp ?? null,
    isLoading: !cached,
    isFallback: !cached,
  });

  useEffect(() => {
    if (cached) return;

    let cancelled = false;
    fetch(API_URL)
      .then(r => r.json())
      .then((data: { rates?: { KRW?: number } }) => {
        if (cancelled) return;
        const rate = data?.rates?.KRW;
        if (rate && rate > 0) {
          saveCache(rate);
          setState({ rate, updatedAt: Date.now(), isLoading: false, isFallback: false });
        } else {
          throw new Error('invalid rate');
        }
      })
      .catch(() => {
        if (cancelled) return;
        const stale = loadStaleCache();
        setState({
          rate: stale?.rate ?? FALLBACK_RATE,
          updatedAt: stale?.timestamp ?? null,
          isLoading: false,
          isFallback: true,
        });
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
