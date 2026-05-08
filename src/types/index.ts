export type CardType = 'attraction' | 'restaurant' | 'shopping' | 'transport' | 'snack';
export type PlanType = 'common' | 'A' | 'B';
export type TransportMode = 'walk' | 'taxi' | 'bus' | 'subway';
export type RestaurantStatus = 'open' | 'break' | 'closed';

export interface TransportOption {
  mode: TransportMode;
  duration: string;
  detail?: string;
}

export interface SubItem {
  name_zh: string;
  name_kr?: string;
  category: '逛' | '吃' | '喝' | '展覽' | '景點' | '交通';
  note?: string;
  naver_map_query?: string;
  hours?: string;
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2 | 3 | 4 | 5;
  plan: PlanType;
  type: CardType;
  time_start: string;
  time_end: string;
  name_zh: string;
  name_kr: string;
  name_en?: string;
  address_kr?: string;
  summary: string;
  details?: string;
  hours?: string;
  hours_open?: string;
  hours_close?: string;
  break_start?: string;
  break_end?: string;
  price?: string;
  naver_rating?: number;
  naver_map_query: string;
  website?: string;
  tips?: string[];
  transport_from_prev?: TransportOption[];
  flex_group?: string;
  flex_default?: boolean;
  sub_items?: SubItem[];
}

export interface FlightLeg {
  direction: 'outbound' | 'inbound';
  airline: string;
  date: string;
  departure: { airport: string; terminal: string; time: string };
  arrival: { airport: string; terminal: string; time: string };
}

export interface FlightInfo {
  person: string;
  flights: FlightLeg[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  note?: string;
  warning?: string;
  link?: string;
}

export interface BudgetItem {
  label: string;
  amount_krw: number;
  is_estimate: boolean;
  payment: 'cash' | 'card' | 'free' | 'unknown';
  is_shared: boolean;
  share_count?: number;
  note?: string;
}

export type TabId = 'checklist' | 'schedule' | 'info' | 'tools';

export interface WeatherDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precip_prob: number | null;
  weather_code: number;
  hourly?: WeatherHour[];
}

export interface WeatherHour {
  time: string;
  temp: number;
  precip_prob: number | null;
  weather_code: number;
}
