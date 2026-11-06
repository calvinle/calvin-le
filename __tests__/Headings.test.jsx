import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, redTheme } from '../components/theme';
import Home from '../components/Home';
import About from '../components/About';
import Work from '../components/Work';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const renderWithTheme = (ui, theme = lightTheme) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Page headings', () => {
  it.each([
    ['Home', Home, 'Calvin Le'],
    ['About', About, 'A Little Bit About Calvin'],
    ['Work', Work, 'Work Experience'],
    ['Projects', Projects, 'Projects'],
    ['Contact', Contact, 'Get In Touch'],
  ])('%s has exactly one h1', (_, Page, title) => {
    renderWithTheme(<Page />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(title);
  });

  it('Work company headings exclude decorative emoji from the accessible name', () => {
    renderWithTheme(<Work />);
    expect(screen.getByRole('heading', { level: 2, name: 'The Home Depot' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Oracle Health' })).toBeInTheDocument();
  });
});

describe('Home photo', () => {
  it('exposes only the active theme photo to assistive tech', () => {
    renderWithTheme(<Home />, redTheme);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAccessibleName(/grey jacket/i);
  });
});
