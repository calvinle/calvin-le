import { Box, Container, Paper, Typography } from '@mui/material'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
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
  },
  photo: {
    width: '100%',
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
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
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
}

export default function Home() {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Box sx={styles.photoSection}>
            <img 
              src="/images/photo.jpg" 
              alt="Calvin" 
              style={styles.photo}
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
