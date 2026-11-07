'use client'

import React from 'react';
import { Box, Button, Container, Paper, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { gradientText } from './sharedStyles'

/**
 * Creates theme-aware styles for the NotFound component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`,
    padding: 3,
  },
  paper: {
    padding: { xs: 4, sm: 6 },
    textAlign: 'center',
    borderRadius: 3,
  },
  code: {
    fontWeight: 800,
    fontSize: { xs: '4rem', sm: '5rem' },
    lineHeight: 1,
    ...gradientText(theme),
    marginBottom: 1,
  },
  heading: {
    fontWeight: 700,
    marginBottom: 2,
  },
  description: {
    color: 'text.secondary',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 1.5,
    marginTop: 4,
  },
  actionButton: {
    textTransform: 'none',
    fontWeight: 600,
  },
})

/**
 * NotFound component - Shown for any URL that doesn't match a page.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 page
 */
export default function NotFound() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          {/* Decorative; the h1 below carries the meaning */}
          <Typography aria-hidden="true" sx={styles.code}>404</Typography>
          <Typography variant="h4" component="h1" sx={styles.heading}>
            Page not found
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            This page doesn't exist or may have moved. Try one of these instead:
          </Typography>
          <Box sx={styles.actions}>
            <Button component={Link} href="/" variant="contained" sx={styles.actionButton}>
              Go home
            </Button>
            <Button component={Link} href="/projects" variant="outlined" sx={styles.actionButton}>
              Projects
            </Button>
            <Button component={Link} href="/contact" variant="outlined" sx={styles.actionButton}>
              Contact
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
