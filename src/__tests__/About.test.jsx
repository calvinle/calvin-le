import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Page', () => {
  it('renders without crashing', () => {
    render(<About />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
