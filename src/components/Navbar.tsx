import { Box, Typography, Button, Avatar, Menu, MenuItem, Divider } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import { useState } from 'react'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

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
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.5,
            py: 1.25,
            borderRadius: '10px',
            background: menuOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
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
          <KeyboardArrowDownRoundedIcon
            sx={{
              fontSize: 16,
              color: '#9A8F82',
              flexShrink: 0,
              transition: 'transform 0.15s',
              transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                mt: 0.5,
                width: 220,
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                border: '1px solid #E5DDD0',
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{username}</Typography>
            <Typography sx={{ fontSize: 11, color: '#9A8F82' }}>Usuario</Typography>
          </Box>
          <Divider sx={{ borderColor: '#E5DDD0' }} />
          <MenuItem
            component={Link}
            to="/profile"
            onClick={() => setAnchorEl(null)}
            sx={{ fontSize: 13, color: '#4A4A4A', gap: 1.25, py: 1 }}
          >
            <PersonOutlineRoundedIcon sx={{ fontSize: 16, color: '#9A8F82' }} />
            Ver perfil
          </MenuItem>
          <Divider sx={{ borderColor: '#E5DDD0' }} />
          <MenuItem
            onClick={() => { setAnchorEl(null); onLogout() }}
            sx={{ fontSize: 13, color: '#C0392B', gap: 1.25, py: 1 }}
          >
            <LogoutRoundedIcon sx={{ fontSize: 16 }} />
            Cerrar sesión
          </MenuItem>
        </Menu>
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
