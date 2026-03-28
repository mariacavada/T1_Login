import { Box, Typography, Card, CardContent, Grid } from '@mui/material'

interface HomeProps {
  username: string
}

function Home({ username }: HomeProps) {
  const cards = [
    { title: 'Proyectos Activos', value: '12' },
    { title: 'Tareas Completadas', value: '48' },
    { title: 'Colaboradores', value: '7' },
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {username}
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 4 }} key={card.title}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ my: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
