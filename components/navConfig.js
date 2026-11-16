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

/**
 * Site pages. Used by the header breadcrumb, the command palette and the footer.
 */
export const navItems = [
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
 * Theme choices. 'system' follows the visitor's OS light/dark setting.
 */
export const themeOptions = [
  { value: 'system', label: 'System', icon: SettingsBrightnessIcon },
  { value: 'light', label: 'Light', icon: LightModeIcon },
  { value: 'dark', label: 'Dark', icon: DarkModeIcon },
]
