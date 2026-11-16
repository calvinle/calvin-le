import { createTheme } from '@mui/material/styles'
import { themeBackgrounds } from './themeConstants'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // Darker than the original #667eea so text meets WCAG AA (4.5:1) on white and #f5f5f5
      main: '#4f63d2',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: themeBackgrounds.light,
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif',
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
      light: '#E3F2FD',
      dark: '#1565C0',
      contrastText: '#0D47A1',
    },
    secondary: {
      main: '#CE93D8',
      light: '#F3E5F5',
      dark: '#7B1FA2',
      contrastText: '#4A148C',
    },
    error: {
      main: '#EF9A9A',
      contrastText: '#B71C1C',
    },
    background: {
      default: themeBackgrounds.dark,
      paper: '#132F4C',
    },
    surface: {
      main: '#0A1929',
      variant: '#1E4976',
    },
    text: {
      primary: '#E3F2FD',
      secondary: '#B0BEC5',
    },
    divider: 'rgba(144, 202, 249, 0.12)',
    action: {
      active: '#90CAF9',
      hover: 'rgba(144, 202, 249, 0.08)',
      selected: 'rgba(144, 202, 249, 0.12)',
      disabled: 'rgba(227, 242, 253, 0.38)',
      disabledBackground: 'rgba(227, 242, 253, 0.12)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E3A5F',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(144, 202, 249, 0.12)',
        },
      },
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif',
  },
})

export const themes = {
  light: lightTheme,
  dark: darkTheme,
}
