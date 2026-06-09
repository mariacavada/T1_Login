import { Box, Typography, Avatar, Chip } from '@mui/material'
import useAuth from '../hooks/useAuth'

function Profile() {
  const { user } = useAuth()
  const displayName = user.name || user.username

  const fields = [
    { emoji: '🪪', label: 'Nombre completo', value: user.name || '—' },
    { emoji: '👤', label: 'Nombre de usuario', value: user.username },
    { emoji: '🔑', label: 'ID de usuario', value: user._id, mono: true },
  ]

  return (
    <Box sx={{ p: { xs: 3, sm: 5 }, maxWidth: 640 }}>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: { xs: 24, sm: 30 },
            color: '#1A1A1A',
            letterSpacing: '-0.025em',
            mb: 0.5,
          }}
        >
          Perfil de usuario
        </Typography>
        <Typography sx={{ color: '#9A8F82', fontSize: 14 }}>
          Información asociada a tu cuenta
        </Typography>
      </Box>

      {/* Profile card */}
      <Box
        sx={{
          borderRadius: '16px',
          background: '#FFFFFF',
          border: '1px solid #EDE8DE',
          overflow: 'hidden',
        }}
      >
        {/* Cover */}
        <Box
          sx={{
            height: 110,
            background: 'linear-gradient(135deg, #F2EBD9 0%, #E8D9BB 50%, #F5E8C4 100%)',
            position: 'relative',
          }}
        />

        {/* Avatar + info */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mt: -4.5, mb: 3 }}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                fontSize: 28,
                fontWeight: 700,
                border: '3px solid #FFFFFF',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                background: '#E9A318',
                flexShrink: 0,
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ mb: 0.5 }}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#1A1A1A',
                  letterSpacing: '-0.01em',
                  mb: 0.5,
                }}
              >
                {displayName}
              </Typography>
              <Chip
                label="Usuario activo"
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 500,
                  background: '#D1FAE5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  borderRadius: '6px',
                }}
              />
            </Box>
          </Box>

          {/* Divider */}
          <Box sx={{ height: 1, background: '#EDE8DE', mb: 3 }} />

          {/* Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {fields.map((field, i) => (
              <Box
                key={field.label}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  py: 2,
                  borderBottom: i < fields.length - 1 ? '1px solid #EDE8DE' : 'none',
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: '#FAF7F2',
                    border: '1px solid #EDE8DE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  {field.emoji}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#9A8F82', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.25 }}>
                    {field.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: field.mono ? 12 : 14,
                      fontWeight: field.mono ? 400 : 500,
                      color: field.mono ? '#C4B49A' : '#1A1A1A',
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
