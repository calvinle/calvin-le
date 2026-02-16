import { Box, AppBar, Toolbar, Button, ThemeProvider, IconButton } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { lightTheme, darkTheme } from './theme'
import Home from './components/Home'
import About from './components/About'
import Work from './components/Work'
import Powerlifting from './components/Powerlifting'
import NavBar from './components/NavBar'

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '64px',
  },
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          <Box sx={styles.appWrapper}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/powerlifting" element={<Powerlifting />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
