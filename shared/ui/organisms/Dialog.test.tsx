// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Dialog from './Dialog';

afterEach(cleanup);

describe('Dialog', () => {
  it('renders as an accessible modal with title and description', () => {
    render(
      <Dialog labelledBy="d-title" describedBy="d-desc">
        <h2 id="d-title">Title</h2>
        <p id="d-desc">Body</p>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('moves focus into the dialog on open (container when no autofocus target)', () => {
    render(
      <Dialog labelledBy="d-title">
        <button>First action</button>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toHaveFocus();
  });

  it('traps Tab focus inside the dialog', () => {
    render(
      <Dialog labelledBy="d-title">
        <button>First</button>
        <button>Last</button>
      </Dialog>
    );
    const first = screen.getByText('First');
    const last = screen.getByText('Last');
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(first).toHaveFocus();
  });

  it('restores focus to the previously focused element on unmount', () => {
    const outside = render(<button>Outside</button>).getByText('Outside');
    outside.focus();
    const { unmount } = render(
      <Dialog labelledBy="d-title">
        <button>Inside</button>
      </Dialog>
    );
    unmount();
    expect(outside).toHaveFocus();
  });
});
