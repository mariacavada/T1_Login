import { Box, Typography, Button, Avatar } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

interface NavbarProps {
  username: string
  onLogout: () => void
}

const navLinks = [
  { to: '/', emoji: '🏠', label: 'Inicio' },
  { to: '/profile', emoji: '👤', label: 'Perfil' },
  { to: '/users', emoji: '👥', label: 'Usuarios' },
]

function Navbar({ username, onLogout }: NavbarProps) {
  const location = useLocation()

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        background: '#F2EBD9',
        borderRight: '1px solid #E5DDD0',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, pt: 3.5, pb: 2.5 }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: 26,
            color: '#1A1A1A',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          mi app
        </Typography>
      </Box>

      {/* User selector */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.5,
            py: 1.25,
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid #E5DDD0',
            cursor: 'pointer',
            '&:hover': { background: 'rgba(255,255,255,0.9)' },
            transition: 'background 0.15s',
          }}
        >
          <Avatar sx={{ width: 30, height: 30, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1A1A1A',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {username}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#9A8F82', lineHeight: 1.2 }}>Usuario</Typography>
          </Box>
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16, color: '#9A8F82', flexShrink: 0 }} />
        </Box>
      </Box>

      {/* Nav section label */}
      <Typography
        sx={{
          px: 3,
          py: 1,
          fontSize: 12,
          fontWeight: 600,
          color: '#9A8F82',
          letterSpacing: '0.02em',
        }}
      >
        Panel
      </Typography>

      {/* Nav links */}
      <Box sx={{ px: 1.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {navLinks.map(({ to, emoji, label }) => {
          const active = location.pathname === to
          return (
            <Box
              key={to}
              component={Link}
              to={to}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.1,
                borderRadius: '8px',
                textDecoration: 'none',
                position: 'relative',
                transition: 'all 0.15s ease',
                background: active ? 'rgba(255,255,255,0.7)' : 'transparent',
                borderLeft: active ? '3px solid #E9A318' : '3px solid transparent',
                '&:hover': {
                  background: active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                },
              }}
            >
              <Box sx={{ fontSize: 16, lineHeight: 1, width: 20, textAlign: 'center' }}>{emoji}</Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#1A1A1A' : '#4A4A4A',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Bottom section */}
      <Box sx={{ p: 2, pt: 0 }}>
        {/* Plan card */}
        <Box
          sx={{
            borderRadius: '12px',
            background: '#D1FAE5',
            border: '1px solid #A7F3D0',
            p: 2,
            mb: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
            <Box sx={{ fontSize: 20, lineHeight: 1, mt: 0.1 }}>🔒</Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#065F46', mb: 0.25 }}>
                Plan Gratis
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: '#047857', lineHeight: 1.4 }}>
                Desbloquea todos los usuarios
              </Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '8px',
              borderColor: '#059669',
              color: '#065F46',
              fontWeight: 600,
              fontSize: 12,
              py: 0.75,
              '&:hover': { background: 'rgba(5,150,105,0.08)', borderColor: '#047857' },
            }}
          >
            Ver planes
          </Button>
        </Box>

        {/* Logout */}
        <Button
          fullWidth
          onClick={onLogout}
          startIcon={<LogoutRoundedIcon sx={{ fontSize: '16px !important' }} />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1,
            borderRadius: '8px',
            color: '#9A8F82',
            fontSize: 13,
            fontWeight: 400,
            background: 'transparent',
            '&:hover': { background: 'rgba(0,0,0,0.04)', color: '#4A4A4A' },
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  )
}

export default Navbar
