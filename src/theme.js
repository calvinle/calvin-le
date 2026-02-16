import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#D32F2F',
        },
      },
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',           // Light blue for dark mode visibility
      light: '#E3F2FD',
      dark: '#1565C0',
      contrastText: '#0D47A1',
    },
    secondary: {
      main: '#CE93D8',           // Light purple for secondary
      light: '#F3E5F5',
      dark: '#7B1FA2',
      contrastText: '#4A148C',
    },
    error: {
      main: '#EF9A9A',
      contrastText: '#B71C1C',
    },
    background: {
      default: '#0A1929',        // Deep navy blue
      paper: '#132F4C',          // Elevated surface
    },
    surface: {
      main: '#0A1929',
      variant: '#1E4976',        // Surface variant for borders/dividers
    },
    text: {
      primary: '#E3F2FD',        // Cool off-white
      secondary: '#B0BEC5',      // Muted for secondary text
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
          backgroundColor: '#1E3A5F',  // Dark blue app bar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',     // Remove default elevation overlay
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
})
