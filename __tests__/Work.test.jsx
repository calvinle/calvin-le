import React from 'react';
import { render } from '@testing-library/react';
import Work from '../components/Work';

describe('Work Page', () => {
  it('renders without crashing', () => {
    render(<Work />);
  });
});

