'use client'

import { IconButton, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

/**
 * Small info icon that shows an explanation on hover, keyboard focus, or tap.
 * The icon is a real button so keyboard and screen reader users can reach it;
 * the explanation is linked as its description.
 *
 * @param {Object} props
 * @param {string} props.label - Short accessible name, e.g. "About DOTS"
 * @param {string} props.title - The explanation shown in the tooltip
 */
export default function InfoTooltip({ label, title }) {
  return (
    <Tooltip title={title} arrow describeChild enterTouchDelay={0} leaveTouchDelay={3000}>
      <IconButton aria-label={label} size="small" sx={{ p: 0.5, color: 'inherit', cursor: 'help' }}>
        <InfoOutlinedIcon sx={{ fontSize: '0.875rem' }} />
      </IconButton>
    </Tooltip>
  )
}
