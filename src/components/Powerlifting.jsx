import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, CircularProgress, 
  Divider, useTheme, ToggleButtonGroup, ToggleButton, useMediaQuery 
} from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

const useStyles = (theme, isMobile) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingY: 6,
    gap: 4,
    flex: 1,
    backgroundImage: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.05) 0%, rgba(30, 58, 95, 0.15) 100%)'
      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    overflowX: 'auto',
    minWidth: 'fit-content',
  },
  outerWrapper: {
    overflowX: 'auto',
    width: '100%',
    flex: 1,
    display: 'flex',
    minWidth: 0,
  },
  mainContainer: {
    minWidth: '800px',
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    mt: 10,
  },
  errorText: {
    mt: 10,
  },
  paper: {
    padding: 0,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    overflow: 'visible',
    mb: 5,
    minWidth: '800px',
  },
  aboutPaper: {
    padding: 3,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    overflow: 'visible',
    mb: 5,
    minWidth: 'auto',
  },
  table: {
    minWidth: '800px',
  },
  heading: {
    fontWeight: 800,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #90CAF9 0%, #CE93D8 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  sectionTitle: {
    fontWeight: 700,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'space-between',
    alignItems: 'center',
    mb: 2,
    px: 1,
    gap: isMobile ? 2 : 0,
  },
  sectionTitleBox: {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    mt: 4,
    mb: 2,
    px: 1,
  },
  toggleButtonGroup: {
    '& .MuiToggleButton-root': {
      px: 2,
      py: 0.5,
      fontWeight: 600,
      fontSize: '0.75rem',
      '&.Mui-selected': {
        backgroundColor: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? '#64B5F6' : '#5a6fd6',
        },
      },
    },
  },
  tableHeader: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.05rem',
    whiteSpace: 'nowrap',
  },
  cellBold: {
    fontWeight: 600,
    color: 'text.primary',
    whiteSpace: 'nowrap',
  },
  cell: {
    whiteSpace: 'nowrap',
  },
  cellBoldTotal: {
    whiteSpace: 'nowrap',
    fontWeight: 700,
  },
  totalCell: {
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#CE93D8' : '#764ba2',
    whiteSpace: 'nowrap',
  },
  dotsCell: {
    color: theme.palette.mode === 'dark' ? '#90CAF9' : '#667eea',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  competitionName: {
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  competitionDetails: {
    whiteSpace: 'nowrap',
  },
  bulletList: {
    textAlign: 'left',
    lineHeight: 2,
    pl: 2,
    m: 0,
    '& ul': {
      pl: 3,
      mt: 0.5,
      listStyleType: 'circle',
    },
    '& li': {
      mb: 0.5,
    },
  },
})

// Conversion: 1 lb = 0.453592 kg
const lbsToKg = (lbs) => {
  if (!lbs || isNaN(lbs)) return '—'
  return (parseFloat(lbs) * 0.453592).toFixed(1)
}

