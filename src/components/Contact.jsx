import { Box, Container, Paper, Typography, useTheme, Link } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Creates theme-aware styles for the Contact component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`,
    padding: 3,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    width: '100%',
    maxWidth: '500px',
  },
  heading: {
    fontWeight: 700,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    mb: 2,
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: 3,
    borderRadius: 2,
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.mode === 'light' ? '#fff' : theme.palette.primary.contrastText,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  cardSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
})

/**
 * Contact information items with links.
 */
const contactItems = [
  {
    icon: EmailIcon,
    title: 'Email',
    subtitle: 'calvin.md.le@gmail.com',
    href: 'mailto:calvin.md.le@gmail.com',
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

/**
 * Contact component - Contact information page.
 * 
 * Displays contact methods including email, LinkedIn, and GitHub
 * with interactive hover effects and external links.
 * 
 * @component
 * @returns {JSX.Element} The rendered Contact page component
 * 
 * @example
 * <Contact />
 */
export default function Contact() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" sx={styles.heading}>
          Get In Touch
        </Typography>
        <Box sx={styles.content}>
          {contactItems.map((item) => (
            <Paper
              key={item.title}
              component={Link}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              elevation={6}
              sx={styles.contactCard}
            >
              <Box sx={styles.iconWrapper}>
                <item.icon fontSize="large" />
              </Box>
              <Box sx={styles.cardContent}>
                <Typography variant="h6" sx={styles.cardTitle}>
                  {item.title}
                </Typography>
                <Typography sx={styles.cardSubtitle}>
                  {item.subtitle}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
