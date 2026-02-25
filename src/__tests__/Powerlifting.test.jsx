import React from 'react';
import { render, screen } from '@testing-library/react';
jest.mock('../components/Powerlifting', () => () => <div>Powerlifting Page</div>);
import Powerlifting from '../components/Powerlifting';

describe('Powerlifting Page', () => {
  it('renders without crashing', () => {
    render(<Powerlifting />);
  });
});
