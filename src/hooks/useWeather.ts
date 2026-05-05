import { useState, useEffect } from 'react';
import type { WeatherDay, WeatherHour } from '../types';
import { weatherFallback } from '../data/weather-fallback';

const CACHE_KEY = 'seoul-weather-v2';
const CACHE_TTL_MS = 3 * 60 * 60 * 1000;

// jma_seamless = JMA 無縫合體模型，東亞降雨預測精度優於 ECMWF/GFS 全球模型
const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978' +
  '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode' +
  '&hourly=temperature_2m,precipitation_probability,weathercode' +
  '&timezone=Asia%2FSeoul&start_date=2026-05-09&end_date=2026-05-13' +
  '&models=jma_seamless';

interface CacheEntry {
  data: WeatherDay[];
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

function parseApiResponse(json: Record<string, unknown>): WeatherDay[] {
  const daily = json.daily as Record<string, unknown[]>;
  const hourly = json.hourly as Record<string, unknown[]>;
  const dates = daily.time as string[];

  return dates.map((date, di) => {
    const dayHours: WeatherHour[] = [];
    (hourly.time as string[]).forEach((t, hi) => {
      if (t.startsWith(date)) {
        dayHours.push({
          time: t.slice(11, 16),
          temp: Math.round(hourly.temperature_2m[hi] as number),
          precip_prob: hourly.precipitation_probability[hi] as number,
          weather_code: hourly.weathercode[hi] as number,
        });
      }
    });
    return {
      date,
      temp_max: Math.round(daily.temperature_2m_max[di] as number),
      temp_min: Math.round(daily.temperature_2m_min[di] as number),
      precip_prob: daily.precipitation_probability_max[di] as number,
      weather_code: daily.weathercode[di] as number,
      hourly: dayHours,
    };
  });
}

export interface WeatherState {
  days: WeatherDay[];
  updatedAt: number | null;
  isLoading: boolean;
  isFallback: boolean;
}

async function fetchWeather(): Promise<WeatherDay[]> {
  const r = await fetch(API_URL);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as Record<string, unknown>;
  if (!json.daily || !json.hourly) throw new Error('Invalid API response shape');
  return parseApiResponse(json);
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>(() => {
    const cached = loadCache();
    return {
      days: cached?.data ?? weatherFallback,
      updatedAt: cached?.timestamp ?? null,
      isLoading: !cached,
      isFallback: !cached,
    };
  });

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const cached = loadCache();
      if (cached) {
        setState({ days: cached.data, updatedAt: cached.timestamp, isLoading: false, isFallback: false });
        return;
      }

      setState(prev => ({ ...prev, isLoading: true }));
      try {
        const days = await fetchWeather();
        if (cancelled) return;
        const entry: CacheEntry = { data: days, timestamp: Date.now() };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(entry)); } catch { /* quota exceeded */ }
        setState({ days, updatedAt: entry.timestamp, isLoading: false, isFallback: false });
      } catch {
        if (cancelled) return;
        setState(prev => ({ ...prev, isLoading: false, isFallback: true }));
      }
    }

    // App 切換回前景時重新檢查快取是否過期
    function onVisibilityChange() {
      if (document.visibilityState === 'visible') refresh();
    }

    refresh();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return state;
}
