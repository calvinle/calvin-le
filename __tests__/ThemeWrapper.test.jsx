import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ThemeWrapper from '../components/ThemeWrapper';
import { themeBackgrounds } from '../components/themeConstants';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

let systemDark;
let changeListener;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = 'theme-pending';
  systemDark = false;
  changeListener = null;
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)' ? systemDark : false,
    media: query,
    addEventListener: (_, listener) => { changeListener = listener; },
    removeEventListener: () => {},
    // Older API used by MUI's useMediaQuery
    addListener: () => {},
    removeListener: () => {},
  }));
});

const renderWrapper = () => render(<ThemeWrapper><p>content</p></ThemeWrapper>);

describe('ThemeWrapper', () => {
  it('follows the OS dark setting when nothing is saved', () => {
    systemDark = true;
    renderWrapper();
    expect(screen.getByRole('button', { name: 'Theme: System' })).toBeInTheDocument();
    expect(document.documentElement.style.backgroundColor).toBe(hexToRgb(themeBackgrounds.dark));
  });

  it('reacts when the OS setting changes', () => {
    renderWrapper();
    expect(document.documentElement.style.backgroundColor).toBe(hexToRgb(themeBackgrounds.light));
    act(() => changeListener({ matches: true }));
    expect(document.documentElement.style.backgroundColor).toBe(hexToRgb(themeBackgrounds.dark));
  });

  it('uses a saved theme over the OS setting', () => {
    systemDark = true;
    localStorage.setItem('app-theme', 'red');
    renderWrapper();
    expect(screen.getByRole('button', { name: 'Theme: Red' })).toBeInTheDocument();
    expect(document.documentElement.style.backgroundColor).toBe(hexToRgb(themeBackgrounds.red));
  });

  it('reveals the page once the theme is applied', () => {
    renderWrapper();
    expect(document.documentElement.classList.contains('theme-pending')).toBe(false);
  });
});

function hexToRgb(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
}
