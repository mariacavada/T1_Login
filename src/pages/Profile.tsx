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
import BadgeIcon from '@mui/icons-material/Badge'
import PersonIcon from '@mui/icons-material/Person'

interface ProfileProps {
  user: { _id: string; name: string; username: string }
}

function Profile({ user }: ProfileProps) {
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
            {(user.name || user.username).charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5">{user.name || user.username}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Usuario registrado
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Nombre" secondary={user.name} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Nombre de usuario" secondary={user.username} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile
