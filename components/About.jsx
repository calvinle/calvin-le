import React from 'react';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material'

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
    backgroundImage: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.05) 0%, rgba(30, 58, 95, 0.15) 100%)'
      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    padding: 3,
  },
  paper: {
    padding: 6,
    textAlign: 'center',
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    maxWidth: '600px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 700,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #90CAF9 0%, #CE93D8 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: 2,
  },
  description: {
    fontSize: '1rem',
    lineHeight: 1.8,
    marginBottom: 0,
  },
})

/**
 * About component - Personal information page.
 * 
 * Displays biographical information and background details.
 * Features a centered card layout with themed gradient styling.
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
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            sx={styles.heading}
          >
            A Little Bit About Calvin
          </Typography>

          <Typography
            variant="body1"
            sx={styles.description}
          >
            Calvin can be described as a worldly person. Born in Southern California, got his degree in Colorado, and currently resides in Kansas City (on the Kansas side). He has travelled the country not only for music and tourism, but also for powerlifting and Rubik's Cube competitions.
          </Typography>
          <Typography
            variant="body1"
            sx={styles.description}
          >
            He is well-versed in full-stack development, having primarily worked with React for front-end design and Node.js and Java for back-end development. He also enjoys working with various frameworks including React.JS, Next.JS, Express.JS, and Spring Boot. Software engineering has taught that with enough time to debug, any problem can not only be solved, but also potentially made simpler and serve as a learning opportunity.
          </Typography>
          <Typography
            variant="body1"
            sx={styles.description}
          >
            Over the last few years, he has developed a strong interest in teaching and leading others, developing both their strengths and weaknesses. Mastery in any discipline leads to growth as a person.
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={styles.heading}
          >
            Some More About Calvin
          </Typography>

          <Box component="ul" sx={{ textAlign: 'left', display: 'inline-block', lineHeight: 2, p: 0, m: 0 }}>
            <Typography component="li" variant="body1" sx={styles.description}>
              Born and raised in the suburbs of Los Angeles, California
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              Bachelor of Science in Computer Science @ Colorado State University, 2018
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              Semi-competitive speedcuber
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              Actually-competitive powerlifter
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              EDM enthusiast of all kinds since 13!
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              Used to perform Michael Jackson dance covers at local events
            </Typography>
            <Typography component="li" variant="body1" sx={styles.description}>
              Coffee made via pour-over and taken black
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

