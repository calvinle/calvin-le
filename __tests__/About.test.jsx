import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Page', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders main heading', () => {
    expect(screen.getByText(/a little bit about calvin/i));
  });

  it('renders secondary heading', () => {
    expect(screen.getByText(/some more about calvin/i));
  });
});

