'use client'

import { useState } from 'react'
import { ThemeProvider, Box } from '@mui/material'
import { lightTheme, darkTheme, redTheme } from './theme'
import NavBar from '../src/components/NavBar'

const themes = {
  light: lightTheme,
  dark: darkTheme,
  red: redTheme,
}

export default function ThemeWrapper({ children }) {
  const [themeName, setThemeName] = useState('light')
  const theme = themes[themeName] || lightTheme

  const cycleTheme = () => {
    setThemeName(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'red'
      return 'light'
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

