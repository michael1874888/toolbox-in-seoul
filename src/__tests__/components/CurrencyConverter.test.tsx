import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyConverter } from '../../components/tools/CurrencyConverter';

vi.mock('../../hooks/useExchangeRate', () => ({
  useExchangeRate: () => ({ rate: 40, updatedAt: null, isFallback: false, isLoading: false }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CurrencyConverter', () => {
  it('renders the title', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText('💱 匯率換算')).toBeInTheDocument();
  });

  it('shows — when input is empty', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('converts 10000 KRW to correct TWD with mocked rate 40', async () => {
    render(<CurrencyConverter />);
    const input = screen.getByPlaceholderText('輸入金額');
    await userEvent.type(input, '10000');
    // 10000 / 40 = 250
    expect(screen.getByText('250')).toBeInTheDocument();
  });

  it('shows 0 / — when input is "abc"', async () => {
    render(<CurrencyConverter />);
    const input = screen.getByPlaceholderText('輸入金額');
    await userEvent.type(input, 'abc');
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('quick buttons set the input value', async () => {
    render(<CurrencyConverter />);
    const btn = screen.getByText('10,000');
    await userEvent.click(btn);
    const input = screen.getByPlaceholderText('輸入金額') as HTMLInputElement;
    expect(input.value).toBe('10000');
  });

  it('swap button toggles direction', async () => {
    render(<CurrencyConverter />);
    expect(screen.getByText(/KRW 韓元 → TWD 台幣/)).toBeInTheDocument();
    await userEvent.click(screen.getByText('⇆'));
    expect(screen.getByText(/TWD 台幣 → KRW 韓元/)).toBeInTheDocument();
  });
});
