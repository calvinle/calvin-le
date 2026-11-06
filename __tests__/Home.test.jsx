import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('links to the main sections', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
  });
});

