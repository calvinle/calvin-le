import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Page', () => {
  it('renders without crashing', () => {
    render(<Contact />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
