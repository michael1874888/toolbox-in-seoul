import { describe, it, expect } from 'vitest';
import { weatherCodeToEmoji, weatherCodeToText } from '../../utils/weatherCode';

describe('weatherCodeToEmoji', () => {
  it('returns sun for code 0 (clear sky)', () => {
    expect(weatherCodeToEmoji(0)).toBe('☀️');
  });

  it('returns cloud for code 2 (partly cloudy)', () => {
    expect(weatherCodeToEmoji(2)).toBe('⛅');
  });

  it('returns rain emoji for code 61 (light rain)', () => {
    expect(weatherCodeToEmoji(61)).toBe('🌧️');
  });

  it('returns thunder emoji for code 95 (thunderstorm)', () => {
    expect(weatherCodeToEmoji(95)).toBe('⛈️');
  });

  it('returns fallback for unknown code', () => {
    expect(weatherCodeToEmoji(999)).toBe('❓');
  });
});

describe('weatherCodeToText', () => {
  it('returns text for clear sky', () => {
    expect(weatherCodeToText(0)).toBe('晴天');
  });

  it('returns text for overcast', () => {
    expect(weatherCodeToText(3)).toBe('陰天');
  });

  it('returns text for heavy rain', () => {
    expect(weatherCodeToText(63)).toBe('中雨');
  });

  it('returns fallback for unknown code', () => {
    expect(weatherCodeToText(999)).toBe('未知');
  });
});
