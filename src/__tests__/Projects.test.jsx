import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../components/Projects';

describe('Projects Page', () => {
  it('renders without crashing', () => {
    render(<Projects />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/project/i)).toBeInTheDocument();
  });
});
