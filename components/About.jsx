'use client'

import React from 'react';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material'
import { pageBackground, prose, sectionHeading } from './sharedStyles'
import PageHeader from './PageHeader'

/**
 * Creates theme-aware styles for the About component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundImage: pageBackground(theme),
    padding: 3,
  },
  paper: {
    padding: { xs: 3, sm: 6 },
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
  },
  paragraph: {
    ...prose,
  },
  sectionTitle: {
    ...sectionHeading,
    marginTop: 4,
    marginBottom: 1.5,
  },
  factList: {
    margin: 0,
    paddingLeft: 3,
    '& li': {
      lineHeight: 1.7,
      marginBottom: 0.5,
    },
  },
})

/**
 * Short personal facts shown as a bulleted list.
 */
const quickFacts = [
  'Born and raised in the suburbs of Los Angeles, California',
  'Bachelor of Science in Computer Science, Colorado State University, 2018',
  'Semi-competitive speedcuber',
  'Actually-competitive powerlifter',
  'EDM enthusiast of all kinds since age 13',
  'Used to perform Michael Jackson dance covers at local events',
  'Coffee made via pour-over and taken black',
]

/**
 * About component - Personal information page.
 * 
 * Displays biographical information and background details.
 * Uses a readable single-column card layout.
 * 
 * @component
 * @returns {JSX.Element} The rendered About page component
 * 
 * @example
 * <About />
 */
export default function About() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="md">
        <Paper elevation={10} sx={styles.paper}>
          <PageHeader title="About Me" align="left" sx={{ marginBottom: 3 }} />

          <Typography variant="body1" sx={styles.paragraph}>
            I was born in Southern California, earned my degree in Colorado, and now live in Kansas City (on the Kansas side). I've traveled across the country for music festivals and sightseeing, and for powerlifting meets and Rubik's Cube competitions.
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            I'm a full-stack developer who has mostly worked with React on the front end and Node.js and Java on the back end, using frameworks like Next.js, Express, and Spring Boot. Software engineering has taught me that, given enough time to debug, almost any problem can be solved, often made simpler, and turned into a chance to learn.
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            Over the last few years, I've found a real passion for teaching and leading others, helping people build on their strengths and work through their weaknesses. I believe working toward mastery in any discipline is how we grow as people.
          </Typography>

          <Typography variant="h6" component="h2" sx={styles.sectionTitle}>
            Quick Facts
          </Typography>

          <Box component="ul" sx={styles.factList}>
            {quickFacts.map((fact) => (
              <Typography component="li" variant="body1" key={fact}>
                {fact}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
