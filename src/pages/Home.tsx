import { Box, Typography, Card, CardContent } from '@mui/material'
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'

interface HomeProps {
  username: string
}

const cards = [
  {
    title: 'Proyectos Activos',
    value: '12',
    delta: '+2 este mes',
    icon: <FolderOpenRoundedIcon sx={{ fontSize: 22 }} />,
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    glow: 'rgba(99,102,241,0.35)',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    title: 'Tareas Completadas',
    value: '48',
    delta: '+12 esta semana',
    icon: <CheckCircleOutlineRoundedIcon sx={{ fontSize: 22 }} />,
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    glow: 'rgba(16,185,129,0.35)',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    title: 'Colaboradores',
    value: '7',
    delta: '+1 nuevo',
    icon: <PeopleAltRoundedIcon sx={{ fontSize: 22 }} />,
    gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
    glow: 'rgba(34,211,238,0.35)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.2)',
  },
]

function Home({ username }: HomeProps) {
  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        maxWidth: 1100,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 5, animation: 'fadeUp 0.5s ease both' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px #10B981',
            }}
          />
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#10B981', letterSpacing: '0.06em' }}>
            EN LÍNEA
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: { xs: 28, sm: 36 },
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#F1F5F9',
          }}
        >
          Bienvenido de vuelta,{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #818CF8 0%, #C4B5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {username}
          </Box>
        </Typography>
        <Typography sx={{ color: '#475569', fontSize: 15, mt: 1 }}>
          Aquí tienes un resumen de tu actividad reciente.
        </Typography>
      </Box>

      {/* Stat cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 5,
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={card.title}
            sx={{
              background: 'rgba(15,23,42,0.6)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${card.border}`,
              borderRadius: '18px',
              overflow: 'visible',
              transition: 'all 0.25s ease',
              animation: `fadeUp 0.5s ease ${i * 0.1 + 0.1}s both`,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 40px ${card.glow}`,
                border: `1px solid ${card.border.replace('0.2', '0.4')}`,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: card.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 16px ${card.glow}`,
                    color: '#fff',
                  }}
                >
                  {card.icon}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 20,
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                  }}
                >
                  <TrendingUpRoundedIcon sx={{ fontSize: 12, color: card.gradient.includes('#10B981') ? '#10B981' : card.gradient.includes('#22D3EE') ? '#22D3EE' : '#818CF8' }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: card.gradient.includes('#10B981') ? '#10B981' : card.gradient.includes('#22D3EE') ? '#22D3EE' : '#818CF8' }}>
                    {card.delta}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: 42,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  background: card.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 0.5,
                }}
              >
                {card.value}
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#64748B' }}>
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick overview banner */}
      <Box
        sx={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          p: 3.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          animation: 'fadeUp 0.5s ease 0.4s both',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: 18,
              color: '#E0E7FF',
              mb: 0.5,
            }}
          >
            Todo va en orden
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#64748B' }}>
            Ningún problema detectado · Última actividad hace unos momentos
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: '10px',
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.25)',
          }}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#10B981' }}>Sistema operativo</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
