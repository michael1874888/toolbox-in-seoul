import { CurrencyConverter } from './CurrencyConverter';
import { WeatherForecast } from './WeatherForecast';
import { BudgetTable } from './BudgetTable';

export function ToolsPage() {
  return (
    <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <CurrencyConverter />
      <WeatherForecast />
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: 'var(--spacing-sm)', color: 'var(--color-text)' }}>
          💰 現金預算表
        </div>
        <BudgetTable />
      </div>
    </div>
  );
}
