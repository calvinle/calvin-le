import { Box, Container, Typography, Paper } from '@mui/material'

let styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #8b0000 0%, #1a1a1a 100%)',
  },
  paper: {
    padding: 6,
    textAlign: 'center',
    borderRadius: 3,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
  },
  heading: {
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: 2,
  },
  description: {
    color: 'text.secondary',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
}

let paperElevation = 10;

function App() {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={paperElevation} sx={styles.paper}>
          <Typography
            variant="h3"
            component="h1"
            sx={styles.heading}
          >
            Hello, I'm Calvin!
          </Typography>
          <Typography
            variant="body1"
            sx={styles.description}
          >
            Welcome to my portfolio. I'm a developer passionate about creating beautiful and functional web experiences.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default App
