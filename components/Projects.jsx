'use client'

import React from 'react';
import { Box, Container, Paper, Typography, Card, CardContent, CardActions, Button, Chip, Grid, useTheme, useMediaQuery } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ConstructionIcon from '@mui/icons-material/Construction'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { visuallyHidden, pageBackground } from './sharedStyles'
import PageHeader from './PageHeader'
import NewTabNotice from './NewTabNotice'

/**
 * Status badge text and icon. The icon color is a supporting cue only;
 * the text label carries the meaning.
 */
const statusBadges = {
  'live': { label: 'Live', icon: <CheckCircleIcon color="success" /> },
  'in-progress': { label: 'In progress', icon: <ConstructionIcon color="warning" /> },
  'complete': { label: 'Complete', icon: <TaskAltIcon color="action" /> },
}

/**
 * Creates theme-aware styles for the Projects component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundImage: pageBackground(theme),
    padding: 3,
  },
  paper: {
    padding: { xs: 3, sm: 6 },
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    width: '100%',
    maxWidth: '1200px',
  },
  projectCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 24px rgba(144, 202, 249, 0.2)'
        : '0 8px 24px rgba(102, 126, 234, 0.2)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  projectName: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: 1,
  },
  projectDescription: {
    color: 'text.secondary',
    lineHeight: 1.6,
  },
  statusChip: {
    marginBottom: 1.5,
    fontWeight: 600,
  },
  techList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.75,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginTop: 2,
  },
  techChip: {
    fontSize: '0.75rem',
  },
  cardActions: {
    padding: 2,
    paddingTop: 0,
    gap: 1,
  },
  linkButton: {
    textTransform: 'none',
  },
})

/**
 * Projects component - Personal projects showcase page.
 * 
 * Displays project cards with name, status badge, description, tech stack, and links.
 * Features a responsive grid layout with themed styling.
 * 
 * @component
 * @returns {JSX.Element} The rendered Projects page component
 * 
 * @example
 * <Projects />
 */
export default function Projects() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  /**
   * Projects data with name, description, optional status, tech stack, and links.
   * status: 'live' | 'in-progress' | 'complete'
   */
  const projects = [
    {
      name: 'words2macros',
      status: 'live',
      tech: ['Python', 'AWS Lambda', 'API Gateway', 'Amazon Bedrock', 'AWS SAM'],
      description: 'A serverless API that turns plain-language meal descriptions into macronutrients. An LLM on Bedrock parses the food items, USDA data supplies every nutrient value, and Pydantic validates each payload before any math runs.',
      links: [
        { label: 'Live app', url: 'https://d3oosb3wyilt9u.cloudfront.net/', icon: LaunchIcon },
        { label: 'GitHub', url: 'https://github.com/calvinle/words2macros', icon: GitHubIcon },
      ],
    },
    {
      name: 'Personal Portfolio',
      status: 'live',
      tech: ['Next.js', 'React', 'Material UI', 'Firebase'],
      description: 'The site you\'re on now. Built with responsive design, light and dark themes, and accessibility in mind, plus live powerlifting and speedcubing stats.',
      links: [
        { label: 'GitHub', url: 'https://github.com/calvinle/calvin-le', icon: GitHubIcon },
      ],
    },
    {
      name: 'Smart Fitness Tracker',
      status: 'in-progress',
      tech: ['Go', 'TypeScript', 'React', 'Google Cloud'],
      description: 'A microservices-based fitness tracker that demonstrates orchestrated and choreographed workflows on Google Cloud. It logs workouts, computes e1RM and fitness scores, detects personal records, and aggregates stats.',
      links: [
        { label: 'Live app', url: 'https://smart-fitness-tracker-491117.web.app/', icon: LaunchIcon },
        { label: 'GitHub', url: 'https://github.com/calvinle/smart-fitness-tracker', icon: GitHubIcon },
      ],
    },
    {
      name: 'Powerlifting Plate Calculator',
      status: 'complete',
      tech: ['Java', 'Android'],
      description: 'An Android app that tells powerlifters which plates to load on the barbell for any target weight.',
      links: [
        { label: 'GitHub', url: 'https://github.com/calvinle/Powerlifting-Plate-Calculator', icon: GitHubIcon },
      ],
    },
    {
      name: 'piHue',
      status: 'complete',
      tech: ['Python', 'Raspberry Pi', 'Philips Hue API'],
      description: 'A Raspberry Pi project that controls Philips Hue smart lights based on sensor input and user preferences.',
      links: [
        { label: 'Demo video', url: 'https://www.youtube.com/watch?v=jSCjfSZUzp8', icon: PlayCircleOutlineIcon },
        { label: 'GitHub', url: 'https://github.com/calvinle/piHue', icon: GitHubIcon },
      ],
    },
  ]

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={styles.paper}>
          <PageHeader
            title="Projects"
            intro="Things I've built for work, for fun, and to learn something new."
          />

          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3} sx={styles.projectCard}>
                  <CardContent sx={styles.cardContent}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={styles.projectName}
                    >
                      {project.name}
                    </Typography>
                    {project.status && (
                      <Chip
                        size="small"
                        variant="outlined"
                        icon={statusBadges[project.status].icon}
                        label={statusBadges[project.status].label}
                        sx={styles.statusChip}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={styles.projectDescription}
                    >
                      {project.description}
                    </Typography>
                    <Box component="ul" aria-label={`Technologies used in ${project.name}`} sx={styles.techList}>
                      {project.tech.map((tech) => (
                        <li key={tech}>
                          <Chip size="small" label={tech} sx={styles.techChip} />
                        </li>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={styles.cardActions}>
                    {project.links.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        size="small"
                        variant="outlined"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<link.icon />}
                        sx={styles.linkButton}
                      >
                        {link.label}
                        {/* e.g. "GitHub: piHue (opens in new tab)" for screen readers */}
                        <Box component="span" sx={visuallyHidden}>: {project.name}</Box>
                        <NewTabNotice />
                      </Button>
                    ))}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

