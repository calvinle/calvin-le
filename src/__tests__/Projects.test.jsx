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
    expect(screen.getByText(/personal website/i));
  });
  it('renders powerlifting plate calculator project', () => {
    expect(screen.getByText(/powerlifting plate calculator/i));
  });
  it('renders pieHue project', () => {
    expect(screen.getByText(/pihue/i));
  });
});
