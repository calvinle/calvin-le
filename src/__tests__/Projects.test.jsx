import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../components/Projects';

describe('Projects Page', () => {
  it('renders without crashing', () => {
    render(<Projects />);
    const projectElements = screen.queryAllByText(/project/i);
    expect(projectElements.length).toBeGreaterThan(0);
  });
  it('renders personal website card', () => {
    render(<Projects />);
    expect(screen.getByText(/personal website/i));
  });
  it('renders powerlifting plate calculator project', () => {
    render(<Projects />);
    expect(screen.getByText(/powerlifting plate calculator/i));
  });
  it('renders pieHue project', () => {
    render(<Projects />);
    expect(screen.getByText(/pihue/i));
  });
});
