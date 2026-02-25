import React from 'react';
import { render, screen } from '@testing-library/react';
import Work from '../components/Work';

describe('Work Page', () => {
  it('renders without crashing', () => {
    render(<Work />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/work/i)).toBeInTheDocument();
  });
});
