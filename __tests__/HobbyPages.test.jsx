import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { onValue } from 'firebase/database';
import Speedcubing from '../components/Speedcubing';
import Powerlifting from '../components/Powerlifting';

// Render the real pages against a fake Firebase so markup regressions are caught
jest.mock('../lib/firebase', () => ({ db: {} }));
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
}));

const respondWith = (value) => {
  onValue.mockImplementation((_, onData) => {
    onData({ exists: () => value !== null, val: () => value });
    return () => {};
  });
};

const failWith = (message) => {
  onValue.mockImplementation((_, __, onError) => {
    onError(new Error(message));
    return () => {};
  });
};

const speedcubingData = {
  data: {
    numberOfCompetitions: 3,
    medals: { bronze: 1 },
    rank: {
      singles: [
        { eventId: '333', best: 1234, rank: { world: 10000, country: 2000 } },
        { eventId: 'magic', best: 150, rank: { world: 500, country: 100 } },
      ],
      averages: [{ eventId: '333', best: 1456 }],
    },
  },
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('Speedcubing page', () => {
  it('uses valid cubing icon class names', () => {
    respondWith(speedcubingData);
    const { container } = render(<Speedcubing />);
    const icons = container.querySelectorAll('[class*="cubing-icon"]');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon).toHaveClass('cubing-icon');
      expect(icon.className).toMatch(/\bevent-\w+/);
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('makes discontinued-event info reachable by keyboard', async () => {
    respondWith(speedcubingData);
    render(<Speedcubing />);
    const infoButton = screen.getByRole('button', { name: /about magic/i });
    // MUI only opens tooltips on keyboard focus, so simulate tabbing in
    fireEvent.keyDown(document.body, { key: 'Tab' });
    act(() => infoButton.focus());
    expect(await screen.findByRole('tooltip')).toHaveTextContent(/discontinued/i);
  });

  it('announces new-tab links', () => {
    respondWith(speedcubingData);
    render(<Speedcubing />);
    fireEvent.click(screen.getByRole('button', { name: 'About Speedcubing' }));
    expect(screen.getByRole('link', { name: 'World Cube Association (opens in new tab)' })).toBeInTheDocument();
  });

  it('shows a friendly error with a link to the WCA profile', () => {
    failWith('permission denied');
    render(<Speedcubing />);
    expect(screen.getByRole('alert')).toHaveTextContent(/couldn't be loaded/i);
    expect(screen.getByRole('alert')).not.toHaveTextContent(/F12|permission denied/i);
    expect(screen.getByRole('link', { name: /world cube association/i }))
      .toHaveAttribute('href', 'https://www.worldcubeassociation.org/persons/2010LECA01');
  });

  it('labels the loading spinner', () => {
    onValue.mockImplementation(() => () => {});
    render(<Speedcubing />);
    expect(screen.getByRole('progressbar', { name: 'Loading speedcubing results' })).toBeInTheDocument();
  });
});

describe('Powerlifting page', () => {
  it('shows a friendly error with a link to OpenPowerlifting', () => {
    failWith('quota exceeded');
    render(<Powerlifting />);
    expect(screen.getByRole('alert')).toHaveTextContent(/couldn't be loaded/i);
    expect(screen.getByRole('link', { name: /openpowerlifting/i }))
      .toHaveAttribute('href', 'https://www.openpowerlifting.org/u/calvinle');
  });

  it('labels the loading spinner', () => {
    onValue.mockImplementation(() => () => {});
    render(<Powerlifting />);
    expect(screen.getByRole('progressbar', { name: 'Loading powerlifting results' })).toBeInTheDocument();
  });
});
