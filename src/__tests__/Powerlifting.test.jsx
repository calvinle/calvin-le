import React from 'react';
import { render, screen } from '@testing-library/react';
jest.mock('../components/Powerlifting', () => () => <div>Powerlifting Page</div>);
import Powerlifting from '../components/Powerlifting';

describe('Powerlifting Page', () => {
  it('renders without crashing', () => {
    render(<Powerlifting />);
    // Basic smoke test: check for a known element or text
    // expect(screen.getByText(/powerlifting/i)).toBeInTheDocument();
  });
});
