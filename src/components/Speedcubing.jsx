import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableHead, TableRow, CircularProgress, 
  useTheme, useMediaQuery, Link, Tooltip,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

/**
 * Responsive styles for the Speedcubing component.
 * @param {Object} theme - MUI theme object
 * @param {boolean} isMobile - Whether the viewport is mobile-sized
 * @returns {Object} Style definitions for component elements
 */
const useStyles = (theme, isMobile) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingY: isMobile ? 3 : 6,
    paddingX: isMobile ? 0 : 0,
    gap: isMobile ? 2 : 4,
    flex: 1,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}15 100%)`,
    overflowX: isMobile ? 'hidden' : 'auto',
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
    overflow: 'hidden',
    mb: isMobile ? 3 : 5,
    minWidth: isMobile ? 'auto' : '800px',
    width: '100%',
  },
  tableScrollContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 3,
  },
  tableWrapper: {
    width: '100%',
  },
  aboutPaper: {
    padding: isMobile ? 2 : 3,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    overflow: 'hidden',
    mb: isMobile ? 3 : 5,
    minWidth: 'auto',
    maxWidth: '100%',
    width: '100%',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
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
    minWidth: isMobile ? 500 : 800,
  },
  heading: {
    fontWeight: 800,
    fontSize: isMobile ? '1.75rem' : '3rem',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  sectionTitle: {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
  },
  sectionTitleBox: {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    mt: 4,
    mb: 2,
    px: 1,
  },
  tableHeader: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.05rem',
    whiteSpace: 'nowrap',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '& .MuiTableCell-root': {
      padding: isMobile ? '8px 6px' : '16px',
      fontSize: isMobile ? '0.8rem' : '0.875rem',
    },
  },
  statCard: {
    padding: isMobile ? 2 : 3,
    borderRadius: 2,
    textAlign: 'center',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
    minWidth: isMobile ? 70 : 150,
    flex: isMobile ? '1 1 40%' : '0 0 auto',
  },
  statValue: {
    fontWeight: 800,
    fontSize: isMobile ? '1.5rem' : '2rem',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    fontSize: isMobile ? '0.75rem' : '0.875rem',
  },
})

// WCA event ID to display name mapping
const eventNames = {
  '222': '2x2',
  '333': '3x3',
  '444': '4x4',
  '555': '5x5',
  '666': '6x6',
  '777': '7x7',
  '333bf': '3x3 Blindfolded',
  '333oh': '3x3 One-Handed',
  '333ft': '3x3 With Feet',
  'clock': 'Clock',
  'minx': 'Megaminx',
  'pyram': 'Pyraminx',
  'skewb': 'Skewb',
  'sq1': 'Square-1',
  'magic': 'Magic',
  'mmagic': 'Master Magic',
}

/**
 * Map of discontinued WCA events with explanatory messages.
 * @type {Object.<string, string>}
 */
const discontinuedEvents = {
  'magic': 'Magic was discontinued as an official WCA event in 2012.',
  'mmagic': 'Master Magic was discontinued as an official WCA event in 2012.',
}

/**
 * Formats time from WCA centiseconds to human-readable format.
 * Also handles times over 1 minute with mm:ss.cc format.
 * 
 * @param {number} centiseconds - Time in centiseconds from WCA API
 * @returns {string} Formatted time string (e.g., "12.34" or "1:05.00") or '—' if invalid
 */
const formatTime = (centiseconds) => {
  if (!centiseconds || centiseconds <= 0) return '—'
  
  const totalSeconds = centiseconds / 100
  
  if (totalSeconds >= 60) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = (totalSeconds % 60).toFixed(2)
    return `${minutes}:${seconds.padStart(5, '0')}`
  }
  
  return totalSeconds.toFixed(2)
}

/**
 * Speedcubing component to display WCA speedcubing statistics and competition history.
 * 
 * Grabs data from Firebase Realtime Database (cached from WCA REST API) and displays:
 * - Competition count and medal stats
 * - Personal bests for each WCA event (single and average)
 * - Competition history with detailed results
 * - About section with cubing methods and WCA links
 * 
 * @component
 * @requires Firebase - Realtime Database connection via '../firebase'
 * @returns {JSX.Element} The rendered Speedcubing statistics page
 * 
 * @example
 * <Speedcubing />
 */
export default function Speedcubing() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const styles = useStyles(theme, isMobile)

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const statsRef = ref(db, 'speedcubing/wca_data')
    const unsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val()
      if (data?.data) {
        setStats(data.data)
      }
      setLoading(false)
    }, (err) => {
      setError(err.message)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={styles.container}>
        <Typography color="error" sx={styles.errorText}>
          Error loading speedcubing data: {error}
        </Typography>
      </Box>
    )
  }

  // Build personal bests from WCA data
  const getPersonalBests = () => {
    if (!stats?.rank?.singles) return []
    
    const singles = stats.rank.singles || []
    const averages = stats.rank.averages || []
    
    // Create a map of averages by event
    const averageMap = {}
    averages.forEach(avg => {
      averageMap[avg.eventId] = avg.best
    })
    
    return singles.map(single => ({
      eventId: single.eventId,
      event: eventNames[single.eventId] || single.eventId,
      single: formatTime(single.best),
      average: formatTime(averageMap[single.eventId]),
      worldRank: single.rank?.world,
      countryRank: single.rank?.country,
    }))
  }

  const personalBests = getPersonalBests()

  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.container}>
        <Container maxWidth="md" sx={styles.mainContainer}>
          
          {/* About Section - Accordion */}
          <Accordion sx={styles.accordion} defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="h6" sx={styles.sectionTitle}>About Speedcubing</Typography>
                <Typography variant="caption" color="text.secondary">Click to expand</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Speedcubing is the practice of solving Rubik's Cubes and other twisty puzzles as fast as possible. 
                I have been involved in the sport for well over a decade, having competed and volunteered in many competitions.
              </Typography>
              <Typography variant="body2" paragraph>
                My main events are the 3x3, 3x3 One-Handed, and 4x4.
              </Typography>
              <Typography variant="body2" paragraph>
                I use the following methods:
                <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0, mb: 2 }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-333" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2">3x3: <Link href="https://jperm.net/3x3/cfop" target="_blank" rel="noopener noreferrer">CFOP with 2-look OLL and 1-look PLL</Link></Typography>
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-333oh" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2">3x3 One-Handed: <Link href="https://www.zzmethod.com/tutorial" target="_blank" rel="noopener noreferrer">ZZ </Link></Typography>
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-444" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2">4x4: <Link href="https://jperm.net/4x4" target="_blank" rel="noopener noreferrer">Yau</Link></Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography variant="body2" paragraph>
                The data on this page uses an unofficial API by Robin Engelbrecht, fully endorsed by the World Cube Association. This page also runs a cron job and caches the data in Firebase.
              </Typography>
              <Typography variant="body2" paragraph>
                See below links for more details:
                <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0, mb: 2 }}>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-333" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2"><Link href="https://www.worldcubeassociation.org/" target="_blank" rel="noopener noreferrer">World Cube Association</Link></Typography>
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-333" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2"><Link href="https://docs.worldcubeassociation.org/knowledge_base/wca_data_overview.html" target="_blank" rel="noopener noreferrer">WCA Data Overview</Link></Typography>
                  </Box>
                  <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <span className="cubing-icon event-333" style={{ fontSize: '1rem' }} />
                    <Typography variant="body2"><Link href="https://wca-rest-api.robiningelbrecht.be/" target="_blank" rel="noopener noreferrer">WCA-REST-API Documentation</Link></Typography>
                  </Box>
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Stats Overview */}
          <Box sx={{ display: 'flex', gap: isMobile ? 1.5 : 3, mb: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Paper sx={styles.statCard}>
              <Typography sx={styles.statValue}>{stats?.numberOfCompetitions || '—'}</Typography>
              <Typography sx={styles.statLabel}>Competitions</Typography>
            </Paper>
            <Paper sx={styles.statCard}>
              <Typography sx={styles.statValue}>{stats?.medals?.bronze || 0}</Typography>
              <Typography sx={styles.statLabel}>🥉 Bronze</Typography>
            </Paper>
          </Box>

          {/* Personal Bests Table */}
          <Box sx={styles.sectionTitleBox}>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Personal Bests
            </Typography>
          </Box>

          <Box sx={styles.tableWrapper}>
            <Paper sx={styles.paper}>
              <Box sx={styles.tableScrollContainer}>
                <Table sx={styles.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableHeader}>Event</TableCell>
                      <TableCell sx={styles.tableHeader} align="center">Single</TableCell>
                      <TableCell sx={styles.tableHeader} align="center">Average</TableCell>
                      <TableCell sx={styles.tableHeader} align="center">Country Rank</TableCell>
                      <TableCell sx={styles.tableHeader} align="center">World Rank</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {personalBests.map((pb, index) => (
                      <TableRow key={index} sx={styles.tableRow}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span className={`cubing-icon event-${pb.eventId}`} style={{ fontSize: isMobile ? '1rem' : '1.25rem' }} />
                            <Typography fontWeight={600} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>{pb.event}</Typography>
                            {discontinuedEvents[pb.eventId] && (
                              <Tooltip title={discontinuedEvents[pb.eventId]} arrow enterTouchDelay={0} leaveTouchDelay={3000}>
                                <InfoOutlinedIcon sx={{ fontSize: '0.875rem', cursor: 'help' }} />
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">{pb.single}</TableCell>
                        <TableCell align="center">{pb.average}</TableCell>
                        <TableCell align="center">{pb.countryRank?.toLocaleString() || '—'}</TableCell>
                        <TableCell align="center">{pb.worldRank?.toLocaleString() || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Box>

          {/* Competition History */}
          <Box sx={styles.sectionTitleBox}>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Competition History (Last 5)
            </Typography>
          </Box>

          {stats?.competitionIds?.slice()
            .sort((a, b) => {
              const yearA = parseInt(a.match(/\d{4}/)?.[0] || '0')
              const yearB = parseInt(b.match(/\d{4}/)?.[0] || '0')
              return yearB - yearA
            })
            .slice(0, 5)
            .map((compId) => {
            const compResults = stats.results?.[compId]
            if (!compResults) return null
            
            // Format competition name from ID (e.g., "MissouriChampionship2025" -> "Missouri Championship 2025")
            const formatCompName = (id) => {
              return id.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1').trim()
            }
            
            return (
              <Box key={compId} sx={{ mb: isMobile ? 3 : 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, px: 1, fontSize: isMobile ? '1rem' : '1.25rem', color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>
                  {formatCompName(compId)}
                </Typography>
                <Box sx={styles.tableWrapper}>
                  <Paper sx={styles.paper}>
                    <Box sx={styles.tableScrollContainer}>
                      <Table sx={styles.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={styles.tableHeader}>Event</TableCell>
                            <TableCell sx={styles.tableHeader}>Round</TableCell>
                            <TableCell sx={styles.tableHeader} align="center">Place</TableCell>
                            <TableCell sx={styles.tableHeader} align="center">Single</TableCell>
                            <TableCell sx={styles.tableHeader} align="center">Average</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(compResults).flatMap(([eventId, rounds]) =>
                            rounds.map((round, idx) => (
                              <TableRow key={`${eventId}-${idx}`} sx={styles.tableRow}>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <span className={`cubing-icon event-${eventId}`} style={{ fontSize: isMobile ? '1rem' : '1.25rem' }} />
                                    <Typography fontWeight={600} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>{eventNames[eventId] || eventId}</Typography>
                                    {discontinuedEvents[eventId] && (
                                      <Tooltip title={discontinuedEvents[eventId]} arrow enterTouchDelay={0} leaveTouchDelay={3000}>
                                        <InfoOutlinedIcon sx={{ fontSize: '0.875rem', cursor: 'help' }} />
                                      </Tooltip>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>{round.round}</TableCell>
                                <TableCell align="center">{round.position}</TableCell>
                                <TableCell align="center">{formatTime(round.best)}</TableCell>
                                <TableCell align="center">{formatTime(round.average)}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            )
          })}
        </Container>
      </Box>
    </Box>
  )
}
