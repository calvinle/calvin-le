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
    expect(screen.getByText(/If you see something wrong with the website, let me know with one of these methods! Screenshots encouraged!/i)).toBeInTheDocument();
  });
});

