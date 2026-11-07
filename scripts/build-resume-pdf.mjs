/**
 * Builds public/CalvinLe_Resume.pdf from components/resumeData.js, the same data
 * the /resume page renders, so the download always matches the website.
 *
 * Run after editing resumeData.js:  npm run resume:pdf
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import { resume, RESUME_PDF_PATH } from '../components/resumeData.js'

const OUTPUT = path.join(process.cwd(), 'public', RESUME_PDF_PATH)

const MARGIN = 50
const PAGE = { width: 612, height: 792 } // US Letter, in points
const CONTENT_WIDTH = PAGE.width - MARGIN * 2
const BODY_SIZE = 10.5
const LINK_COLOR = '#1155CC'
const BULLET_INDENT = 10
const TEXT_INDENT = 22

const FONT = {
  regular: 'Times-Roman',
  bold: 'Times-Bold',
  italic: 'Times-Italic',
  boldItalic: 'Times-BoldItalic',
}

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: `${resume.name} - Resume`,
    Author: resume.name,
    Subject: 'Resume',
  },
})
doc.pipe(fs.createWriteStream(OUTPUT))

/** Start a new page if fewer than `needed` points remain, to avoid stranded headings. */
function keepWithNext(needed) {
  if (doc.y + needed > PAGE.height - MARGIN) doc.addPage()
}

/** Left text and right-aligned text on the same line (e.g. company / location). */
function splitRow(left, right, leftFont, rightFont, size = BODY_SIZE) {
  const y = doc.y
  doc.font(rightFont).fontSize(size)
  const rightWidth = doc.widthOfString(right)
  doc.text(right, MARGIN, y, { width: CONTENT_WIDTH, align: 'right', lineBreak: false })
  doc.font(leftFont).fontSize(size)
  doc.text(left, MARGIN, y, { width: CONTENT_WIDTH - rightWidth - 12 })
  doc.x = MARGIN
}

function sectionHeading(title) {
  keepWithNext(60)
  doc.moveDown(0.6)
  doc.font(FONT.bold).fontSize(13).fillColor('black').text(title.toUpperCase(), MARGIN, doc.y)
  const lineY = doc.y + 1
  doc.moveTo(MARGIN, lineY).lineTo(MARGIN + CONTENT_WIDTH, lineY).lineWidth(0.75).stroke()
  doc.y = lineY + 4
}

/** A bullet whose text may start with a bold lead-in (e.g. "Languages: ..."). */
function bullet(text, boldLead) {
  const y = doc.y
  doc.font(FONT.regular).fontSize(BODY_SIZE).text('•', MARGIN + BULLET_INDENT, y, { lineBreak: false })
  const options = { width: CONTENT_WIDTH - TEXT_INDENT, lineGap: 1 }
  if (boldLead) {
    doc.font(FONT.bold).text(boldLead, MARGIN + TEXT_INDENT, y, { ...options, continued: true })
    doc.font(FONT.regular).text(text)
  } else {
    doc.text(text, MARGIN + TEXT_INDENT, y, options)
  }
  doc.x = MARGIN
}

// Header: name, headline, contact links
doc.font(FONT.bold).fontSize(20).text(resume.name, { align: 'center' })
doc.font(FONT.italic).fontSize(BODY_SIZE).text(resume.headline.join('  |  '), { align: 'center' })
doc.moveDown(0.15)
// pdfkit can't center a line built from separately styled pieces, so place each
// link and separator manually, starting from the centered line's left edge.
doc.font(FONT.regular).fontSize(BODY_SIZE)
const SEPARATOR = '  •  '
const contactY = doc.y
const contactWidth = resume.contact.reduce((sum, item) => sum + doc.widthOfString(item.label), 0)
  + doc.widthOfString(SEPARATOR) * (resume.contact.length - 1)
let contactX = MARGIN + (CONTENT_WIDTH - contactWidth) / 2
resume.contact.forEach((item, index) => {
  doc.fillColor(LINK_COLOR).text(item.label, contactX, contactY, { link: item.href, underline: true, lineBreak: false })
  contactX += doc.widthOfString(item.label)
  if (index < resume.contact.length - 1) {
    doc.fillColor('black').text(SEPARATOR, contactX, contactY, { lineBreak: false })
    contactX += doc.widthOfString(SEPARATOR)
  }
})
doc.fillColor('black')
doc.x = MARGIN
doc.y = contactY + doc.currentLineHeight(true)

sectionHeading('Summary')
doc.font(FONT.regular).fontSize(BODY_SIZE).text(resume.summary, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 1 })

sectionHeading('Technical Skills')
resume.skills.forEach((skill) => bullet(skill.items, `${skill.category}: `))

sectionHeading('Professional Experience')
resume.experience.forEach((job, jobIndex) => {
  if (jobIndex > 0) doc.moveDown(0.5)
  keepWithNext(70)
  splitRow(job.company, job.location, FONT.bold, FONT.bold, 11)
  job.roles.forEach((role) => {
    keepWithNext(45)
    splitRow(role.title, role.dates, FONT.boldItalic, FONT.italic)
    role.bullets.forEach((text) => bullet(text))
  })
})

sectionHeading('Projects')
resume.projects.forEach((project) => {
  keepWithNext(30)
  bullet(project.description, `${project.name} (${project.tech}): `)
})

sectionHeading('Education')
doc.font(FONT.regular).fontSize(BODY_SIZE).text(resume.education, MARGIN, doc.y, { width: CONTENT_WIDTH })

sectionHeading('Additional')
resume.additional.forEach((item) => {
  keepWithNext(40)
  doc.font(FONT.boldItalic).fontSize(BODY_SIZE).text(item.title, MARGIN, doc.y)
  item.bullets.forEach((text) => bullet(text))
})

doc.end()
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)}`)
