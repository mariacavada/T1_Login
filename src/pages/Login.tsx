import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useAuth from '../hooks/useAuth'

function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa ambos campos.')
      return
    }
    setError('')
    setLoading(true)
    const ok = await login(username.trim(), password.trim())
    if (!ok) setError('Usuario o contraseña incorrectos.')
    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#FAF7F2',
      }}
    >
      {/* Right form panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6 },
          py: 6,
          background: '#FFFFFF',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 5 }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans"',
                fontWeight: 700,
                fontSize: 32,
                letterSpacing: '-0.04em',
                color: '#1A1A1A',
              }}
            >
              mi app
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: 26,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              mb: 0.75,
            }}
          >
            Iniciar sesión
          </Typography>
          <Typography sx={{ color: '#9A8F82', fontSize: 14, mb: 3.5 }}>
            Bienvenido de vuelta, ingresa tus datos para continuar.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                borderRadius: '10px',
                fontSize: 13,
                border: '1px solid #FED7D7',
                background: '#FFF5F5',
                color: '#C53030',
                '& .MuiAlert-icon': { color: '#E53E3E' },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#4A4A4A', mb: 0.75 }}>
                Usuario
              </Typography>
              <TextField
                fullWidth
                placeholder="tu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { fontSize: 14 } }}
              />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#4A4A4A', mb: 0.75 }}>
                Contraseña
              </Typography>
              <TextField
                fullWidth
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { fontSize: 14 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass(!showPass)}
                        edge="end"
                        size="small"
                        sx={{ color: '#C4B49A' }}
                      >
                        {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 0.5,
                py: 1.25,
                fontSize: 14,
                fontWeight: 600,
                borderRadius: '999px',
                background: '#E9A318',
                '&:hover:not(:disabled)': { background: '#C88910' },
                '&.Mui-disabled': { background: '#F5D68A', color: '#fff' },
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
