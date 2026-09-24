import { render, screen, fireEvent } from '@testing-library/react';
import TicketInput from '../TicketInput';
import '@testing-library/jest-dom';

describe('TicketInput Component', () => {
  it('renders input field and submit button', () => {
    render(<TicketInput onAnalyze={() => {}} isLoading={false} />);
    
    expect(screen.getByLabelText(/describe your support issue/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze ticket/i })).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    render(<TicketInput onAnalyze={() => {}} isLoading={false} />);
    const button = screen.getByRole('button', { name: /analyze ticket/i });
    expect(button).toBeDisabled();
  });

  it('enables button when input has text', () => {
    render(<TicketInput onAnalyze={() => {}} isLoading={false} />);
    const input = screen.getByLabelText(/describe your support issue/i);
    const button = screen.getByRole('button', { name: /analyze ticket/i });
    
    fireEvent.change(input, { target: { value: 'This is a test ticket' } });
    expect(button).not.toBeDisabled();
  });

  it('shows loading state when isLoading is true', () => {
    render(<TicketInput onAnalyze={() => {}} isLoading={true} />);
    expect(screen.getByRole('button')).toHaveTextContent(/analyzing ticket/i);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
