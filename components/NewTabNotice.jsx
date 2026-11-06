import { Box } from '@mui/material'
import { visuallyHidden } from './sharedStyles'

/**
 * Screen-reader-only text for links that open in a new tab, so the
 * context switch isn't a surprise. Place it inside the link.
 */
export default function NewTabNotice() {
  return <Box component="span" sx={visuallyHidden}> (opens in new tab)</Box>
}
