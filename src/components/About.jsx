import { Box, Container, Paper, Typography, Avatar } from '@mui/material'

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
    maxWidth: '600px',
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 4,
    gap: 3,
    flexWrap: 'wrap',
  },
  avatar: {
    width: 150,
    height: 150,
    bgcolor: 'primary.main',
    fontSize: '4rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontSize: '1rem',
    lineHeight: 1.8,
    marginBottom: 2,
  },
}

export default function About() {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={styles.paper}>
          <Box sx={styles.avatarSection}>
            <Avatar sx={styles.avatar}>📸</Avatar>
          </Box>

          <Typography
            variant="h4"
            component="h2"
            sx={styles.heading}
          >
            About Me
          </Typography>

          <Typography
            variant="body1"
            sx={styles.description}
          >
            Calvin can be described as a worldly person. Born in Southern California, got his degree in Colorado, and currently resides in Kansas City (on the Kansas side). He has travelled the country not only for music and tourism, but also for powerlifting, having competed in multiple states. If you've made it this far, then know this website is currently a WIP.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
            }}
          >
            When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
            or working on creative side projects.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
