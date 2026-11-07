'use client'

import React from 'react';
import { Box, Button, Container, Paper, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { gradientText } from './sharedStyles'

/**
 * One photo per theme. Only the active one is exposed to screen readers;
 * the others stay rendered (invisible) so the theme switch can cross-fade.
 */
const photos = [
  { src: '/images/photo-light.webp', alt: 'Calvin Le smiling outdoors in a dark suit and bow tie', isActive: (theme) => theme.palette.mode === 'light' },
  { src: '/images/photo-dark.webp', alt: 'Calvin Le wearing round blue sunglasses and a black t-shirt', isActive: (theme) => theme.palette.mode === 'dark' && theme.palette.primary.main !== '#FF6B6B' },
  { src: '/images/photo-red.webp', alt: 'Calvin Le in a grey jacket on a city street at night', isActive: (theme) => theme.palette.primary.main === '#FF6B6B' },
]

/**
 * Creates theme-aware styles for the Home component.
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
  },
  photoSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
    width: 200,
    height: 200,
    margin: '0 auto',
    marginBottom: 4,
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
  },
  heading: {
    fontWeight: 700,
    ...gradientText(theme),
    marginBottom: 2,
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  intro: {
    color: 'text.secondary',
    lineHeight: 1.6,
    marginTop: 2,
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
 * Home component - Landing page of the portfolio website.
 * 
 * Displays a profile photo, a brief introduction, and links to the main sections.
 * Uses theme-aware gradient styling for visual appeal.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home page component
 * 
 * @example
 * <Home />
 */
export default function Home() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Box sx={styles.photoSection}>
            {photos.map((photo) => {
              const active = photo.isActive(theme)
              return (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={active ? photo.alt : ''}
                  aria-hidden={active ? undefined : 'true'}
                  style={{ ...styles.photo, opacity: active ? 1 : 0 }}
                />
              )
            })}
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={styles.heading}
          >
            Calvin Le
          </Typography>
          <Typography
            variant="body1"
            sx={styles.description}
          >
            Educator, engineer, powerlifter, and tinkerer of all kinds.
          </Typography>
          <Typography
            variant="body1"
            sx={styles.intro}
          >
            Software engineer and technical educator, open to new engineering and developer education roles.
          </Typography>
          <Box sx={styles.actions}>
            <Button component={Link} href="/work" variant="contained" sx={styles.actionButton}>
              View my work
            </Button>
            <Button component={Link} href="/resume" variant="outlined" sx={styles.actionButton}>
              Resume
            </Button>
            <Button component={Link} href="/projects" variant="outlined" sx={styles.actionButton}>
              Projects
            </Button>
            <Button component={Link} href="/contact" variant="outlined" sx={styles.actionButton}>
              Get in touch
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

