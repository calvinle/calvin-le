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
      default: '#0A1929',
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

export const redTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
      light: '#FF8A8A',
      dark: '#C62828',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#FFB4B4',
      light: '#FFCCCC',
      dark: '#E57373',
      contrastText: '#1A1A1A',
    },
    error: {
      main: '#FF5252',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#1A0A0A',
      paper: '#2D1515',
    },
    surface: {
      main: '#1A0A0A',
      variant: '#3D1E1E',
    },
    text: {
      primary: '#FFE5E5',
      secondary: '#CCAAAA',
    },
    divider: 'rgba(255, 107, 107, 0.15)',
    action: {
      active: '#FF6B6B',
      hover: 'rgba(255, 107, 107, 0.1)',
      selected: 'rgba(255, 107, 107, 0.15)',
      disabled: 'rgba(255, 229, 229, 0.38)',
      disabledBackground: 'rgba(255, 229, 229, 0.12)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D1515',
          borderBottom: '1px solid rgba(255, 107, 107, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#2D1515',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 107, 107, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#C62828',
            color: '#FFE5E5',
            '&:hover': {
              backgroundColor: '#B71C1C',
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif',
  },
})

