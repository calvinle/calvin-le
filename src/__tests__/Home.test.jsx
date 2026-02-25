import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
