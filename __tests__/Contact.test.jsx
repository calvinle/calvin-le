import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('Contact Page', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    );
  });

  it('displays the sub-header message', () => {
    render(
      <ThemeProvider theme={theme}>
        <Contact />
      </ThemeProvider>
    );
    expect(screen.getByText(/Open to engineering and developer education opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/Spotted something broken on the site\?/i)).toBeInTheDocument();
  });
});

