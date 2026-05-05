import { describe, it, expect } from 'vitest';
import { getNaverMapUrl } from '../../utils/naverMap';

describe('Phase3: NAVER Map URL', () => {
  it('產生正確的搜尋 URL', () => {
    const url = getNaverMapUrl('덕수궁');
    expect(url).toContain('map.naver.com');
    expect(url).toContain(encodeURIComponent('덕수궁'));
  });

  it('特殊字符被正確編碼', () => {
    const url = getNaverMapUrl('큰기와집');
    expect(url).toContain(encodeURIComponent('큰기와집'));
  });
});
