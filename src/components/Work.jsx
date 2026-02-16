import { Box, Container, Paper, Typography, Stack } from '@mui/material'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    padding: 3,
    gap: 3,
  },
  paper: {
    padding: 6,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    width: '100%',
  },
  heading: {
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: 4,
    textAlign: 'center',
  },
  projectName: {
    fontWeight: 700,
    color: '#667eea',
    marginBottom: 1,
    marginTop: 2,
    fontSize: '1rem',
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  companyName: {
    fontWeight: 600,
    color: '#667eea',
    marginBottom: 0.5,
  },
  location: {
    color: 'text.secondary',
    fontSize: '0.9rem',
    marginBottom: 2,
  },
  years: {
    color: 'text.secondary',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    textAlign: 'right',
  },
}

export default function Work() {
  const workExperience = [
    {
      company: '🟧 The Home Depot 🛠',
      location: 'Atlanta, GA',
      years: 'November 2021 - January 2026',
      projects: [
        {
          name: 'OrangeMethod Apprenticeship',
          description: 'Developing software engineers with industry knowledge and technical skills in 18-weeks, pipelining to summer internship and full-time roles'
        },
        {
          name: 'OrangeMethod Returnship',
          description: 'Aiding software engineers returning from extended leave, providing mentorship and technical training to facilitate successful reintegration into the workforce'
        },
        {
          name: 'GenAI Pilot Teaching',
          description: 'AI-assisted debugging and unit testing demonstration and lesson plans for apprentices'
        },
        {
          name: 'Quality Initiative',
          description: 'Partnered with cross-functional teams to assess testing environments and code health tooling for unified observability'
        }
      ]
    },
    {
      company: '⚕️ Oracle Health 🏥',
      location: 'Kansas City, MO',
      years: 'February 2019 - November 2021',
      projects: [
        {
          name: 'DevAcademy',
          description: 'Staff instructor for training program to develop entry-level software engineers with weekly pull request evaluations and technical mentorship'
        },
        {
          name: 'Academy Analytics',
          description: 'Observability dashboard to track training program metrics and performance'
        },
        {
          name: 'OPENLink',
          description: 'Healthcare system interoperability, parsing industry formats (HL7, FHIR, JSON, XML)'
        }
      ]
    }
  ]

  return (
    <Box sx={styles.container}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={styles.heading}
        >
          My Work
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Stack spacing={3}>
          {workExperience.map((job, jobIndex) => (
            <Paper key={jobIndex} elevation={10} sx={styles.paper}>
              <Box sx={styles.headerRow}>
                <Box sx={styles.headerLeft}>
                  <Typography variant="h6" sx={styles.companyName}>
                    {job.company}
                  </Typography>
                </Box>
                <Box sx={styles.headerRight}>
                  <Typography sx={styles.location}>
                    {job.location}
                  </Typography>
                  <Typography sx={styles.years}>
                    {job.years}
                  </Typography>
                </Box>
              </Box>

              {job.projects.map((project, projectIndex) => (
                <Box key={projectIndex}>
                  <Typography variant="body1" sx={styles.projectName}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {project.description}
                  </Typography>
                </Box>
              ))}
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
