/**
 * Plain theme values shared by the MUI themes (client) and the pre-paint
 * script in app/layout.jsx (server). Kept free of MUI imports so the server
 * layout can use them.
 */
export const THEME_STORAGE_KEY = 'app-theme'

export const themeBackgrounds = {
  light: '#f5f5f5',
  dark: '#0A1929',
  red: '#1A0A0A',
}
