import { Box, Typography, Avatar, Chip } from '@mui/material'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded'

interface ProfileProps {
  user: { _id: string; name: string; username: string }
}

function Profile({ user }: ProfileProps) {
  const displayName = user.name || user.username
  const initials = displayName.charAt(0).toUpperCase()

  const fields = [
    {
      icon: <BadgeRoundedIcon sx={{ fontSize: 18 }} />,
      label: 'Nombre completo',
      value: user.name || '—',
    },
    {
      icon: <AlternateEmailRoundedIcon sx={{ fontSize: 18 }} />,
      label: 'Nombre de usuario',
      value: user.username,
    },
    {
      icon: <KeyRoundedIcon sx={{ fontSize: 18 }} />,
      label: 'ID de usuario',
      value: user._id,
      mono: true,
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        maxWidth: 700,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Page header */}
      <Box sx={{ mb: 4, animation: 'fadeUp 0.4s ease both' }}>
        <Typography
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: { xs: 26, sm: 32 },
            color: '#F1F5F9',
            letterSpacing: '-0.03em',
            mb: 0.5,
          }}
        >
          Mi Perfil
        </Typography>
        <Typography sx={{ color: '#475569', fontSize: 14 }}>
          Información de tu cuenta registrada
        </Typography>
      </Box>

      {/* Profile card */}
      <Box
        sx={{
          borderRadius: '20px',
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.15)',
          overflow: 'hidden',
          animation: 'fadeUp 0.5s ease 0.1s both',
        }}
      >
        {/* Cover gradient */}
        <Box
          sx={{
            height: 130,
            background: 'linear-gradient(135deg, #3730A3 0%, #6D28D9 40%, #7C3AED 70%, #2563EB 100%)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%),
                radial-gradient(circle at 75% 30%, rgba(255,255,255,0.05) 0%, transparent 40%)
              `,
            },
          }}
        />

        {/* Avatar + info */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mt: -5, mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: 32,
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                border: '4px solid #07091A',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#F1F5F9',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {displayName}
                </Typography>
                <VerifiedRoundedIcon sx={{ fontSize: 18, color: '#818CF8' }} />
              </Box>
              <Chip
                label="Usuario registrado"
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  color: '#818CF8',
                  borderRadius: '6px',
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>

          {/* Divider */}
          <Box sx={{ height: 1, background: 'rgba(99,102,241,0.12)', mb: 3 }} />

          {/* Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {fields.map((field, i) => (
              <Box
                key={field.label}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  py: 2,
                  borderBottom: i < fields.length - 1 ? '1px solid rgba(99,102,241,0.08)' : 'none',
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '9px',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818CF8',
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  {field.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.25 }}>
                    {field.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: field.mono ? 12 : 15,
                      fontWeight: 500,
                      color: field.mono ? '#64748B' : '#E2E8F0',
                      fontFamily: field.mono ? 'monospace' : undefined,
                      wordBreak: 'break-all',
                    }}
                  >
                    {field.value || '—'}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
