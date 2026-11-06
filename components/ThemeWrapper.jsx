'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, Box } from '@mui/material'
import { lightTheme, darkTheme, redTheme } from './theme'
import NavBar from './NavBar'

const themes = {
  light: lightTheme,
  dark: darkTheme,
  red: redTheme,
}

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
  const [themeName, setThemeName] = useState('light')
  const [hydrated, setHydrated] = useState(false)
  const theme = themes[themeName] || lightTheme

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme)
    }
    setHydrated(true)
  }, [])

  const cycleTheme = () => {
    setThemeName(prev => {
      let newTheme
      if (prev === 'light') newTheme = 'dark'
      else if (prev === 'dark') newTheme = 'red'
      else newTheme = 'light'
      
      // Save to localStorage
      localStorage.setItem('app-theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hidden until focused, lets keyboard users jump past the nav */}
        <Box component="a" href="#main-content" sx={styles.skipLink}>
          Skip to main content
        </Box>
        <NavBar themeName={themeName} cycleTheme={cycleTheme} />
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '64px', '&:focus': { outline: 'none' } }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

