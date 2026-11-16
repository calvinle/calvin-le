'use client'

import { useRef, useState } from 'react'
import { Command } from 'cmdk'
import { Box, Dialog } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { usePathname, useRouter } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import CheckIcon from '@mui/icons-material/Check'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { navItems, themeOptions } from './navConfig'
import { contactItems, isExternal } from './contactItems'

const visuallyHidden = {
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

const styles = {
  dialog: {
    // Sit near the top of the screen, like most command palettes
    '& .MuiDialog-container': { alignItems: 'flex-start' },
  },
  paper: {
    mt: { xs: 2, sm: '12vh' },
    mx: 2,
    width: '100%',
    maxWidth: 560,
    overflow: 'hidden',
    borderRadius: 2,
  },
  // cmdk ships no styles; it exposes [cmdk-*] attributes to target instead
  command: (theme) => ({
    '& [cmdk-input-wrapper]': {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 2,
      borderBottom: 1,
      borderColor: 'divider',
      color: 'text.secondary',
    },
    '& [cmdk-input]': {
      flex: 1,
      py: 2,
      border: 0,
      outline: 'none',
      background: 'transparent',
      color: 'text.primary',
      font: 'inherit',
      fontSize: '1rem',
      '&::placeholder': { color: 'text.secondary', opacity: 1 },
    },
    '& [cmdk-list]': {
      maxHeight: 'min(400px, 60vh)',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      p: 1,
    },
    '& [cmdk-group-heading]': {
      px: 1.5,
      pt: 1.5,
      pb: 0.5,
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'text.secondary',
    },
    '& [cmdk-item]': {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 1.5,
      py: 1.25,
      borderRadius: 1,
      cursor: 'pointer',
      color: 'text.primary',
      userSelect: 'none',
      '& svg': { color: 'text.secondary' },
    },
    '& [cmdk-item][data-selected="true"]': {
      bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.24 : 0.12),
      '& svg': { color: 'primary.main' },
    },
    '& [cmdk-empty]': {
      py: 5,
      textAlign: 'center',
      color: 'text.secondary',
    },
  }),
  label: { flex: 1 },
  tag: {
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
}

/**
 * CommandPalette - searchable menu for pages, theme choices and contact links.
 *
 * Built on cmdk (filtering, keyboard navigation, ARIA listbox) inside an MUI
 * Dialog (theming, focus trap, Escape to close, focus return).
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the palette is showing
 * @param {Function} props.onOpenChange - Called with the new open state
 * @param {string} props.themePreference - Current preference ('system' | 'light' | 'dark' | 'red')
 * @param {Function} props.onThemeChange - Called with the newly chosen preference
 * @returns {JSX.Element} The rendered palette
 */
export default function CommandPalette({ open, onOpenChange, themePreference, onThemeChange }) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const inputRef = useRef(null)

  // Close first, then run the action, so focus returns to the trigger cleanly
  const run = (action) => {
    onOpenChange(false)
    action()
  }

  const openLink = (href) => {
    if (isExternal(href)) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = href
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      sx={styles.dialog}
      PaperProps={{ sx: styles.paper, 'aria-label': 'Command menu' }}
      // MUI focuses the dialog container on open, which beats autoFocus when the
      // palette is opened by a click, so move focus to the search box once it is in
      TransitionProps={{
        onEntering: () => inputRef.current?.focus(),
        onExited: () => setSearch(''),
      }}
    >
      <Box component={Command} label="Command menu" loop sx={styles.command}>
        <div cmdk-input-wrapper="">
          <SearchIcon fontSize="small" />
          <Command.Input
            ref={inputRef}
            autoFocus
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
          />
        </div>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Pages">
            {navItems.map((item) => {
              const isCurrent = pathname === item.path
              return (
                <Command.Item
                  key={item.path}
                  value={item.label}
                  aria-current={isCurrent ? 'page' : undefined}
                  onSelect={() => run(() => router.push(item.path))}
                >
                  <item.icon fontSize="small" />
                  <Box component="span" sx={styles.label}>{item.label}</Box>
                  {isCurrent && <Box component="span" sx={styles.tag}>Current</Box>}
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group heading="Theme">
            {themeOptions.map((option) => {
              const isSelected = option.value === themePreference
              return (
                <Command.Item
                  key={option.value}
                  value={option.label}
                  keywords={['theme', 'appearance']}
                  aria-checked={isSelected}
                  onSelect={() => run(() => onThemeChange(option.value))}
                >
                  <option.icon fontSize="small" />
                  <Box component="span" sx={styles.label}>
                    {option.label}
                    <Box component="span" sx={visuallyHidden}> theme</Box>
                  </Box>
                  {isSelected && <CheckIcon fontSize="small" />}
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group heading="Links">
            {contactItems.map((item) => {
              const external = isExternal(item.href)
              return (
                <Command.Item
                  key={item.title}
                  value={item.title}
                  keywords={['contact']}
                  onSelect={() => run(() => openLink(item.href))}
                >
                  <item.icon fontSize="small" />
                  <Box component="span" sx={styles.label}>
                    {item.title}
                    {external && <Box component="span" sx={visuallyHidden}> (opens in new tab)</Box>}
                  </Box>
                  {external && <OpenInNewIcon fontSize="small" />}
                </Command.Item>
              )
            })}
          </Command.Group>
        </Command.List>
      </Box>
    </Dialog>
  )
}
