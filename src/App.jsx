import { Box, AppBar, Toolbar, Button, ThemeProvider, IconButton } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { lightTheme, darkTheme, redTheme } from './theme'
import Home from './components/Home'
import About from './components/About'
import Work from './components/Work'
import Projects from './components/Projects'
import Powerlifting from './components/Powerlifting'
import Speedcubing from './components/Speedcubing'
import Contact from './components/Contact'
import NavBar from './components/NavBar'

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '64px',
  },
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
  red: redTheme,
}

function App() {
  const [themeName, setThemeName] = useState('light')
  const theme = themes[themeName]

  const cycleTheme = () => {
    setThemeName(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'red'
      return 'light'
    })
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <NavBar themeName={themeName} cycleTheme={cycleTheme} />

          <Box sx={styles.appWrapper}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/powerlifting" element={<Powerlifting />} />
              <Route path="/speedcubing" element={<Speedcubing />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
