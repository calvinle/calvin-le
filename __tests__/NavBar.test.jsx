import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('next/navigation', () => ({
  usePathname: () => '/work',
}));

const theme = createTheme();

const renderNavBar = (themePreference = 'system', onThemeChange = () => {}) =>
  render(
    <ThemeProvider theme={theme}>
      <NavBar themePreference={themePreference} onThemeChange={onThemeChange} />
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

  it('labels the theme button with the current preference', () => {
    renderNavBar('dark');
    expect(screen.getByRole('button', { name: 'Theme: Dark' })).toBeInTheDocument();
  });

  it('opens a theme menu with the current option checked', () => {
    renderNavBar('red');
    fireEvent.click(screen.getByRole('button', { name: 'Theme: Red' }));
    const options = screen.getAllByRole('menuitemradio');
    expect(options.map((option) => option.textContent)).toEqual(['System', 'Light', 'Dark', 'Red']);
    expect(screen.getByRole('menuitemradio', { name: 'Red' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('menuitemradio', { name: 'System' })).toHaveAttribute('aria-checked', 'false');
  });

  it('reports the chosen theme', () => {
    const onThemeChange = jest.fn();
    renderNavBar('system', onThemeChange);
    fireEvent.click(screen.getByRole('button', { name: 'Theme: System' }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Light' }));
    expect(onThemeChange).toHaveBeenCalledWith('light');
  });
});
