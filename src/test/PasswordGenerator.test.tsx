import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordGenerator } from '../pages/PasswordGenerator';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { uid: 'test-uid', email: 'test@example.com' },
  }),
}));

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});

describe('PasswordGenerator Component', () => {
  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <PasswordGenerator />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  it('renders the password generator heading', () => {
    renderComponent();
    expect(screen.getByText('Password Generator')).toBeInTheDocument();
  });

  it('generates a password on mount', () => {
    renderComponent();
    // Find the specific span that holds the password
    const passwordDisplay = screen.getByTestId('password-display');
    expect(passwordDisplay).toBeInTheDocument();
    expect(passwordDisplay.textContent?.length).toBeGreaterThan(0);
  });

  it('changes password when refresh button is clicked', () => {
    renderComponent();
    const passwordDisplay = screen.getByTestId('password-display');
    const initialPassword = passwordDisplay.textContent;
    
    const refreshButton = screen.getByTestId('refresh-password');
    fireEvent.click(refreshButton);
    
    const newPassword = passwordDisplay.textContent;
    expect(newPassword).not.toBe(initialPassword);
  });

  it('copies password to clipboard', () => {
    renderComponent();
    const copyButton = screen.getByText('Copy Password');
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
