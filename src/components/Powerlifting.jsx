import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, CircularProgress, 
  Divider, useTheme, ToggleButtonGroup, ToggleButton, useMediaQuery, Link, Tooltip,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

/**
 * Responsive styles for the Powerlifting component.
 * @param {Object} theme - MUI theme object
 * @param {boolean} isMobile - Whether the viewport is mobile-sized
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme, isMobile) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingY: 6,
    gap: 4,
    flex: 1,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`,
    overflowX: isMobile ? 'hidden' : 'auto',
    minWidth: isMobile ? 'auto' : 'fit-content',
    width: '100%',
  },
  outerWrapper: {
    overflowX: isMobile ? 'hidden' : 'auto',
    width: '100%',
    flex: 1,
    display: 'flex',
    minWidth: 0,
  },
  mainContainer: {
    minWidth: isMobile ? 'auto' : '800px',
    width: '100%',
    px: isMobile ? 2 : 3,
  },
  tableShadowWrapper: {
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    mb: 5,
  },
  tableScrollWrapper: {
    overflowX: 'auto',
    width: '100%',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '24px',
  },
  tableContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
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
    borderRadius: '24px',
    backdropFilter: 'blur(10px)',
    overflow: 'hidden',
    minWidth: isMobile ? 'auto' : '800px',
    width: '100%',
  },
  aboutPaper: {
    padding: 3,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    overflow: 'hidden',
    mb: 5,
    minWidth: 'auto',
    maxWidth: '100%',
    width: '100%',
  },
  accordion: {
    borderRadius: '12px !important',
    backdropFilter: 'blur(10px)',
    mb: 4,
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: 56,
    },
    '& .MuiAccordionSummary-content': {
      margin: '12px 0',
    },
  },
  table: {
    minWidth: '800px',
    borderRadius: '24px',
    overflow: 'hidden',
    '& tbody tr:last-child': {
      '& td:first-of-type': {
        borderBottomLeftRadius: '24px',
      },
      '& td:last-of-type': {
        borderBottomRightRadius: '24px',
      },
    },
    '& tbody tr:last-child:hover': {
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px',
    },
  },
  heading: {
    fontWeight: 800,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  sectionTitle: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.mode === 'light' ? '#fff' : theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  },
  tableHeader: {
    fontWeight: 700,
    color: theme.palette.primary.main,
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
    color: theme.palette.secondary.main,
    whiteSpace: 'nowrap',
  },
  dotsCell: {
    color: theme.palette.primary.main,
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
    pl: isMobile ? 1 : 2,
    pr: isMobile ? 1 : 0,
    m: 0,
    '& ul': {
      pl: isMobile ? 2 : 3,
      mt: 0.5,
      listStyleType: 'circle',
    },
    '& li': {
      mb: 0.5,
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
    '& .MuiLink-root': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
})

/**
 * Converts Imperial pounds to Metric kilograms.
 * @param {number|string} lbs - Weight in pounds
 * @returns {string} Weight in kilograms formatted to 1 decimal place, or '—' if invalid
 */
const lbsToKg = (lbs) => {
  if (!lbs || isNaN(lbs)) return '—'
  return (parseFloat(lbs) * 0.453592).toFixed(1)
}

