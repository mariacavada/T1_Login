import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'

interface NavbarProps {
  username: string
  onLogout: () => void
}

function Navbar({ username, onLogout }: NavbarProps) {
  const location = useLocation()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0, mr: 4 }}>
          Mi App
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant={location.pathname === '/' ? 'outlined' : 'text'}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            startIcon={<PersonIcon />}
            variant={location.pathname === '/profile' ? 'outlined' : 'text'}
          >
            Perfil
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            startIcon={<GroupIcon />}
            variant={location.pathname === '/users' ? 'outlined' : 'text'}
          >
            Usuarios
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Hola, {username}
        </Typography>
        <Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
