/**
 * @jest-environment node
 */
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { resume, RESUME_PDF_PATH } from '../components/resumeData';

const pdfPath = path.join(process.cwd(), 'public', RESUME_PDF_PATH);

// Ignore line wrapping differences between the PDF and the data
const normalize = (text) => text.replace(/-\s*\n\s*/g, '-').replace(/\s+/g, ' ');

describe('Resume PDF', () => {
  let pdfText;

  beforeAll(() => {
    // pdf.js needs dynamic imports that Jest's sandbox blocks, so extract in plain Node
    const script = `
      const { PDFParse } = require('pdf-parse');
      const parser = new PDFParse({ data: require('fs').readFileSync(process.argv[1]) });
      parser.getText().then((result) => process.stdout.write(result.text)).finally(() => parser.destroy());
    `;
    pdfText = normalize(execFileSync('node', ['-e', script, pdfPath], { encoding: 'utf8' }));
  });

  it('never includes a phone number', () => {
    expect(pdfText).not.toMatch(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  });

  it('matches the website resume (run `npm run resume:pdf` if this fails)', () => {
    const expected = [
      resume.name,
      ...resume.contact.map((item) => item.label),
      ...resume.skills.map((skill) => skill.category),
      ...resume.experience.flatMap((job) => [job.company, ...job.roles.flatMap((role) => [role.title, role.dates])]),
      ...resume.projects.map((project) => project.name),
      resume.education,
      ...resume.additional.map((item) => item.title),
    ];
    expected.forEach((phrase) => expect(pdfText).toContain(phrase));
  });
});
