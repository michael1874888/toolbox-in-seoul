import { useState, useEffect } from 'react';
import { getKoreaTime } from '../utils/timeOverride';

export function useKoreaTime(): Date {
  const [time, setTime] = useState<Date>(getKoreaTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getKoreaTime());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
