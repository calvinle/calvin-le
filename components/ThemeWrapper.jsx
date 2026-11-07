'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, Box } from '@mui/material'
import { themes } from './theme'
import { THEME_STORAGE_KEY } from './themeConstants'
import NavBar from './NavBar'
import Footer from './Footer'

const isValidPreference = (value) => value === 'system' || Boolean(themes[value])

const styles = {
  skipLink: {
    position: 'absolute',
    left: 8,
    top: -100,
    zIndex: 2000,
    padding: '8px 16px',
    borderRadius: 1,
    bgcolor: 'background.paper',
    color: 'text.primary',
    fontWeight: 600,
    '&:focus': {
      top: 8,
      outline: '3px solid',
      outlineColor: 'primary.main',
    },
  },
}

export default function ThemeWrapper({ children }) {
  // 'system' follows the OS light/dark setting; otherwise a theme name
  const [preference, setPreference] = useState('system')
  const [systemDark, setSystemDark] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const themeName = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference
  const theme = themes[themeName]

  // Load the saved preference and start following the OS setting
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (isValidPreference(saved)) {
      setPreference(saved)
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(media.matches)
    const handleChange = (event) => setSystemDark(event.matches)
    media.addEventListener('change', handleChange)
    setHydrated(true)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  // Once the real theme has rendered, sync <html> and reveal the page (see app/layout.jsx)
  useEffect(() => {
    if (!hydrated) return
    const root = document.documentElement
    root.style.backgroundColor = theme.palette.background.default
    root.style.colorScheme = theme.palette.mode
    root.classList.remove('theme-pending')
  }, [hydrated, theme])

  const changeTheme = (newPreference) => {
    setPreference(newPreference)
    localStorage.setItem(THEME_STORAGE_KEY, newPreference)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Hidden until focused, lets keyboard users jump past the nav */}
        <Box component="a" href="#main-content" sx={styles.skipLink}>
          Skip to main content
        </Box>
        <NavBar themePreference={preference} onThemeChange={changeTheme} />
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: '64px', '&:focus': { outline: 'none' } }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

