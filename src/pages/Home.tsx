import { Box, Typography, Card, CardContent } from '@mui/material'
import useAuth from '../hooks/useAuth'

const cards = [
  { title: 'Proyectos Activos', value: '12', emoji: '📁', bg: '#FEF3C7', border: '#FDE68A', text: '#92400E' },
  { title: 'Tareas Completadas', value: '48', emoji: '✅', bg: '#D1FAE5', border: '#A7F3D0', text: '#065F46' },
  { title: 'Colaboradores', value: '7', emoji: '🤝', bg: '#EDE9FE', border: '#DDD6FE', text: '#4C1D95' },
]

function Home() {
  const { user } = useAuth()
  const username = user.name || user.username
  return (
    <Box sx={{ p: { xs: 3, sm: 5 }, maxWidth: 900 }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
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
          Bienvenido, {username} 👋
        </Typography>
        <Typography sx={{ color: '#9A8F82', fontSize: 14 }}>
          Aquí tienes un resumen de tu actividad.
        </Typography>
      </Box>

      {/* Stat cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {cards.map((card) => (
          <Card key={card.title} elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  mb: 2.5,
                }}
              >
                {card.emoji}
              </Box>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 36,
                  letterSpacing: '-0.04em',
                  color: '#1A1A1A',
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {card.value}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#9A8F82', fontWeight: 400 }}>
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Status banner */}
      <Box
        sx={{
          borderRadius: '14px',
          background: '#FFFFFF',
          border: '1px solid #EDE8DE',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            background: '#D1FAE5',
            border: '1px solid #A7F3D0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          🟢
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', mb: 0.25 }}>
            Todo en orden
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#9A8F82' }}>
            No hay problemas detectados · Sistema operativo
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
