'use client'

import React from 'react';
import { Box, Button, Container, Divider, Link, Paper, Typography, useTheme } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import PrintIcon from '@mui/icons-material/Print'
import { gradientText } from './sharedStyles'
import { resume, RESUME_PDF_PATH } from './resumeData'

/**
 * Creates theme-aware styles for the Resume component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`,
    padding: 3,
  },
  paper: {
    padding: { xs: 3, sm: 6 },
    borderRadius: 3,
  },
  header: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-start', md: 'flex-start' },
    gap: 2,
  },
  name: {
    fontWeight: 700,
    ...gradientText(theme),
  },
  headline: {
    color: 'text.secondary',
    marginTop: 0.5,
  },
  contactList: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 2,
    rowGap: 0.5,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginTop: 1.5,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    flexShrink: 0,
  },
  actionButton: {
    textTransform: 'none',
    fontWeight: 600,
  },
  divider: {
    marginY: 3,
  },
  sectionTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '1rem',
    marginBottom: 1.5,
  },
  body: {
    lineHeight: 1.7,
  },
  skills: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'max-content 1fr' },
    columnGap: 3,
    rowGap: { xs: 0.25, sm: 1 },
    margin: 0,
    '& dt': {
      fontWeight: 600,
      marginTop: { xs: 1, sm: 0 },
    },
    '& dd': {
      margin: 0,
      lineHeight: 1.6,
    },
  },
  company: {
    marginTop: 3,
    '&:first-of-type': { marginTop: 0 },
  },
  companyName: {
    fontWeight: 700,
    fontSize: '1.15rem',
  },
  location: {
    color: 'text.secondary',
    fontSize: '0.9rem',
  },
  roleHeader: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    columnGap: 2,
    marginTop: 1.5,
  },
  roleTitle: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  dates: {
    color: 'text.secondary',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
  },
  bullets: {
    marginTop: 1,
    marginBottom: 0,
    paddingLeft: 3,
    '& li': {
      lineHeight: 1.6,
      marginBottom: 0.75,
    },
  },
  project: {
    marginBottom: 2,
    '&:last-of-type': { marginBottom: 0 },
  },
  projectName: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  projectTech: {
    color: 'text.secondary',
    fontWeight: 400,
  },
})

/**
 * One titled resume section with a divider above it.
 */
function Section({ title, styles, children }) {
  const headingId = `resume-${title.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <Box component="section" aria-labelledby={headingId}>
      <Divider sx={styles.divider} />
      <Typography variant="h6" component="h2" id={headingId} sx={styles.sectionTitle}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

/**
 * Resume component - Full resume as an accessible web page.
 *
 * Shows a PDF download button when the PDF exists in public/ (checked at build
 * time by app/resume/page.jsx), plus a Print button backed by print styles in
 * app/globals.css.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.hasPdf - Whether the downloadable PDF is available
 * @returns {JSX.Element} The rendered Resume page
 */
export default function Resume({ hasPdf = false }) {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="md">
        <Paper elevation={10} sx={styles.paper}>
          <Box component="header" sx={styles.header}>
            <Box>
              <Typography variant="h3" component="h1" sx={styles.name}>
                {resume.name}
              </Typography>
              <Typography sx={styles.headline}>
                {resume.headline.join(' · ')}
              </Typography>
              <Box component="ul" aria-label="Contact" sx={styles.contactList}>
                {resume.contact.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} variant="body2">{item.label}</Link>
                  </li>
                ))}
              </Box>
            </Box>
            <Box sx={styles.actions} className="no-print">
              {hasPdf && (
                <Button
                  href={RESUME_PDF_PATH}
                  download
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={styles.actionButton}
                >
                  Download PDF
                </Button>
              )}
              <Button
                onClick={() => window.print()}
                variant="outlined"
                startIcon={<PrintIcon />}
                sx={styles.actionButton}
              >
                Print
              </Button>
            </Box>
          </Box>

          <Section title="Summary" styles={styles}>
            <Typography sx={styles.body}>{resume.summary}</Typography>
          </Section>

          <Section title="Technical Skills" styles={styles}>
            <Box component="dl" sx={styles.skills}>
              {resume.skills.map((skill) => (
                <React.Fragment key={skill.category}>
                  <dt>{skill.category}</dt>
                  <dd>{skill.items}</dd>
                </React.Fragment>
              ))}
            </Box>
          </Section>

          <Section title="Experience" styles={styles}>
            {resume.experience.map((job) => (
              <Box key={job.company} sx={styles.company}>
                <Typography component="h3" sx={styles.companyName}>{job.company}</Typography>
                <Typography sx={styles.location}>{job.location}</Typography>
                {job.roles.map((role) => (
                  <Box key={role.title}>
                    <Box sx={styles.roleHeader}>
                      <Typography component="h4" sx={styles.roleTitle}>{role.title}</Typography>
                      <Typography sx={styles.dates}>{role.dates}</Typography>
                    </Box>
                    <Box component="ul" sx={styles.bullets}>
                      {role.bullets.map((bullet) => (
                        <Typography component="li" variant="body2" key={bullet}>{bullet}</Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Section>

          <Section title="Projects" styles={styles}>
            {resume.projects.map((project) => (
              <Box key={project.name} sx={styles.project}>
                <Typography component="h3" sx={styles.projectName}>
                  {project.name} <Box component="span" sx={styles.projectTech}>({project.tech})</Box>
                </Typography>
                <Typography variant="body2" sx={styles.body}>{project.description}</Typography>
              </Box>
            ))}
          </Section>

          <Section title="Education" styles={styles}>
            <Typography sx={styles.body}>{resume.education}</Typography>
          </Section>
        </Paper>
      </Container>
    </Box>
  )
}
