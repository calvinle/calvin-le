import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('next/navigation', () => ({
  usePathname: () => '/work',
}));

const theme = createTheme();

const renderNavBar = (themeName = 'light') =>
  render(
    <ThemeProvider theme={theme}>
      <NavBar themeName={themeName} cycleTheme={() => {}} />
    </ThemeProvider>
  );

describe('NavBar', () => {
  it('renders a labeled navigation landmark', () => {
    renderNavBar();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('marks only the current page link with aria-current', () => {
    renderNavBar();
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('labels the theme toggle with the next theme', () => {
    renderNavBar('dark');
    expect(screen.getByRole('button', { name: 'Switch to red theme' })).toBeInTheDocument();
  });
});
