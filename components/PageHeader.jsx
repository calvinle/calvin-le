'use client'

import { Box, Typography, useTheme } from '@mui/material'
import { pageHeading } from './sharedStyles'

/**
 * Visible page title (the page's only h1) with an optional one-line intro.
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {React.ReactNode} [props.intro] - Short supporting line under the title
 * @param {'left'|'center'} [props.align='center'] - Text alignment
 * @param {Object} [props.sx] - Extra styles for the wrapper
 */
export default function PageHeader({ title, intro, align = 'center', sx }) {
  const theme = useTheme()
  return (
    <Box sx={{ textAlign: align, marginBottom: 4, ...sx }}>
      <Typography variant="h4" component="h1" sx={pageHeading(theme)}>
        {title}
      </Typography>
      {intro && (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            marginTop: 1,
            maxWidth: '60ch',
            marginX: align === 'center' ? 'auto' : 0,
          }}
        >
          {intro}
        </Typography>
      )}
    </Box>
  )
}
