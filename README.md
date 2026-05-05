# 工具箱 in Seoul

首爾旅遊隨行工具箱 PWA，專為 2026/05/09–05/13 三人行程打造。  
支援離線使用，可安裝至手機主畫面。

## 功能

| 頁面 | 內容 |
|------|------|
| 📅 行程 | 五天行程卡片，支援 A/B 方案切換、早午晚彈性選項，展開查看韓文地址、NAVER MAP 直連、餐廳即時營業狀態 |
| 🔧 工具 | 韓台匯率換算（KRW ↔ TWD，自動更新）、首爾五日天氣預報（Open-Meteo） |
| ✈️ 資訊 | 三人航班資訊、飯店地址、會合時間、機場交通比較表 |
| 📋 行前 | 出發前檢查清單，含完成進度條，狀態儲存於本機 |

## 資料來源

- **匯率**：[ExchangeRate-API](https://open.er-api.com/v6/latest/TWD)，本機快取 24 小時
- **天氣**：[Open-Meteo](https://api.open-meteo.com/)（首爾座標 37.5665, 126.978），本機快取 6 小時
- 離線或 API 失敗時自動降級為靜態備援資料

## 技術棧

- React 18 + TypeScript（Vite 8）
- CSS Modules + CSS Variables（無 UI 框架）
- vite-plugin-pwa（Service Worker、離線快取）
- lucide-react（SVG 圖示）
- Vitest + React Testing Library

## 本地開發

```bash
cd toolbox-in-seoul
npm install --legacy-peer-deps
npm run dev
```

> `--legacy-peer-deps` 是必要的，因為 `vite-plugin-pwa@1.2.0` 的 peer dependency 尚未宣告支援 Vite 8。

## 測試

```bash
npm run test          # 執行全部測試（68 項）
npm run test -- --ui  # 開啟 Vitest UI
```

## 建置與部署

```bash
npm run build   # 輸出至 dist/
```

專案已設定 GitHub Actions 自動部署至 GitHub Pages（`main` 分支 push 觸發）。  
部署路徑：`https://<user>.github.io/toolbox-in-seoul/`

## 專案結構

```
src/
├── components/
│   ├── layout/       # TopBar、TabBar
│   ├── schedule/     # 行程卡片、狀態 badge、複製按鈕、NAVER Map 連結
│   ├── checklist/    # 行前清單
│   ├── info/         # 航班、飯店、交通比較
│   └── tools/        # 匯率換算、天氣預報、預算表
├── data/             # 行程、航班、清單、預算、天氣備援靜態資料
├── hooks/            # useKoreaTime、useExchangeRate、useWeather、useChecklist
├── utils/            # restaurantStatus、weatherCode、naverMap、timeOverride
├── styles/           # CSS 變數（variables.css）、全域重置（global.css）
└── types/            # TypeScript 型別定義
```
