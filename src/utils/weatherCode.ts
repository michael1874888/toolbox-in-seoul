const CODE_MAP: Record<number, { emoji: string; text: string }> = {
  0:  { emoji: '☀️',  text: '晴天' },
  1:  { emoji: '🌤️', text: '大致晴朗' },
  2:  { emoji: '⛅',  text: '部分多雲' },
  3:  { emoji: '☁️',  text: '陰天' },
  45: { emoji: '🌫️', text: '霧' },
  48: { emoji: '🌫️', text: '結冰霧' },
  51: { emoji: '🌦️', text: '毛毛雨（輕）' },
  53: { emoji: '🌦️', text: '毛毛雨（中）' },
  55: { emoji: '🌦️', text: '毛毛雨（重）' },
  61: { emoji: '🌧️', text: '小雨' },
  63: { emoji: '🌧️', text: '中雨' },
  65: { emoji: '🌧️', text: '大雨' },
  71: { emoji: '🌨️', text: '小雪' },
  73: { emoji: '🌨️', text: '中雪' },
  75: { emoji: '🌨️', text: '大雪' },
  80: { emoji: '🌦️', text: '陣雨（輕）' },
  81: { emoji: '🌦️', text: '陣雨（中）' },
  82: { emoji: '🌦️', text: '陣雨（重）' },
  95: { emoji: '⛈️',  text: '雷雨' },
  96: { emoji: '⛈️',  text: '雷雨伴冰雹' },
  99: { emoji: '⛈️',  text: '強雷雨伴冰雹' },
};

export function weatherCodeToEmoji(code: number): string {
  return CODE_MAP[code]?.emoji ?? '❓';
}

export function weatherCodeToText(code: number): string {
  return CODE_MAP[code]?.text ?? '未知';
}
