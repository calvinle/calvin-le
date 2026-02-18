import { useState } from 'react'
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import FolderIcon from '@mui/icons-material/Folder'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CasinoIcon from '@mui/icons-material/Casino'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import MenuIcon from '@mui/icons-material/Menu'

/**
 * Responsive styles for the NavBar component.
 * @returns {Object} Style definitions for component elements
 */
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
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  navButton: {
    color: 'inherit',
    textTransform: 'none',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    textDecoration: 'none',
    flex: '0 0 auto',
  },
  themeToggle: {
    color: 'inherit',
  },
}

/**
 * Items for navigation bar
 */
const navItems = [
  { label: 'Home', icon: HomeIcon, path: '/' },
  { label: 'About', icon: InfoIcon, path: '/about' },
  { label: 'Work', icon: WorkIcon, path: '/work' },
  { label: 'Projects', icon: FolderIcon, path: '/projects' },
  { label: 'Powerlifting', icon: FitnessCenterIcon, path: '/powerlifting' },
  { label: 'Speedcubing', icon: CasinoIcon, path: '/speedcubing' },
  { label: 'Contact', icon: ContactMailIcon, path: '/contact' },
]

/**
 * NavBar component - Main navigation bar for the application.
 * 
 * Provides navigation links to all pages with responsive design.
 * Includes a theme toggle button that cycles through light, dark, and red modes.
 * On mobile, navigation collapses into a hamburger menu.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.themeName - Current theme name ('light' | 'dark' | 'red')
 * @param {Function} props.cycleTheme - Callback function to cycle to the next theme
 * @returns {JSX.Element} The rendered navigation bar component
 * 
 * @example
 * <NavBar themeName="dark" cycleTheme={() => setTheme(nextTheme)} />
 */
export default function NavBar({ themeName, cycleTheme }) {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const getThemeIcon = () => {
    switch (themeName) {
      case 'dark':
        return <Brightness7Icon />
      case 'red':
        return <LocalFireDepartmentIcon />
      default:
        return <Brightness4Icon />
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ mr: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  selected={location.pathname === item.path}
                  sx={{ gap: 1 }}
                >
                  <item.icon fontSize="small" />
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={styles.navButtons}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    ...styles.navButton,
                    borderBottom: isActive ? '2px solid' : '2px solid transparent',
                    borderRadius: 0,
                    fontWeight: isActive ? 700 : 400,
                  }}
                  startIcon={<item.icon />}
                  color={isActive ? 'secondary' : 'inherit'}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        )}
        <IconButton
          sx={styles.themeToggle}
          onClick={cycleTheme}
        >
          {getThemeIcon()}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
