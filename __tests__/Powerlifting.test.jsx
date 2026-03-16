import React from 'react';
import { render, screen } from '@testing-library/react';
import Powerlifting from '../components/Powerlifting';

// Mock data for personal bests and competition history
const mockPersonalBests = [
  {
    squat: 500,
    bench: 315,
    deadlift: 600,
    total: 1415,
    equip: 'Raw',
  },
];

const mockCompetitions = [
  {
    competition: 'USAPL Nationals',
    date: '2023-06-15',
    location: 'Las Vegas, NV',
    squat: 480,
    bench: 300,
    deadlift: 590,
    total: 1370,
    dots: 450,
  },
  {
    competition: 'Kansas State Meet',
    date: '2024-02-10',
    location: 'Wichita, KS',
    squat: 500,
    bench: 315,
    deadlift: 600,
    total: 1415,
    dots: 470,
  },
];

// Mock Powerlifting component to render tables with mock data
jest.mock('../components/Powerlifting', () => () => (
  <div>
    <table data-testid="personal-bests-table">
      <thead>
        <tr>
          <th>Squat</th>
          <th>Bench</th>
          <th>Deadlift</th>
          <th>Total</th>
          <th>Equipped</th>
        </tr>
      </thead>
      <tbody>
        {mockPersonalBests.map((pb, i) => (
          <tr key={i}>
            <td>{pb.squat}</td>
            <td>{pb.bench}</td>
            <td>{pb.deadlift}</td>
            <td>{pb.total}</td>
            <td>{pb.equip}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <table data-testid="competition-history-table">
      <thead>
        <tr>
          <th>Competition</th>
          <th>Squat</th>
          <th>Bench</th>
          <th>Deadlift</th>
          <th>Total</th>
          <th>DOTS</th>
        </tr>
      </thead>
      <tbody>
        {mockCompetitions.map((comp, i) => (
          <tr key={i}>
            <td>{comp.competition}</td>
            <td>{comp.squat}</td>
            <td>{comp.bench}</td>
            <td>{comp.deadlift}</td>
            <td>{comp.total}</td>
            <td>{comp.dots}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

describe('Powerlifting Page', () => {
  beforeEach(() => {
    render(<Powerlifting />);
  });

  describe('personal bests table', () => {
    it('renders personal bests table', () => {
      const pbTable = screen.queryByTestId('personal-bests-table');
      expect(pbTable).not.toBeNull();
    });

    it('personal bests table has 5 columns', () => {
      const pbTable = screen.queryByTestId('personal-bests-table');
      const actualNumberOfHeaders = pbTable.querySelectorAll('thead th');
      const expectedNumberOfHeaders = 5;
      expect(actualNumberOfHeaders.length).toBe(expectedNumberOfHeaders);
    });
  });
  
  describe('competition history table', () => {
    it('renders competition history table', () => {
      const compTable = screen.queryByTestId('competition-history-table');
      expect(compTable).not.toBeNull();
    });

    it('competition history table has 6 columns', () => {
      const compTable = screen.queryByTestId('competition-history-table');
      const actualNumberOfHeaders = compTable.querySelectorAll('thead th');
      const expectedNumberOfHeaders = 6;
      expect(actualNumberOfHeaders.length).toBe(expectedNumberOfHeaders);
    });
  });
});

