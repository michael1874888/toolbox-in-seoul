import type { FlightInfo } from '../types';

export const flightsData: FlightInfo[] = [
  {
    person: 'Umi',
    flights: [
      {
        direction: 'outbound',
        airline: 'ZIPAIR Tokyo',
        date: '2026-05-09',
        departure: { airport: '東京成田', terminal: 'T1', time: '08:55' },
        arrival: { airport: '仁川', terminal: 'T1', time: '11:25' },
      },
      {
        direction: 'inbound',
        airline: '長榮航空',
        date: '2026-05-13',
        departure: { airport: '仁川', terminal: 'T1', time: '19:45' },
        arrival: { airport: '台北桃園', terminal: 'T2', time: '21:25' },
      },
    ],
  },
  {
    person: 'HUA / 李老師',
    flights: [
      {
        direction: 'outbound',
        airline: '長榮航空',
        date: '2026-05-09',
        departure: { airport: '台北桃園', terminal: 'T2', time: '07:30' },
        arrival: { airport: '仁川', terminal: 'T1', time: '11:00' },
      },
      {
        direction: 'inbound',
        airline: '長榮航空',
        date: '2026-05-13',
        departure: { airport: '仁川', terminal: 'T1', time: '19:45' },
        arrival: { airport: '台北桃園', terminal: 'T2', time: '21:25' },
      },
    ],
  },
  {
    person: 'Ting',
    flights: [
      {
        direction: 'outbound',
        airline: '中華航空',
        date: '2026-05-09',
        departure: { airport: '台北桃園', terminal: 'T1', time: '07:55' },
        arrival: { airport: '仁川', terminal: 'T2', time: '11:30' },
      },
      {
        direction: 'inbound',
        airline: '中華航空',
        date: '2026-05-13',
        departure: { airport: '仁川', terminal: 'T2', time: '20:05' },
        arrival: { airport: '台北桃園', terminal: 'T1', time: '21:50' },
      },
    ],
  },
];
