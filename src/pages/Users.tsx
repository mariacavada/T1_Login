import { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Avatar,
  Tooltip,
  InputAdornment,
} from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

interface User {
  _id: string
  name: string
  username: string
}

interface UsersProps {
  users: User[]
  addUser: (name: string, username: string, password: string) => Promise<void>
  delUser: (id: string) => void
}

function Users({ users, addUser, delUser }: UsersProps) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !username.trim() || !password.trim()) return
    setLoading(true)
    await addUser(name.trim(), username.trim(), password.trim())
    setName('')
    setUsername('')
    setPassword('')
    setLoading(false)
  }

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        maxWidth: 1000,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Page header */}
      <Box sx={{ mb: 4, animation: 'fadeUp 0.4s ease both', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
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
            Gestión de Usuarios
          </Typography>
          <Typography sx={{ color: '#475569', fontSize: 14 }}>
            Administra los usuarios registrados en el sistema
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
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <GroupRoundedIcon sx={{ fontSize: 16, color: '#818CF8' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#818CF8' }}>
            {users.length} {users.length === 1 ? 'usuario' : 'usuarios'}
          </Typography>
        </Box>
      </Box>

      {/* Add user form */}
      <Box
        component="form"
        onSubmit={handleAdd}
        sx={{
          borderRadius: '18px',
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.15)',
          p: 3.5,
          mb: 3,
          animation: 'fadeUp 0.5s ease 0.1s both',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonAddRoundedIcon sx={{ fontSize: 16, color: '#fff' }} />
          </Box>
          <Typography sx={{ fontFamily: '"Syne"', fontWeight: 600, fontSize: 15, color: '#E2E8F0' }}>
            Agregar nuevo usuario
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr auto' },
            gap: 2,
            alignItems: 'flex-end',
          }}
        >
          <TextField
            label="Nombre"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeRoundedIcon sx={{ fontSize: 16, color: '#475569' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Usuario"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailRoundedIcon sx={{ fontSize: 16, color: '#475569' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 16, color: '#475569' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<PersonAddRoundedIcon />}
            sx={{ whiteSpace: 'nowrap', py: 1, px: 2.5 }}
          >
            {loading ? 'Agregando...' : 'Agregar'}
          </Button>
        </Box>
      </Box>

      {/* Users table */}
      <Box
        sx={{
          borderRadius: '18px',
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.12)',
          overflow: 'hidden',
          animation: 'fadeUp 0.5s ease 0.2s both',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Usuario</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '14px',
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px solid rgba(99,102,241,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <GroupRoundedIcon sx={{ color: '#475569', fontSize: 22 }} />
                      </Box>
                      <Typography sx={{ color: '#475569', fontSize: 14 }}>
                        No hay usuarios registrados aún
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell sx={{ pl: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            fontSize: 13,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {(u.name || u.username).charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#E2E8F0' }}>
                          {u.name || '—'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '8px',
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px solid rgba(99,102,241,0.15)',
                        }}
                      >
                        <AlternateEmailRoundedIcon sx={{ fontSize: 12, color: '#6366F1' }} />
                        <Typography sx={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>
                          {u.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: 11,
                          color: '#334155',
                          maxWidth: 180,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {u._id}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Tooltip title="Eliminar usuario" arrow>
                        <IconButton
                          onClick={() => delUser(u._id)}
                          size="small"
                          sx={{
                            color: '#475569',
                            border: '1px solid rgba(244,63,94,0.15)',
                            background: 'rgba(244,63,94,0.05)',
                            '&:hover': {
                              color: '#F43F5E',
                              background: 'rgba(244,63,94,0.12)',
                              border: '1px solid rgba(244,63,94,0.3)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DeleteRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Users