export default function Powerlifting() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const styles = useStyles(theme, isMobile)
  const [athlete, setAthlete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('lbs')

  const formatWeight = (value) => {
    if (!value || isNaN(value)) return '—'
    if (unit === 'kg') return `${lbsToKg(value)} kg`
    return `${value} lbs`
  }

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) setUnit(newUnit)
  }

  useEffect(() => {
    const userDataRef = ref(db, 'powerlifting/user_data')

    const unsubscribe = onValue(userDataRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawResponse = snapshot.val()
        // Parsing the nested structure: data -> data -> [0]
        const athleteData = rawResponse.data?.data?.[0]
        setAthlete(athleteData || null)
      } else {
        setError('No data found in the database.')
      }
      setLoading(false)
    }, (err) => {
      setError(`Firebase Error: ${err.message}`)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return (
    <Box sx={styles.loadingBox}>
      <CircularProgress thickness={5} size={60} sx={{ color: theme.palette.primary.main }} />
    </Box>
  )

  if (error) return <Typography color="error" align="center" sx={styles.errorText}>{error}</Typography>

  // Filter competitions for 2018 and later
  const competitions = (athlete?.competition_results || [])
    .filter(comp => new Date(comp.date).getFullYear() >= 2018)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.container}>
        <Container maxWidth="lg" sx={styles.mainContainer}>
          
          {/* Unit Toggle - Mobile: centered above, Desktop: right-aligned */}
          <Box sx={styles.sectionHeader}>
            {isMobile && (
              <ToggleButtonGroup
                value={unit}
                exclusive
                onChange={handleUnitChange}
                size="small"
                sx={styles.toggleButtonGroup}
              >
                <ToggleButton value="lbs">LBS</ToggleButton>
                <ToggleButton value="kg">KG</ToggleButton>
              </ToggleButtonGroup>
            )}
            <Typography variant="h6" sx={styles.sectionTitle}>Personal Bests</Typography>
            {!isMobile && (
              <ToggleButtonGroup
                value={unit}
                exclusive
                onChange={handleUnitChange}
                size="small"
                sx={styles.toggleButtonGroup}
              >
                <ToggleButton value="lbs">LBS</ToggleButton>
                <ToggleButton value="kg">KG</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>

          {/* Personal Bests Table */}
          <Paper elevation={10} sx={styles.paper}>
          <TableContainer>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeader}>Squat</TableCell>
                  <TableCell sx={styles.tableHeader}>Bench</TableCell>
                  <TableCell sx={styles.tableHeader}>Deadlift</TableCell>
                  <TableCell sx={styles.tableHeader}>Total</TableCell>
                  <TableCell sx={styles.tableHeader}>Equip</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {athlete?.personal_best?.filter(pb => pb.equip?.toLowerCase().includes('raw')).map((pb, i) => (
                  <TableRow key={i} hover>
                    <TableCell sx={styles.cellBold}>{formatWeight(pb.squat)}</TableCell>
                    <TableCell sx={styles.cellBold}>{formatWeight(pb.bench)}</TableCell>
                    <TableCell sx={styles.cellBold}>{formatWeight(pb.deadlift)}</TableCell>
                    <TableCell sx={styles.totalCell}>{formatWeight(pb.total)}</TableCell>
                    <TableCell sx={styles.cell}>{pb.equip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>

          {/* Past Competitions Table */}
          <Box sx={styles.sectionTitleBox}>
            <Typography variant="h6" sx={styles.sectionTitle}>Competition History</Typography>
          </Box>
          <Paper elevation={10} sx={styles.paper}>
          <TableContainer>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeader}>Competition</TableCell>
                  <TableCell sx={styles.tableHeader}>Squat</TableCell>
                  <TableCell sx={styles.tableHeader}>Bench</TableCell>
                  <TableCell sx={styles.tableHeader}>Deadlift</TableCell>
                  <TableCell sx={styles.tableHeader}>Total</TableCell>
                  <TableCell sx={styles.tableHeader}>DOTS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {competitions.map((comp, i) => (
                  <TableRow key={i} hover>
                    <TableCell sx={styles.cell}>
                      <Typography variant="body2" sx={styles.competitionName}>{comp.competition}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={styles.competitionDetails}>{comp.date} • {comp.location}</Typography>
                    </TableCell>
                    <TableCell sx={styles.cell}>{formatWeight(comp.squat)}</TableCell>
                    <TableCell sx={styles.cell}>{formatWeight(comp.bench)}</TableCell>
                    <TableCell sx={styles.cell}>{formatWeight(comp.deadlift)}</TableCell>
                    <TableCell sx={styles.cellBoldTotal}>
                      {formatWeight(comp.total)}
                    </TableCell>
                    <TableCell sx={styles.dotsCell}>{comp.dots}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>

          {/* About Section */}
          <Box sx={styles.sectionTitleBox}>
            <Typography variant="h6" sx={styles.sectionTitle}>Why This Page?</Typography>
          </Box>
          <Paper elevation={10} sx={styles.aboutPaper}>
            <Box component="ul" sx={styles.bulletList}>
              <li>Powerlifting has multiple federations, each with its own rules and standards, resulting in a lack of formal unified data
                <ul>
                  <li><a href="https://www.openpowerlifting.org/" target="_blank" rel="noopener noreferrer"><b>Open</b>Powerlifting</a> provides a comprehensive tabled view of all powerlifting results.</li>
                  <li>However, they don't provide an API, as they prioritize maintaining the integrity of public data</li>
                  <li>...But there is a 150MB CSV file for download!</li>
                  <li>Also, it is literally being managed by 8 people</li>
                </ul>
              </li>
              <li><a href="https://closepowerlifting.com/" target="_blank" rel="noopener noreferrer"><b>Close</b>Powerlifting</a> serves as a 3rd-party API with a monthly quota</li>
              <li>Combined with Firebase cron jobs and other automation tools, this page will update and cache weekly
                <ul>
                  <li>In a practical sense, this means this will update within two weeks of a competition</li>
                </ul>
              </li>
              <li>My data on OpenPowerlifting is conjoined with another Calvin Le(s?) who competed years before I did, so I have to filter that Calvin's results out</li>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}