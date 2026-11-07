/**
 * @jest-environment node
 */
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { resume, RESUME_PDF_PATH } from '../components/resumeData';

const pdfPath = path.join(process.cwd(), 'public', RESUME_PDF_PATH);

// Ignore all whitespace: the PDF wraps lines at spaces, slashes, and hyphens,
// which changes spacing in the extracted text but not the words themselves
const normalize = (text) => text.replace(/\s+/g, '');

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
      resume.summary,
      ...resume.contact.map((item) => item.label),
      ...resume.skills.flatMap((skill) => [skill.category, skill.items]),
      ...resume.experience.flatMap((job) => [
        job.company,
        job.location,
        ...job.roles.flatMap((role) => [role.title, role.dates, ...role.bullets]),
      ]),
      ...resume.projects.flatMap((project) => [project.name, project.description]),
      resume.education,
      ...resume.additional.flatMap((item) => [item.title, ...item.bullets]),
    ];
    expected.forEach((phrase) => expect(pdfText).toContain(normalize(phrase)));
  });
});
