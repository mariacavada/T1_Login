import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface LoginProps {
  onLogin: (username: string, password: string) => Promise<boolean>
}

function Login({ onLogin }: LoginProps) {
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
    const ok = await onLogin(username.trim(), password.trim())
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
      {/* Left decorative panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '44%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#F2EBD9',
          borderRight: '1px solid #E5DDD0',
          px: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(233,163,24,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(233,163,24,0.07)',
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 340 }}>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: '-0.05em',
              color: '#1A1A1A',
              mb: 2,
              lineHeight: 1,
            }}
          >
            mi app
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              color: '#7A7A7A',
              lineHeight: 1.65,
              mb: 4,
            }}
          >
            Tu plataforma de gestión de usuarios, proyectos y colaboración en un solo lugar.
          </Typography>

          {/* Feature list */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
            {[
              { emoji: '🏠', text: 'Panel de control con métricas clave' },
              { emoji: '👤', text: 'Gestión de perfil de usuario' },
              { emoji: '👥', text: 'Administración de usuarios' },
            ].map((f) => (
              <Box key={f.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: '#fff',
                    border: '1px solid #E5DDD0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {f.emoji}
                </Box>
                <Typography sx={{ fontSize: 13.5, color: '#4A4A4A', lineHeight: 1.4 }}>{f.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

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
