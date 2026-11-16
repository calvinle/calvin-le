/**
 * Hides content visually while keeping it available to screen readers.
 * Use for headings that give a page structure but would be redundant on screen.
 */
export const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

/**
 * Gradient text built from the active theme's primary and secondary colors.
 * Falls back to solid system text in forced-colors (high contrast) mode, where
 * transparent text fill would otherwise make the heading disappear.
 * @param {Object} theme - MUI theme object
 * @returns {Object} sx style object
 */
export const gradientText = (theme) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  '@media (forced-colors: active)': {
    background: 'none',
    WebkitTextFillColor: 'CanvasText',
  },
})

/**
 * Soft page background shared by every page, built from the theme colors
 * so it follows light and dark mode.
 * @param {Object} theme - MUI theme object
 * @returns {string} CSS background-image value
 */
export const pageBackground = (theme) =>
  `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`

/**
 * Page title (h1) style: bold gradient text.
 * @param {Object} theme - MUI theme object
 * @returns {Object} sx style object
 */
export const pageHeading = (theme) => ({
  fontWeight: 700,
  ...gradientText(theme),
})

/**
 * Section title (h2) style, used the same way on every page.
 */
export const sectionHeading = {
  fontWeight: 700,
  color: 'text.primary',
}

/**
 * Long-form paragraph style: comfortable line height, readable line length,
 * and space between consecutive paragraphs.
 */
export const prose = {
  lineHeight: 1.7,
  maxWidth: '68ch',
  '& + &': { marginTop: 2 },
}

/**
 * Small supporting text such as locations, dates and captions.
 */
export const metaText = {
  color: 'text.secondary',
  fontSize: '0.875rem',
}
