import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Page', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders main heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'About Me' })).toBeInTheDocument();
  });

  it('renders secondary heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'Quick Facts' })).toBeInTheDocument();
  });
});

