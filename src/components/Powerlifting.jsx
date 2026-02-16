import { useEffect, useState } from 'react'
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

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
    padding: 3,
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
    marginBottom: 2,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: '0.9rem',
    color: 'text.secondary',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  errorText: {
    color: 'error.main',
    padding: 2,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 2,
  },
}

export default function Powerlifting() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const userDataRef = ref(db, 'powerlifting/user_data')

      const unsubscribe = onValue(
        userDataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val())
            setError(null)
          } else {
            setError('No powerlifting data found. Check back soon!')
          }
          setLoading(false)
        },
        (err) => {
          setError(`Error loading data: ${err.message}`)
          setLoading(false)
        }
      )

      return unsubscribe
    } catch (err) {
      setError(`Error: ${err.message}`)
      setLoading(false)
    }
  }, [])

  return (
    <Box sx={styles.container}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" sx={styles.heading}>
          Powerlifting Stats
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Paper elevation={10} sx={styles.paper}>
          {loading && (
            <Box sx={styles.loadingContainer}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography sx={styles.errorText}>{error}</Typography>
          )}

          {data && !loading && (
            <>
              <Typography sx={styles.lastUpdated}>
                Last Updated: {new Date(data.lastUpdated).toLocaleString()}
              </Typography>

              <TableContainer sx={styles.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#667eea' }}>
                        Property
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#667eea' }}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(data.data || {}).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </TableCell>
                        <TableCell>
                          {typeof value === 'object'
                            ? JSON.stringify(value, null, 2)
                            : String(value)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
