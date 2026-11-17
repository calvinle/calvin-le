'use client'

import React from 'react';
import { Box, Container, Paper, Typography, useTheme, Link } from '@mui/material'
import { pageBackground, metaText } from './sharedStyles'
import PageHeader from './PageHeader'
import NewTabNotice from './NewTabNotice'
import { contactItems, isExternal } from './contactItems'

/**
 * Creates theme-aware styles for the Contact component.
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    width: '100%',
    maxWidth: '500px',
    marginX: 'auto',
  },
  note: {
    ...metaText,
    textAlign: 'center',
    mb: 4,
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: 3,
    borderRadius: 2,
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.mode === 'light' ? '#fff' : theme.palette.primary.contrastText,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  cardSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
})

/**
 * Contact component - Contact information page.
 * 
 * Displays contact methods including email, LinkedIn, and GitHub
 * with interactive hover effects and external links.
 * 
 * @component
 * @returns {JSX.Element} The rendered Contact page component
 * 
 * @example
 * <Contact />
 */
export default function Contact() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <PageHeader
          title="Get In Touch"
          intro="Open to engineering and developer education opportunities. Email is the fastest way to reach me."
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="body2" sx={styles.note}>
          Spotted something broken on the site? Let me know - screenshots encouraged!
        </Typography>
        <Box sx={styles.content}>
          {contactItems.map((item) => (
            <Paper
              key={item.title}
              component={Link}
              href={item.href}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
              elevation={6}
              sx={styles.contactCard}
            >
              <Box sx={styles.iconWrapper}>
                <item.icon fontSize="large" />
              </Box>
              <Box sx={styles.cardContent}>
                <Typography variant="h6" component="h2" sx={styles.cardTitle}>
                  {item.title}
                </Typography>
                <Typography sx={styles.cardSubtitle}>
                  {item.subtitle}
                </Typography>
              </Box>
              {isExternal(item.href) && <NewTabNotice />}
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

