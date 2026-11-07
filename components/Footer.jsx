'use client'

import { Box, IconButton, Typography } from '@mui/material'
import { contactItems, isExternal } from './contactItems'

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
  iconButton: {
    color: 'text.secondary',
    '&:hover, &:focus-visible': {
      color: 'primary.main',
    },
  },
}

/**
 * Footer component - Site-wide footer with copyright and contact links.
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
