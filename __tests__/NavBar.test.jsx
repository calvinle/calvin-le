import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => '/work',
  useRouter: () => ({ push: mockPush }),
}));

const theme = createTheme();

const renderNavBar = (themePreference = 'system', onThemeChange = () => {}) =>
  render(
    <ThemeProvider theme={theme}>
      <NavBar themePreference={themePreference} onThemeChange={onThemeChange} />
    </ThemeProvider>
  );

const openPalette = () => {
  fireEvent.click(screen.getByRole('button', { name: /search or jump to/i }));
  return screen.getByRole('dialog', { name: 'Command menu' });
};

beforeEach(() => mockPush.mockClear());

describe('NavBar', () => {
  it('renders a labeled navigation landmark with a home link', () => {
    renderNavBar();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByRole('link', { name: 'Calvin Le' })).toHaveAttribute('href', '/');
  });

  it('shows the current page in the breadcrumb', () => {
    renderNavBar();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByText('Work')).toHaveAttribute('aria-current', 'page');
  });

  it('opens the palette from the trigger button', () => {
    renderNavBar();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    openPalette();
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('toggles the palette with Ctrl+K and Cmd+K', async () => {
    renderNavBar();
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: 'Command menu' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('lists pages, themes and links in groups', () => {
    renderNavBar();
    const dialog = openPalette();
    expect(within(dialog).getByText('Pages')).toBeInTheDocument();
    expect(within(dialog).getByText('Theme')).toBeInTheDocument();
    expect(within(dialog).getByText('Links')).toBeInTheDocument();
    expect(within(dialog).getAllByRole('option')).toHaveLength(8 + 3 + 3);
  });

  it('filters items as you type', () => {
    renderNavBar();
    openPalette();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'proj' } });
    expect(screen.getByRole('option', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Home' })).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    renderNavBar();
    openPalette();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzzzzz' } });
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('navigates to a selected page', () => {
    renderNavBar();
    openPalette();
    fireEvent.click(screen.getByRole('option', { name: 'About' }));
    expect(mockPush).toHaveBeenCalledWith('/about');
  });

  it('marks the current page and the active theme', () => {
    renderNavBar('dark');
    openPalette();
    expect(screen.getByRole('option', { name: /^Work/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('option', { name: 'Dark theme' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('option', { name: 'System theme' })).toHaveAttribute('aria-checked', 'false');
  });

  it('reports the chosen theme', () => {
    const onThemeChange = jest.fn();
    renderNavBar('system', onThemeChange);
    openPalette();
    fireEvent.click(screen.getByRole('option', { name: 'Light theme' }));
    expect(onThemeChange).toHaveBeenCalledWith('light');
  });
});
