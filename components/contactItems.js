import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Contact information items with links. Used by the Contact page and the footer.
 */
export const contactItems = [
  {
    icon: EmailIcon,
    title: 'Email',
    subtitle: 'calvinle0@proton.me',
    href: 'mailto:calvinle0@proton.me',
  },
  {
    icon: LinkedInIcon,
    title: 'LinkedIn',
    subtitle: 'linkedin.com/in/calvinle97',
    href: 'https://www.linkedin.com/in/calvinle97',
  },
  {
    icon: GitHubIcon,
    title: 'GitHub',
    subtitle: 'github.com/calvinle',
    href: 'https://github.com/calvinle',
  },
]

export const isExternal = (href) => !href.startsWith('mailto')
