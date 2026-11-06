import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('gives each project link a unique, descriptive name', () => {
    expect(screen.getByRole('link', { name: /^GitHub\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Live Demo\s?: piHue \(opens in new tab\)$/ })).toBeInTheDocument();
  });
});

