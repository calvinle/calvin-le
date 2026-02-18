import { Box, Container, Paper, Typography, Card, CardContent, CardActions, Button, Grid, useTheme, useMediaQuery } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Creates theme-aware styles for the Projects component.
 * @param {Object} theme - MUI theme object
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundImage: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.05) 0%, rgba(30, 58, 95, 0.15) 100%)'
      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    padding: 3,
  },
  paper: {
    padding: { xs: 3, sm: 6 },
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    width: '100%',
    maxWidth: '1200px',
  },
  heading: {
    fontWeight: 700,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #90CAF9 0%, #CE93D8 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: 4,
    textAlign: 'center',
  },
  projectCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 24px rgba(144, 202, 249, 0.2)'
        : '0 8px 24px rgba(102, 126, 234, 0.2)',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  projectName: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
    marginBottom: 1,
  },
  projectDescription: {
    color: 'text.secondary',
    lineHeight: 1.6,
  },
  cardActions: {
    padding: 2,
    paddingTop: 0,
    gap: 1,
  },
  linkButton: {
    textTransform: 'none',
  },
})

/**
 * Projects component - Personal projects showcase page.
 * 
 * Displays project cards with name, description, and links.
 * Features a responsive grid layout with themed styling.
 * 
 * @component
 * @returns {JSX.Element} The rendered Projects page component
 * 
 * @example
 * <Projects />
 */
export default function Projects() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  /**
   * Projects data with name, description, and links.
   */
  const projects = [
    {
      name: 'Personal Website',
      description: 'This website you\'re checking out! Built with React, Material-UI, and Firebase. Features responsive design, theme switching, and a clean modern UI.',
      links: [
        { label: 'GitHub', url: 'https://github.com/calvinle/calvin-le', icon: GitHubIcon },
      ],
    },
    {
      name: 'Powerlifting Plate Calculator',
      description: 'A calculator tool for powerlifters to quickly determine the plates needed for any given weight on the barbell. Developed in Java and Android Studio.',
      links: [
        { label: 'GitHub', url: 'https://github.com/calvinle/Powerlifting-Plate-Calculator', icon: GitHubIcon },
      ],
    },
    {
      name: 'piHue',
      description: 'A Raspberry Pi project that controls Philips Hue smart lights based on sensor input and user preferences. Developed in Python and uses the Philips Hue API.',
      links: [
        { label: 'Live Demo', url: 'https://www.youtube.com/watch?v=jSCjfSZUzp8', icon: LaunchIcon },
        { label: 'GitHub', url: 'https://github.com/calvinle/piHue', icon: GitHubIcon },
      ],
    },
  ]

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Paper elevation={10} sx={styles.paper}>
          <Typography
            variant="h4"
            component="h1"
            sx={styles.heading}
          >
            Projects
          </Typography>

          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3} sx={styles.projectCard}>
                  <CardContent sx={styles.cardContent}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={styles.projectName}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.projectDescription}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={styles.cardActions}>
                    {project.links.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        size="small"
                        variant="outlined"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<link.icon />}
                        sx={styles.linkButton}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
