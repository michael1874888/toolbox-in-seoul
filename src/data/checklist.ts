import type { ChecklistItem } from '../types';

export const checklistData: ChecklistItem[] = [
  {
    id: 'passport',
    category: '證件',
    label: '護照',
  },
  {
    id: 'e-entry',
    category: '證件',
    label: '電子入境資料（72hr 前填寫）',
    note: '出發 72 小時前需填寫 K-ETA 或 Q-Code',
    link: 'https://www.k-eta.go.kr',
  },
  {
    id: 'esim',
    category: '通訊',
    label: 'eSIM / SIM 卡',
    note: '建議出發前在台灣購買韓國上網 SIM 或啟動 eSIM',
  },
  {
    id: 'power-bank',
    category: '電子',
    label: '行動電源',
    warning: '⚠️ 不可托運！需標示 Wh、貼絕緣膠帶、裝入透明夾鏈袋隨身攜帶',
  },
  {
    id: 'charger',
    category: '電子',
    label: '充電器 / 轉接頭（歐規 4.8mm）',
    warning: '⚠️ 韓國電壓 220V，吹風機、直髮夾注意是否支援',
  },
  {
    id: 'cash',
    category: '現金',
    label: '準備現金（約台幣 1 萬＋韓服費用）',
    note: '韓服費用 330,000 韓元需現金，另準備約 10,000 TWD 備用',
  },
  {
    id: 'toiletries',
    category: '盥洗',
    label: '盥洗用品 / 毛巾 / 拖鞋',
    note: '飯店未確認是否提供，建議自備',
  },
  {
    id: 'app-naver',
    category: 'APP',
    label: 'NAVER MAP',
    note: '韓國最準確的地圖導航 App',
    link: 'https://apps.apple.com/app/naver-map-navigation/id311867728',
  },
  {
    id: 'app-papago',
    category: 'APP',
    label: 'PAPAGO',
    note: '韓文翻譯神器',
    link: 'https://apps.apple.com/app/papago/id1147874819',
  },
  {
    id: 'app-taba',
    category: 'APP',
    label: 'TABA（叫車）',
    note: '韓國計程車叫車 App',
    link: 'https://apps.apple.com/app/kakao-t/id981110422',
  },
  {
    id: 'app-tmoney',
    category: 'APP',
    label: 'T-MONEY（綁定手機）',
    note: '韓國交通卡，可用手機感應搭乘地鐵公車',
    link: 'https://apps.apple.com/app/t-money/id466149040',
  },
];
