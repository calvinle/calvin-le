import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Projects from '../components/Projects';

describe('Projects Page', () => {
  beforeEach(() => {
    render(<Projects />);
  });

  it('renders a card for each project', () => {
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);
  });

  it('renders personal portfolio card', () => {
    expect(screen.getByRole('heading', { name: /personal portfolio/i })).toBeInTheDocument();
  });

  it('renders powerlifting plate calculator project', () => {
    expect(screen.getByRole('heading', { name: /powerlifting plate calculator/i })).toBeInTheDocument();
  });

  it('renders pieHue project', () => {
    expect(screen.getByRole('heading', { name: /pihue/i })).toBeInTheDocument();
  });

  it('shows a status badge on every project', () => {
    expect(screen.getAllByText('Live')).toHaveLength(2);
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getAllByText('Complete')).toHaveLength(2);
  });

  it('lists each project tech stack as a labeled list', () => {
    const piHueTech = screen.getByRole('list', { name: 'Technologies used in piHue' });
    expect(within(piHueTech).getAllByRole('listitem').map((item) => item.textContent))
      .toEqual(['Python', 'Raspberry Pi', 'Philips Hue API']);
  });

  it('gives each project link a unique, descriptive name', () => {
    expect(screen.getByRole('link', { name: /^GitHub\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Live app\s?: words2macros \(opens in new tab\)$/ })).toHaveAttribute('href', 'https://d3oosb3wyilt9u.cloudfront.net/');
    expect(screen.getByRole('link', { name: /^Demo video\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
  });
});

