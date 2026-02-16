import { Box, Container, Paper, Typography, useTheme } from '@mui/material'

const useStyles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundImage: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.05) 0%, rgba(30, 58, 95, 0.15) 100%)'
      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    padding: 3,
  },
  paper: {
    padding: 6,
    textAlign: 'center',
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
  },
  photoSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
    width: 200,
    height: 200,
    margin: '0 auto',
    marginBottom: 4,
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
  },
  heading: {
    fontWeight: 700,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #90CAF9 0%, #CE93D8 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: 2,
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
})

export default function Home() {
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Box sx={styles.photoSection}>
            <img 
              src="/images/photo-light.jpg"
              alt="Calvin" 
              style={{
                ...styles.photo,
                opacity: theme.palette.mode === 'dark' ? 0 : 1,
              }}
            />
            <img 
              src="/images/photo-dark.jpg"
              alt="Calvin" 
              style={{
                ...styles.photo,
                opacity: theme.palette.mode === 'dark' ? 1 : 0,
              }}
            />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={styles.heading}
          >
            Calvin Le
          </Typography>
          <Typography
            variant="body1"
            sx={styles.description}
          >
            Educator, engineer, powerlifter, and tinkerer of all kinds.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
