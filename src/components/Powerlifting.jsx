import { useEffect, useState } from 'react'
import { 
  Box, Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, CircularProgress 
} from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    gap: 4,
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  },
  paper: {
    padding: 3,
    borderRadius: 3,
    width: '100%',
    mb: 4
  },
  heading: {
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  sectionTitle: {
    fontWeight: 600,
    mb: 2,
    color: '#444'
  },
  headerCell: {
    fontWeight: 700, 
    color: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.05)'
  }
}

export default function Powerlifting() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userDataRef = ref(db, 'powerlifting/user_data')
    const unsubscribe = onValue(userDataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val())
      } else {
        setError('No data found.')
      }
      setLoading(false)
    }, (err) => {
      setError(err.message)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) return (
    <Box sx={styles.container}><CircularProgress /></Box>
  )

  // Extract nested data
  const rawData = data?.data?.[0] || {}
  const personalBests = rawData.personal_best || []
  const competitions = (rawData.competition_results || [])
    .filter(comp => new Date(comp.date).getFullYear() >= 2018)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={styles.heading} align="center">
          Powerlifting Profile: {rawData.name}
        </Typography>
        
        {/* Personal Bests Table */}
        <Typography variant="h6" sx={styles.sectionTitle}>Personal Bests</Typography>
        <TableContainer component={Paper} elevation={4} sx={styles.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.headerCell}>Squat</TableCell>
                <TableCell sx={styles.headerCell}>Bench</TableCell>
                <TableCell sx={styles.headerCell}>Deadlift</TableCell>
                <TableCell sx={styles.headerCell}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personalBests.map((pb, idx) => (
                <TableRow key={idx}>
                  <TableCell>{pb.squat} lbs</TableCell>
                  <TableCell>{pb.bench} lbs</TableCell>
                  <TableCell>{pb.deadlift} lbs</TableCell>
                  <TableCell><strong>{pb.total} lbs</strong></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Competition History Table */}
        <Typography variant="h6" sx={styles.sectionTitle}>Competition History (Since 2018)</Typography>
        <TableContainer component={Paper} elevation={4} sx={styles.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.headerCell}>Competition</TableCell>
                <TableCell sx={styles.headerCell}>Squat</TableCell>
                <TableCell sx={styles.headerCell}>Bench</TableCell>
                <TableCell sx={styles.headerCell}>Deadlift</TableCell>
                <TableCell sx={styles.headerCell}>Total</TableCell>
                <TableCell sx={styles.headerCell}>DOTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitions.map((comp, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{comp.competition}</Typography>
                    <Typography variant="caption" color="text.secondary">{comp.date}</Typography>
                  </TableCell>
                  <TableCell>{comp.squat || '—'}</TableCell>
                  <TableCell>{comp.bench || '—'}</TableCell>
                  <TableCell>{comp.deadlift || '—'}</TableCell>
                  <TableCell><strong>{comp.total || '—'}</strong></TableCell>
                  <TableCell>{comp.dots}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}