export function getNaverMapUrl(query: string): string {
  return `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
}

export function getNaverMapDeepLink(query: string): string {
  return `nmap://search?query=${encodeURIComponent(query)}&appname=toolbox-seoul`;
}

export function openNaverMap(query: string, online: boolean): void {
  if (!online) return;
  const deepLink = getNaverMapDeepLink(query);
  const webUrl = getNaverMapUrl(query);

  const a = document.createElement('a');
  a.href = deepLink;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => {
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }, 1500);
}
