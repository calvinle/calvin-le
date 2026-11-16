'use client'

import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Box, ButtonBase } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import CommandPalette from './CommandPalette'
import { navItems } from './navConfig'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    minHeight: { xs: 56 },
    display: 'flex',
    gap: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  crumbs: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 1,
    mr: 'auto',
    minWidth: 0,
    whiteSpace: 'nowrap',
  },
  brand: {
    color: 'inherit',
    fontWeight: 700,
    fontSize: '1.125rem',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
  separator: { opacity: 0.6 },
  current: {
    opacity: 0.85,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexShrink: 0,
    height: 36,
    px: { xs: 1, sm: 1.5 },
    minWidth: { sm: 260 },
    borderRadius: 2,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    bgcolor: 'rgba(255, 255, 255, 0.12)',
    color: 'inherit',
    fontSize: '0.9rem',
    transition: 'background-color 150ms',
    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
    '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 2 },
  },
  triggerText: {
    flex: 1,
    textAlign: 'left',
    opacity: 0.9,
    // Hidden visually on phones but kept as the button's accessible name
    '@media (max-width: 599.95px)': {
      position: 'absolute',
      width: 1,
      height: 1,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
    },
  },
  kbd: {
    display: { xs: 'none', sm: 'inline-block' },
    px: 0.75,
    py: 0.25,
    borderRadius: 1,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    lineHeight: 1.4,
    opacity: 0.85,
  },
}

/**
 * NavBar component - Slim site header with a command palette trigger.
 *
 * Shows the site name (links home), a breadcrumb for the current page, and a
 * search-style button that opens the CommandPalette. Ctrl+K / Cmd+K toggles
 * the palette from anywhere.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.themePreference - Current preference ('system' | 'light' | 'dark' | 'red')
 * @param {Function} props.onThemeChange - Called with the newly chosen preference
 * @returns {JSX.Element} The rendered navigation bar component
 *
 * @example
 * <NavBar themePreference="system" onThemeChange={(value) => setPreference(value)} />
 */
export default function NavBar({ themePreference, onThemeChange }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // null until mounted, so the server-rendered HTML never shows the wrong key
  const [shortcutLabel, setShortcutLabel] = useState(null)

  const currentPage = navItems.find((item) => item.path === pathname && item.path !== '/')

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
    setShortcutLabel(isMac ? '⌘K' : 'Ctrl K')

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((wasOpen) => !wasOpen)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box component="nav" aria-label="Main" sx={styles.nav}>
          <Box sx={styles.crumbs}>
            <Box
              component={Link}
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              sx={styles.brand}
            >
              Calvin Le
            </Box>
            {currentPage && (
              <>
                <Box component="span" aria-hidden="true" sx={styles.separator}>/</Box>
                <Box component="span" aria-current="page" sx={styles.current}>{currentPage.label}</Box>
              </>
            )}
          </Box>
          <ButtonBase
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-keyshortcuts="Control+K Meta+K"
            sx={styles.trigger}
          >
            <SearchIcon fontSize="small" />
            <Box component="span" sx={styles.triggerText}>Search or jump to...</Box>
            {shortcutLabel && (
              <Box component="kbd" aria-hidden="true" sx={styles.kbd}>{shortcutLabel}</Box>
            )}
          </ButtonBase>
        </Box>
      </Toolbar>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        themePreference={themePreference}
        onThemeChange={onThemeChange}
      />
    </AppBar>
  )
}
