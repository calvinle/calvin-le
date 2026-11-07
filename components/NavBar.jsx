'use client'

import { useState } from 'react'
import { AppBar, Toolbar, Button, IconButton, Box, Menu, MenuItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import FolderIcon from '@mui/icons-material/Folder'
import DescriptionIcon from '@mui/icons-material/Description'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CasinoIcon from '@mui/icons-material/Casino'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import CheckIcon from '@mui/icons-material/Check'
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
  { label: 'Resume', icon: DescriptionIcon, path: '/resume' },
  { label: 'Powerlifting', icon: FitnessCenterIcon, path: '/powerlifting' },
  { label: 'Speedcubing', icon: CasinoIcon, path: '/speedcubing' },
  { label: 'Contact', icon: ContactMailIcon, path: '/contact' },
]

/**
 * Options for the theme menu. 'system' follows the visitor's OS light/dark setting.
 */
const themeOptions = [
  { value: 'system', label: 'System', icon: SettingsBrightnessIcon },
  { value: 'light', label: 'Light', icon: LightModeIcon },
  { value: 'dark', label: 'Dark', icon: DarkModeIcon },
  { value: 'red', label: 'Red', icon: LocalFireDepartmentIcon },
]

/**
 * NavBar component - Main navigation bar for the application.
 * 
 * Provides navigation links to all pages with responsive design.
 * Includes a theme menu (System, Light, Dark, Red).
 * On mobile, navigation collapses into a hamburger menu.
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
  const theme = useTheme()
  // Full nav with icons needs ~1060px and text-only ~820px, so: hamburger below md,
  // text-only links from md to lg, icons from lg up. Nothing overflows at any width.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const showNavIcons = useMediaQuery(theme.breakpoints.up('lg'))
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const [themeAnchorEl, setThemeAnchorEl] = useState(null)
  const themeMenuOpen = Boolean(themeAnchorEl)

  const currentThemeOption = themeOptions.find((option) => option.value === themePreference) || themeOptions[0]

  const handleThemeSelect = (value) => {
    onThemeChange(value)
    setThemeAnchorEl(null)
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
          <Box component="nav" aria-label="Main" sx={{ mr: 'auto' }}>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="Open navigation menu"
              aria-controls={menuOpen ? 'nav-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
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
                  href={item.path}
                  onClick={handleMenuClose}
                  selected={pathname === item.path}
                  aria-current={pathname === item.path ? 'page' : undefined}
                  sx={{ gap: 1 }}
                >
                  <item.icon fontSize="small" />
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Box component="nav" aria-label="Main" sx={styles.navButtons}>
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    ...styles.navButton,
                    borderBottom: isActive ? '2px solid' : '2px solid transparent',
                    borderRadius: 0,
                    fontWeight: isActive ? 700 : 400,
                  }}
                  startIcon={showNavIcons ? <item.icon /> : undefined}
                  color="inherit"
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        )}
        <IconButton
          sx={styles.themeToggle}
          onClick={(event) => setThemeAnchorEl(event.currentTarget)}
          aria-label={`Theme: ${currentThemeOption.label}`}
          aria-controls={themeMenuOpen ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={themeMenuOpen ? 'true' : undefined}
        >
          <currentThemeOption.icon />
        </IconButton>
        <Menu
          id="theme-menu"
          anchorEl={themeAnchorEl}
          open={themeMenuOpen}
          onClose={() => setThemeAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {themeOptions.map((option) => {
            const isSelected = option.value === themePreference
            return (
              <MenuItem
                key={option.value}
                role="menuitemradio"
                aria-checked={isSelected}
                selected={isSelected}
                onClick={() => handleThemeSelect(option.value)}
              >
                <ListItemIcon>
                  <option.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{option.label}</ListItemText>
                {isSelected && <CheckIcon fontSize="small" sx={{ ml: 2 }} />}
              </MenuItem>
            )
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

