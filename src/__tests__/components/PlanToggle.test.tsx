import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlanToggle } from '../../components/schedule/PlanToggle';

describe('PlanToggle', () => {
  it('renders Plan A and Plan B buttons', () => {
    render(<PlanToggle activePlan="A" onPlanChange={vi.fn()} />);
    expect(screen.getByText('Plan A')).toBeInTheDocument();
    expect(screen.getByText('Plan B')).toBeInTheDocument();
  });

  it('calls onPlanChange with "B" when Plan B is clicked', async () => {
    const onChange = vi.fn();
    render(<PlanToggle activePlan="A" onPlanChange={onChange} />);
    await userEvent.click(screen.getByText('Plan B'));
    expect(onChange).toHaveBeenCalledWith('B');
  });

  it('calls onPlanChange with "A" when Plan A is clicked', async () => {
    const onChange = vi.fn();
    render(<PlanToggle activePlan="B" onPlanChange={onChange} />);
    await userEvent.click(screen.getByText('Plan A'));
    expect(onChange).toHaveBeenCalledWith('A');
  });
});
