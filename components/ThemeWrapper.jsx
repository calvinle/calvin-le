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
        <NavBar themeName={themeName} cycleTheme={cycleTheme} />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '64px' }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