/**
 * Powerlifting component that displays powerlifting stats and competition history.
 * 
 * Fetches athlete data from Firebase Realtime Database and displays:
 * - Personal bests (squat, bench, deadlift, total)
 * - Competition history with results
 * - About section explaining data sources (OpenPowerlifting)
 * 
 * Features responsive design with horizontally scrollable tables on mobile
 * and a toggle for lb/kg unit conversion.
 * 
 * @component
 * @requires Firebase - Realtime Database connection via '../firebase'
 * @returns {JSX.Element} The rendered Powerlifting statistics page
 * 
 * @example
 * <Powerlifting />
 */
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

  /**
   * Subscribes to Firebase Realtime Database for powerlifting data
   * 
   * On mount:
   * - Creates a reference to powerlifting db in Firebase
   * - Sets up a real-time listener that updates athlete state on data changes
   * - Extracts athlete data from response (data.data[0])
   * - Sets loading to false and handles errors appropriately
   * 
   * On unmount:
   * - Unsubscribes/unmounts Firebase to prevent memory leaks
   * 
   * Dependencies: [] (runs once on mount)
   */
  useEffect(() => {
    const userDataRef = ref(db, 'powerlifting/user_data')

    const unsubscribe = onValue(userDataRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawResponse = snapshot.val()

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

  // Loading state
  if (loading) return (
    <Box sx={styles.loadingBox}>
      <CircularProgress thickness={5} size={60} sx={{ color: theme.palette.primary.main }} />
    </Box>
  )

  // Display error message if data fetching fails
  if (error) return <Typography color="error" align="center" sx={styles.errorText}>{error}</Typography>

  // Filter competitions for 2018 and later, because original data conjoined people
  const competitions = (athlete?.competition_results || [])
    .filter(comp => new Date(comp.date).getFullYear() >= 2018)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.container}>
        <Container maxWidth="lg" sx={styles.mainContainer}>

          {/* About Section - Accordion */}
          <Accordion sx={styles.accordion} defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="h6" sx={styles.sectionTitle}>Why This Page?</Typography>
                <Typography variant="caption" color="text.secondary">Click to expand</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="ul" sx={styles.bulletList}>
                <li>
                  <Typography variant="body1" component="span">
                    Powerlifting has multiple federations, each with its own rules and standards, resulting in a lack of formal unified data
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body2" component="span">
                        <Link href="https://www.openpowerlifting.org/" target="_blank" rel="noopener noreferrer"><strong>Open</strong>Powerlifting</Link> provides a comprehensive tabled view of all powerlifting results.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" component="span">
                        However, they don't provide an API, as they prioritize maintaining the integrity of public data
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" component="span">
                        ...But there is a 150MB CSV file for download!
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" component="span">
                        Also, it is literally being managed by 8 people
                      </Typography>
                    </li>
                  </ul>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    <Link href="https://closepowerlifting.com/" target="_blank" rel="noopener noreferrer"><strong>Close</strong>Powerlifting</Link> serves as a 3rd-party API with a monthly quota
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Combined with Firebase cron jobs and other automation tools, this page will update and cache weekly
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body2" component="span">
                        In a practical sense, this means this will update within two weeks of a competition
                      </Typography>
                    </li>
                  </ul>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    My data on OpenPowerlifting is conjoined with another Calvin Le(s?) who competed years before I did, so I have to filter that Calvin's results out
                  </Typography>
                </li>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          {/* Unit Toggle. Mobile: centered above. Desktop: right-aligned. */}
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
          <Box sx={styles.tableShadowWrapper}>
          <Box sx={styles.tableScrollWrapper}>
          <Paper elevation={0} sx={styles.paper}>
          <TableContainer sx={styles.tableContainer}>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeader}>Squat</TableCell>
                  <TableCell sx={styles.tableHeader}>Bench</TableCell>
                  <TableCell sx={styles.tableHeader}>Deadlift</TableCell>
                  <TableCell sx={styles.tableHeader}>Total</TableCell>
                  <Tooltip 
                    title="Raw lifting uses minimal supportive gear (belt, knee sleeves, wrist wraps). Equipped lifting uses specialized suits and shirts that can add significant weight to lifts."
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                  >
                    <TableCell sx={{ ...styles.tableHeader, cursor: 'help', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      Equipped
                      <InfoOutlinedIcon sx={{ fontSize: '0.875rem' }} />
                    </TableCell>
                  </Tooltip>
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
          </Box>
          </Box>

          {/* Competitions History Table */}
          <Box sx={styles.sectionTitleBox}>
            <Typography variant="h6" sx={styles.sectionTitle}>Competition History</Typography>
          </Box>
          <Box sx={styles.tableShadowWrapper}>
          <Box sx={styles.tableScrollWrapper}>
          <Paper elevation={0} sx={styles.paper}>
          <TableContainer sx={styles.tableContainer}>
            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeader}>Competition</TableCell>
                  <TableCell sx={styles.tableHeader}>Squat</TableCell>
                  <TableCell sx={styles.tableHeader}>Bench</TableCell>
                  <TableCell sx={styles.tableHeader}>Deadlift</TableCell>
                  <TableCell sx={styles.tableHeader}>Total</TableCell>
                  <Tooltip 
                    title="DOTS is a formula that calculates relative strength by normalizing your total based on bodyweight, allowing fairer comparison across weight classes."
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                  >
                    <TableCell sx={{ ...styles.tableHeader, cursor: 'help', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      DOTS
                      <InfoOutlinedIcon sx={{ fontSize: '0.875rem' }} />
                    </TableCell>
                  </Tooltip>
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
          </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}