import type { BudgetItem } from '../types';

export const personalBudget: BudgetItem[] = [
  {
    label: '韓服 + 妝髮（Ari Hanbok）',
    amount_krw: 330000,
    is_estimate: false,
    payment: 'cash',
    is_shared: false,
    note: '現場現金結帳',
  },
  {
    label: '德壽宮門票',
    amount_krw: 1000,
    is_estimate: false,
    payment: 'cash',
    is_shared: false,
  },
  {
    label: '景福宮門票',
    amount_krw: 0,
    is_estimate: false,
    payment: 'free',
    is_shared: false,
    note: '穿韓服免費入場',
  },
  {
    label: '土俗村蔘雞湯',
    amount_krw: 20000,
    is_estimate: false,
    payment: 'card',
    is_shared: false,
  },
  {
    label: '光化門豬肉湯飯',
    amount_krw: 17000,
    is_estimate: false,
    payment: 'unknown',
    is_shared: false,
  },
  {
    label: '醬蟹（大瓦房）',
    amount_krw: 59000,
    is_estimate: false,
    payment: 'unknown',
    is_shared: false,
  },
  {
    label: '馬場畜產市場',
    amount_krw: 46500,
    is_estimate: true,
    payment: 'unknown',
    is_shared: false,
  },
  {
    label: '깃뜰 烤肉',
    amount_krw: 46500,
    is_estimate: true,
    payment: 'unknown',
    is_shared: false,
    note: 'Plan 選擇後才會發生',
  },
  {
    label: '首爾塔觀景臺',
    amount_krw: 26000,
    is_estimate: false,
    payment: 'unknown',
    is_shared: false,
  },
];

export const sharedBudget: BudgetItem[] = [
  {
    label: '攝影費（韓瞬間旅拍）',
    amount_krw: 510000,
    is_estimate: false,
    payment: 'cash',
    is_shared: true,
    share_count: 4,
    note: '現場收費，每人 127,500 韓元',
  },
];
