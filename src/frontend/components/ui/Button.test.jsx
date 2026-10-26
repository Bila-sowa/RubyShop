import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('викликає onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Купити</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Купити' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
