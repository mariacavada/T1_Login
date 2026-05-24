import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366F1', light: '#818CF8', dark: '#4F46E5' },
    secondary: { main: '#22D3EE' },
    error: { main: '#F43F5E' },
    success: { main: '#10B981' },
    background: { default: '#07091A', paper: 'rgba(15,23,42,0.8)' },
    text: { primary: '#F1F5F9', secondary: '#94A3B8' },
    divider: 'rgba(99,102,241,0.15)',
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Outfit", sans-serif', fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: '#07091A', minHeight: '100vh' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          boxShadow: '0 4px 24px rgba(99,102,241,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            boxShadow: '0 6px 30px rgba(99,102,241,0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            '& fieldset': { borderColor: 'rgba(99,102,241,0.25)' },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#6366F1' },
          },
          '& .MuiInputLabel-root': { color: '#94A3B8' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#818CF8' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.12)',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(15,23,42,0.8)',
          backdropFilter: 'blur(20px)',
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(99,102,241,0.1)',
          color: '#F1F5F9',
        },
        head: {
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#94A3B8',
          background: 'rgba(99,102,241,0.08)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { background: 'rgba(99,102,241,0.06)' },
          '&:last-child td': { border: 0 },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          fontFamily: '"Syne", sans-serif',
          fontWeight: 700,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
  },
})

const API_URL = 'https://mariamariaapi.up.railway.app'

interface User {
  _id: string
  name: string
  username: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>({ _id: '', name: '', username: '' })
  const [users, setUsers] = useState<User[]>([])
  const [token, setToken] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      fetch(API_URL + '/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => setUsers(data))
    }
  }, [isLoggedIn])

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const res = await fetch(API_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.login) {
      setUser(data.user)
      setToken(data.token)
      setIsLoggedIn(true)
    }
    return data.login
  }

  const handleLogout = () => {
    setUser({ _id: '', name: '', username: '' })
    setUsers([])
    setToken('')
    setIsLoggedIn(false)
  }

  const addUser = async (name: string, username: string, password: string) => {
    const res = await fetch(API_URL + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, username, password }),
    })
    const data = await res.json()
    setUsers((prev) => [...prev, data])
  }

  const delUser = async (id: string) => {
    setUsers((prev) => prev.filter((u) => u._id !== id))
    await fetch(API_URL + '/users/' + id, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar username={user.username} onLogout={handleLogout} />
          <Box
            component="main"
            sx={{
              flex: 1,
              ml: '260px',
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #07091A 0%, #0D1528 50%, #0A0E1F 100%)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'fixed',
                top: '-20%',
                right: '-10%',
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'fixed',
                bottom: '-20%',
                left: '20%',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Routes>
              <Route path="/" element={<Home username={user.name || user.username} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/users" element={<Users users={users} addUser={addUser} delUser={delUser} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </ThemeProvider>
  )
}

export default App
