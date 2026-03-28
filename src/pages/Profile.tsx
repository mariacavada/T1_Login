import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import BadgeIcon from '@mui/icons-material/Badge'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

interface ProfileProps {
  username: string
}

function Profile({ username }: ProfileProps) {
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Card elevation={2}>
        <CardContent sx={{ textAlign: 'center', pt: 4 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: 36,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5">{username}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Usuario registrado
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Nombre de usuario" secondary={username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText
                primary="Correo electrónico"
                secondary={`${username}@ejemplo.com`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText
                primary="Fecha de registro"
                secondary="27 de marzo de 2026"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile
