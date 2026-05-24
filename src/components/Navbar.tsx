import { Box, Typography, Button, Avatar, Divider } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'

interface NavbarProps {
  username: string
  onLogout: () => void
}

const navLinks = [
  { to: '/', icon: <GridViewRoundedIcon fontSize="small" />, label: 'Inicio' },
  { to: '/profile', icon: <PersonRoundedIcon fontSize="small" />, label: 'Perfil' },
  { to: '/users', icon: <GroupRoundedIcon fontSize="small" />, label: 'Usuarios' },
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
        background: 'rgba(10,14,31,0.95)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(99,102,241,0.12)',
        zIndex: 100,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)',
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: 18,
                color: '#fff',
                lineHeight: 1,
              }}
            >
              M
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: 18,
              color: '#F1F5F9',
              letterSpacing: '-0.02em',
            }}
          >
            Mi App
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'rgba(99,102,241,0.1)' }} />

      {/* Nav label */}
      <Typography
        sx={{
          px: 3,
          pt: 3,
          pb: 1,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#475569',
        }}
      >
        Navegación
      </Typography>

      {/* Nav Links */}
      <Box sx={{ px: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {navLinks.map(({ to, icon, label }) => {
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
                py: 1.25,
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                background: active
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 100%)'
                  : 'transparent',
                border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                '&:hover': {
                  background: active
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.16) 100%)'
                    : 'rgba(99,102,241,0.07)',
                  border: '1px solid rgba(99,102,241,0.18)',
                },
                '& svg': {
                  color: active ? '#818CF8' : '#64748B',
                  transition: 'color 0.2s ease',
                  flexShrink: 0,
                },
              }}
            >
              {active && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '60%',
                    borderRadius: '0 2px 2px 0',
                    background: 'linear-gradient(180deg, #6366F1, #8B5CF6)',
                    boxShadow: '0 0 8px rgba(99,102,241,0.6)',
                  }}
                />
              )}
              {icon}
              <Typography
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  color: active ? '#E0E7FF' : '#94A3B8',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Bottom user section */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2, borderColor: 'rgba(99,102,241,0.1)' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1.5,
            borderRadius: '12px',
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.1)',
            mb: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#E2E8F0',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {username}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#64748B' }}>Usuario activo</Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          onClick={onLogout}
          startIcon={<LogoutIcon fontSize="small" />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1,
            borderRadius: '10px',
            color: '#64748B',
            fontSize: 13,
            fontWeight: 500,
            border: '1px solid transparent',
            '&:hover': {
              background: 'rgba(244,63,94,0.08)',
              color: '#F43F5E',
              border: '1px solid rgba(244,63,94,0.2)',
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  )
}

export default Navbar
