import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { onValue } from 'firebase/database';
import ThemeWrapper from '../components/ThemeWrapper';
import Home from '../components/Home';
import About from '../components/About';
import Work from '../components/Work';
import Projects from '../components/Projects';
import Powerlifting from '../components/Powerlifting';
import Speedcubing from '../components/Speedcubing';
import Contact from '../components/Contact';
import NotFound from '../components/NotFound';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));
// Next's Link schedules async prefetch updates that trigger act() warnings in jsdom;
// for accessibility purposes it's just an <a href>, so render exactly that.
jest.mock('next/link', () => {
  const React = require('react');
  return React.forwardRef(function MockLink({ href, prefetch, ...props }, ref) {
    return <a ref={ref} href={href} {...props} />;
  });
});
jest.mock('../lib/firebase', () => ({ db: {} }));
jest.mock('firebase/database', () => ({ ref: jest.fn(), onValue: jest.fn() }));

const firebaseData = {
  'powerlifting/user_data': {
    personal_best: [{ squat: 500, bench: 315, deadlift: 600, total: 1415, equip: 'Raw' }],
    competition_results: [
      { meet_name: 'Test Meet', date: '2024-02-10', squat: 500, bench: 315, deadlift: 600, total: 1415, dots: 470 },
    ],
  },
  'speedcubing/wca_data': {
    data: {
      numberOfCompetitions: 3,
      medals: { bronze: 1 },
      rank: {
        singles: [{ eventId: '333', best: 1234, rank: { world: 10000, country: 2000 } }],
        averages: [{ eventId: '333', best: 1456 }],
      },
    },
  },
};

beforeEach(() => {
  const { ref } = jest.requireMock('firebase/database');
  ref.mockImplementation((_, path) => path);
  onValue.mockImplementation((path, onData) => {
    const value = firebaseData[path] ?? null;
    onData({ exists: () => value !== null, val: () => value });
    return () => {};
  });
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));
});

// Note: jsdom has no layout engine, so axe skips color contrast here.
// Contrast was checked separately when the theme colors were chosen.
describe('Automated accessibility checks (axe)', () => {
  it.each([
    ['Home', Home],
    ['About', About],
    ['Work', Work],
    ['Projects', Projects],
    ['Powerlifting', Powerlifting],
    ['Speedcubing', Speedcubing],
    ['Contact', Contact],
    ['404', NotFound],
  ])('%s page has no detectable violations', async (_, Page) => {
    const { container } = render(<ThemeWrapper><Page /></ThemeWrapper>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
