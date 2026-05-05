import { Map } from 'lucide-react';
import { getNaverMapUrl } from '../../utils/naverMap';
import styles from './NaverMapLink.module.css';

interface NaverMapLinkProps {
  query: string;
  small?: boolean;
}

export function NaverMapLink({ query, small = false }: NaverMapLinkProps) {
  const url = getNaverMapUrl(query);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={small ? styles.small : styles.btn}
    >
      <Map size={14} aria-hidden="true" /> {small ? '地圖' : '在 NAVER MAP 開啟'}
    </a>
  );
}
