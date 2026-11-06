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
