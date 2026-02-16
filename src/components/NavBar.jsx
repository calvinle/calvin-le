import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    display: 'flex',
    gap: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButtons: {
    display: 'flex',
    gap: 2,
    flex: 1,
    justifyContent: 'center',
  },
  navButton: {
    color: 'inherit',
    textTransform: 'none',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    textDecoration: 'none',
  },
  themeToggle: {
    color: 'inherit',
  },
}

const navItems = [
  { label: 'Home', icon: HomeIcon, path: '/' },
  { label: 'About', icon: InfoIcon, path: '/about' },
  { label: 'Work', icon: WorkIcon, path: '/work' },
  { label: 'Contact', icon: ContactMailIcon, path: '/contact' },
]

export default function NavBar({ isDarkMode, setIsDarkMode }) {
  const location = useLocation()

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navButtons}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={styles.navButton}
              startIcon={<item.icon />}
              color={location.pathname === item.path ? 'secondary' : 'inherit'}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <IconButton
          sx={styles.themeToggle}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
