import { Box, Container, Paper, Typography, Stack, useTheme, Divider, Chip, useMediaQuery } from '@mui/material'

/**
 * Creates theme-aware styles for the Work component.
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
    gap: 3,
  },
  mainLayout: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  workSection: {
    flex: 2,
  },
  expertiseSection: {
    flex: 1,
    position: 'sticky',
    top: 80,
  },
  expertisePaper: {
    padding: 3,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
  },
  expertiseTitle: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
    marginBottom: 2,
  },
  categoryTitle: {
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'text.secondary',
    marginBottom: 1,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.75,
  },
  chip: {
    fontSize: '0.8rem',
    height: 28,
  },
  paper: {
    padding: 6,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    width: '100%',
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
  projectName: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
    marginBottom: 1,
    marginTop: 2,
    fontSize: '1rem',
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  companyName: {
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
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
    flexDirection: { xs: 'column', sm: 'row' },
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    textAlign: 'right',
    marginTop: { xs: 1, sm: 0 },
    textAlign: { xs: 'left', sm: 'right' },
  },
})

/**
 * Work component - Professional experience and projects page.
 * 
 * Displays work history with company details, dates, and project descriptions, organized chronologically
 * 
 * @component
 * @returns {JSX.Element} The rendered Work experience page component
 * 
 * @example
 * <Work />
 */
export default function Work() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const technicalExpertise = [
    {
      category: 'Programming Languages',
      skills: ['Java', 'JavaScript', 'Python', 'Ruby on Rails', 'SQL/Relational Databases', 'React', 'Spring Boot']
    },
    {
      category: 'Unit Testing',
      skills: ['JUnit', 'Jest', 'pytest', `RSpec`]
    },
    {
      category: 'Tools and Infrastructure',
      skills: ['GitHub', 'GitHub Actions', 'Jenkins', 'Google Cloud Platform', 'Firebase'],
    },
    {
      category: 'Prompt Engineering',
      skills: ['GitHub Copilot', 'Glean']
    },
    {
      category: 'Engineering Practices',
      skills: ['Scrum/Agile', 'Version Control', 'Test-Driven Development', 'Documentation', 'Code Reviews']
    },
    {
      category: 'Technical Leadership',
      skills: ['Mentorship', 'Technical Instruction', 'Onboarding', 'Cross-team Collaboration', 'Project Ownership']
    }
  ]

  /**
   * Work experience data structured with company, location, years, and projects for each role.
   * Each project includes a name and description of responsibilities and achievements.
   */
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
          name: 'GenAI SDLC Pilot Teaching',
          description: 'AI-assisted debugging and unit testing demonstration for senior software engineers and managers'
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
      <Container maxWidth="lg">
        <Box sx={{ ...styles.mainLayout, flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Work Experience Section */}
          <Box sx={{ ...styles.workSection, order: isMobile ? 2 : 1 }}>
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
                    <Box key={projectIndex} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
                      <Typography variant="body1" sx={styles.projectName}>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6, mt: 0.5 }}>
                        {project.description}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* Vertical Divider */}
          {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 2, order: 2 }} />}

          {/* Technical Expertise Section */}
          <Box sx={{ ...styles.expertiseSection, position: isMobile ? 'static' : 'sticky', order: isMobile ? 1 : 3, width: isMobile ? '100%' : 'auto', mb: isMobile ? 3 : 0 }}>
            <Paper elevation={10} sx={styles.expertisePaper}>
              <Typography variant="h6" sx={styles.expertiseTitle}>
                Technical Expertise
              </Typography>
              {technicalExpertise.map((category, index) => (
                <Box key={index} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                  <Typography sx={styles.categoryTitle}>
                    {category.category}
                  </Typography>
                  <Box sx={styles.chipContainer}>
                    {category.skills.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={styles.chip}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
