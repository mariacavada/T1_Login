import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton } from '@mui/material'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

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
        background: '#07091A',
        '@keyframes floatA': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        '@keyframes floatB': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, 30px) scale(1.08)' },
          '66%': { transform: 'translate(25px, -35px) scale(0.92)' },
        },
        '@keyframes floatC': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -25px)' },
        },
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Left decorative panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0D1033 0%, #12083A 50%, #0A1040 100%)',
          borderRight: '1px solid rgba(99,102,241,0.15)',
        }}
      >
        {/* Animated orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
            animation: 'floatA 10s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
            animation: 'floatB 13s ease-in-out infinite',
            filter: 'blur(35px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '55%',
            left: '40%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
            animation: 'floatC 8s ease-in-out infinite',
            filter: 'blur(25px)',
          }}
        />

        {/* Grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 5 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 8px 32px rgba(99,102,241,0.5)',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: 30,
                color: '#fff',
              }}
            >
              M
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: 38,
              color: '#F1F5F9',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            Mi App
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              color: '#64748B',
              lineHeight: 1.7,
              maxWidth: 300,
              mx: 'auto',
            }}
          >
            Tu plataforma de gestión de usuarios, proyectos y colaboración en un solo lugar.
          </Typography>

          {/* Feature pills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 4 }}>
            {['Gestión de usuarios', 'Proyectos activos', 'Colaboración'].map((f) => (
              <Box
                key={f}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 20,
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  fontSize: 12,
                  color: '#818CF8',
                  fontWeight: 500,
                }}
              >
                {f}
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
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            animation: 'fadeUp 0.6s ease both',
          }}
        >
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontFamily: '"Syne"', fontWeight: 800, fontSize: 20, color: '#fff' }}>M</Typography>
            </Box>
            <Typography sx={{ fontFamily: '"Syne"', fontWeight: 700, fontSize: 20, color: '#F1F5F9' }}>Mi App</Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: { xs: 28, sm: 34 },
              color: '#F1F5F9',
              mb: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Bienvenido de vuelta
          </Typography>
          <Typography sx={{ color: '#64748B', fontSize: 15, mb: 4 }}>
            Inicia sesión para acceder a tu cuenta
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '10px',
                background: 'rgba(244,63,94,0.1)',
                border: '1px solid rgba(244,63,94,0.25)',
                color: '#FDA4AF',
                '& .MuiAlert-icon': { color: '#F43F5E' },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', mb: 0.75 }}>
                Nombre de usuario
              </Typography>
              <TextField
                fullWidth
                placeholder="tu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon sx={{ color: '#475569', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', mb: 0.75 }}>
                Contraseña
              </Typography>
              <TextField
                fullWidth
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#475569', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end" sx={{ color: '#475569' }}>
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
              size="large"
              disabled={loading}
              endIcon={!loading && <ArrowForwardRoundedIcon />}
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: 15,
                fontWeight: 600,
                borderRadius: '12px',
                background: loading
                  ? 'rgba(99,102,241,0.5)'
                  : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                boxShadow: loading ? 'none' : '0 4px 24px rgba(99,102,241,0.4)',
                '&:hover:not(:disabled)': {
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  boxShadow: '0 8px 32px rgba(99,102,241,0.55)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
