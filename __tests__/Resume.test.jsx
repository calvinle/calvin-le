import React from 'react';
import { render, screen } from '@testing-library/react';
import Resume from '../components/Resume';
import { resume } from '../components/resumeData';

describe('Resume Page', () => {
  it('never shows a phone number', () => {
    const { container } = render(<Resume hasPdf />);
    expect(container.textContent).not.toMatch(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    expect(JSON.stringify(resume)).not.toMatch(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  });

  it('shows the PDF download only when the PDF exists', () => {
    const { unmount } = render(<Resume hasPdf={false} />);
    expect(screen.queryByRole('link', { name: /download pdf/i })).toBeNull();
    expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
    unmount();

    render(<Resume hasPdf />);
    expect(screen.getByRole('link', { name: /download pdf/i })).toHaveAttribute('href', '/CalvinLe_Resume.pdf');
  });

  it('structures sections and roles as headings', () => {
    render(<Resume />);
    const sections = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(sections).toEqual(['Summary', 'Technical Skills', 'Experience', 'Projects', 'Education']);
    expect(screen.getByRole('heading', { level: 3, name: 'Snippet Sentry' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: /Software Engineer II, OrangeMethod/ })).toBeInTheDocument();
  });

  it('labels each section region by its heading', () => {
    render(<Resume />);
    expect(screen.getByRole('region', { name: 'Technical Skills' })).toBeInTheDocument();
  });
});
