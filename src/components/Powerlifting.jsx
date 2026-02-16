import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, CircularProgress, 
  Divider 
} from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingY: 6,
    gap: 4,
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  paper: {
    padding: 0,
    borderRadius: 4,
    width: '100%',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    mb: 5
  },
  heading: {
    fontWeight: 800,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  tableHeader: {
    fontWeight: 700,
    color: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    letterSpacing: '0.05rem',
  },
  cellBold: {
    fontWeight: 600,
    color: 'text.primary'
  }
}

export default function Powerlifting() {
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
      <CircularProgress thickness={5} size={60} sx={{ color: '#667eea' }} />
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
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        
        {/* Personal Bests Table */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, px: 1 }}>Personal Bests</Typography>
        <TableContainer component={Paper} sx={styles.paper}>
          <Table>
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
                  <TableCell sx={{ ...styles.cellBold, color: '#764ba2' }}>{pb.total} lbs</TableCell>
                  <TableCell>{pb.equip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Past Competitions Table */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 700, px: 1 }}>Competition History (Since 2018)</Typography>
        <TableContainer component={Paper} sx={styles.paper}>
          <Table>
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
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{comp.competition}</Typography>
                    <Typography variant="caption" color="text.secondary">{comp.date} • {comp.location}</Typography>
                  </TableCell>
                  <TableCell>{comp.squat} lbs</TableCell>
                  <TableCell>{comp.bench} lbs</TableCell>
                  <TableCell>{comp.deadlift} lbs</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {displayTotal(comp.total, comp.squat, comp.bench, comp.deadlift)}
                  </TableCell>
                  <TableCell sx={{ color: '#667eea', fontWeight: 600 }}>{comp.dots}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}