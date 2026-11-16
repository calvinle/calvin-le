'use client'

import { Box, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { contactItems, isExternal } from './contactItems'
import { navItems } from './navConfig'

const styles = {
  footer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    paddingX: 3,
    paddingY: 2,
    borderTop: 1,
    borderColor: 'divider',
    bgcolor: 'background.default',
  },
  copyright: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  links: {
    display: 'flex',
    gap: 1,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  pageLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
    rowGap: 0.5,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '& a': {
      color: 'text.secondary',
      fontSize: '0.875rem',
      textDecoration: 'none',
      '&:hover, &:focus-visible': { color: 'primary.main', textDecoration: 'underline' },
    },
  },
  iconButton: {
    color: 'text.secondary',
    '&:hover, &:focus-visible': {
      color: 'primary.main',
    },
  },
}

/**
 * Footer component - Site-wide footer with copyright, page links and contact links.
 * The page links keep every page reachable as plain HTML links, since the header
 * navigation lives inside the command palette.
 *
 * @component
 * @returns {JSX.Element} The rendered footer
 */
export default function Footer() {
  return (
    <Box component="footer" sx={styles.footer}>
      <Typography sx={styles.copyright}>
        © {new Date().getFullYear()} Calvin Le
      </Typography>
      <Box component="nav" aria-label="Site pages">
        <Box component="ul" sx={styles.pageLinks}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </Box>
      </Box>
      <Box component="ul" aria-label="Contact links" sx={styles.links}>
        {contactItems.map((item) => (
          <li key={item.title}>
            <IconButton
              href={item.href}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
              aria-label={isExternal(item.href) ? `${item.title} (opens in new tab)` : item.title}
              sx={styles.iconButton}
            >
              <item.icon />
            </IconButton>
          </li>
        ))}
      </Box>
    </Box>
  )
}
