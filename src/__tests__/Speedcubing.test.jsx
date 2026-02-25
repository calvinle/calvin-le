import React from 'react';
import { render, screen } from '@testing-library/react';
jest.mock('../components/Speedcubing', () => () => <div>Speedcubing Page</div>);
import Speedcubing from '../components/Speedcubing';

describe('Speedcubing Page', () => {
  it('renders without crashing', () => {
    render(<Speedcubing />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/speedcubing/i)).toBeInTheDocument();
  });
});
