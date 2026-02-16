import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, CircularProgress, 
  Divider, useTheme 
} from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

const useStyles = (theme) => ({
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
  },
  paper: {
    padding: 0,
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    overflow: 'visible',
    mb: 5,
    minWidth: '800px',
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
})

export default function Powerlifting() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const [athlete, setAthlete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress thickness={5} size={60} sx={{ color: theme.palette.primary.main }} />
    </Box>
  )

  if (error) return <Typography color="error" align="center" sx={{ mt: 10 }}>{error}</Typography>

  // Filter competitions for 2018 and later
  const competitions = (athlete?.competition_results || [])
    .filter(comp => new Date(comp.date).getFullYear() >= 2018)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Utility to handle missing total values
  const displayTotal = (total, squat, bench, deadlift) => {
    if (total && total !== "") return `${total} lbs`
    const sum = (parseFloat(squat) || 0) + (parseFloat(bench) || 0) + (parseFloat(deadlift) || 0)
    return sum > 0 ? `${sum.toFixed(1)} lbs` : '—'
  }

  return (
    <Box sx={{ overflowX: 'auto', width: '100%', flex: 1, display: 'flex' }}>
      <Box sx={styles.container}>
        <Container maxWidth="lg" sx={{ minWidth: '800px' }}>
          
          {/* Personal Bests Table */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, px: 1 }}>Personal Bests</Typography>
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
                {athlete?.personal_best?.map((pb, i) => (
                  <TableRow key={i} hover>
                    <TableCell sx={styles.cellBold}>{pb.squat} lbs</TableCell>
                    <TableCell sx={styles.cellBold}>{pb.bench} lbs</TableCell>
                    <TableCell sx={styles.cellBold}>{pb.deadlift} lbs</TableCell>
                    <TableCell sx={styles.totalCell}>{pb.total} lbs</TableCell>
                    <TableCell sx={styles.cell}>{pb.equip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>

          {/* Past Competitions Table */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 700, px: 1 }}>Competition History (Since 2018)</Typography>
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
                      <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{comp.competition}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>{comp.date} • {comp.location}</Typography>
                    </TableCell>
                    <TableCell sx={styles.cell}>{comp.squat} lbs</TableCell>
                    <TableCell sx={styles.cell}>{comp.bench} lbs</TableCell>
                    <TableCell sx={styles.cell}>{comp.deadlift} lbs</TableCell>
                    <TableCell sx={{ ...styles.cell, fontWeight: 700 }}>
                      {displayTotal(comp.total, comp.squat, comp.bench, comp.deadlift)}
                    </TableCell>
                    <TableCell sx={styles.dotsCell}>{comp.dots}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}