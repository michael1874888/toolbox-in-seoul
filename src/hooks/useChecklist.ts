import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'seoul-checklist-v1';

function loadFromStorage(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Record<string, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full or unavailable
  }
}

export function useChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadFromStorage);

  useEffect(() => {
    saveToStorage(checked);
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const completedCount = Object.values(checked).filter(Boolean).length;

  return { checked, toggle, completedCount };
}
