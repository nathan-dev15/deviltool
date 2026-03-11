import { render, screen, fireEvent } from '@testing-library/react';
import { WordCounter } from '../pages/WordCounter';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

describe('WordCounter Component', () => {
  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <WordCounter />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  it('renders the word counter heading', () => {
    renderComponent();
    expect(screen.getByTestId('word-counter-title')).toBeInTheDocument();
  });

  it('updates stats when text is typed', () => {
    renderComponent();
    const input = screen.getByTestId('word-counter-input');
    
    fireEvent.change(input, { target: { value: 'Hello world' } });
    
    expect(screen.getByTestId('stat-words').textContent).toBe('2');
    expect(screen.getByTestId('stat-chars-w-space').textContent).toBe('11');
    expect(screen.getByTestId('stat-chars-no-space').textContent).toBe('10');
  });

  it('clears text when clear button is clicked', () => {
    renderComponent();
    const input = screen.getByTestId('word-counter-input') as HTMLTextAreaElement;
    
    fireEvent.change(input, { target: { value: 'Some text' } });
    expect(input.value).toBe('Some text');
    
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
  });
});
