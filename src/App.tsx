import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import { AuthProvider, AuthContext } from './context/AuthContext'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#E9A318', light: '#F5C45E', dark: '#C88910', contrastText: '#fff' },
    secondary: { main: '#5A4A3A' },
    error: { main: '#E53E3E' },
    success: { main: '#276749' },
    background: { default: '#FAF7F2', paper: '#FFFFFF' },
    text: { primary: '#1A1A1A', secondary: '#7A7A7A' },
    divider: '#EDE8DE',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.06)',
    '0 2px 6px rgba(0,0,0,0.07)',
    '0 4px 12px rgba(0,0,0,0.08)',
    '0 6px 16px rgba(0,0,0,0.09)',
    '0 8px 24px rgba(0,0,0,0.1)',
    ...Array(19).fill('none'),
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { background: '#FAF7F2' } },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, borderRadius: 999 },
        containedPrimary: {
          background: '#E9A318',
          color: '#fff',
          boxShadow: 'none',
          '&:hover': { background: '#C88910', boxShadow: 'none' },
        },
        outlinedPrimary: {
          borderColor: '#E9A318',
          color: '#E9A318',
          '&:hover': { background: 'rgba(233,163,24,0.06)', borderColor: '#C88910' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: '#FDFBF7',
            '& fieldset': { borderColor: '#E5DDD0' },
            '&:hover fieldset': { borderColor: '#C4B49A' },
            '&.Mui-focused fieldset': { borderColor: '#E9A318', borderWidth: 1.5 },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#E9A318' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid #EDE8DE',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          borderRadius: 14,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#EDE8DE', color: '#1A1A1A', fontFamily: '"DM Sans", sans-serif' },
        head: {
          fontWeight: 500,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#9A8F82',
          background: '#FAF7F2',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { background: '#FAF7F2' },
          '&:last-child td': { border: 0 },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: '#E9A318',
          color: '#fff',
          fontWeight: 700,
          fontFamily: '"DM Sans", sans-serif',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"DM Sans", sans-serif', borderRadius: 6 },
      },
    },
  },
})

function AppContent() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      {isLoggedIn ? (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Box
            component="main"
            sx={{ flex: 1, ml: '260px', minHeight: '100vh', bgcolor: '#FAF7F2' }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
