import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Projects from '../components/Projects';

describe('Projects Page', () => {
  beforeEach(() => {
    render(<Projects />);
  });

  it('renders without crashing', () => {
    const actualNumberOfProject = screen.queryAllByText(/project/i);
    const expectedNumberOfProject = 3;
    expect(actualNumberOfProject.length).toBe(expectedNumberOfProject);
  });

  it('renders personal website card', () => {
    expect(screen.getByRole('heading', { name: /personal website/i })).toBeInTheDocument();
  });

  it('renders powerlifting plate calculator project', () => {
    expect(screen.getByRole('heading', { name: /powerlifting plate calculator/i })).toBeInTheDocument();
  });

  it('renders pieHue project', () => {
    expect(screen.getByRole('heading', { name: /pihue/i })).toBeInTheDocument();
  });

  it('shows status badges only where a status is set', () => {
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getAllByText(/^(Live|In progress)$/)).toHaveLength(2);
  });

  it('lists each project tech stack as a labeled list', () => {
    const piHueTech = screen.getByRole('list', { name: 'Technologies used in piHue' });
    expect(within(piHueTech).getAllByRole('listitem').map((item) => item.textContent))
      .toEqual(['Python', 'Raspberry Pi', 'Philips Hue API']);
  });

  it('gives each project link a unique, descriptive name', () => {
    expect(screen.getByRole('link', { name: /^GitHub\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Live Demo\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
  });
});

