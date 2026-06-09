import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CircularProgress,
} from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import useUsers from '../hooks/useUsers'

function Users() {
  const { users, loading, addUser, removeUser } = useUsers()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !username.trim() || !password.trim()) return
    setSaving(true)
    await addUser({ name: name.trim(), username: username.trim(), password: password.trim() })
    setName('')
    setUsername('')
    setPassword('')
    setSaving(false)
  }

  return (
    <Box sx={{ p: { xs: 3, sm: 5 }, maxWidth: 960 }}>
      {/* Page header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
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
            👥 Usuarios
          </Typography>
          <Typography sx={{ color: '#9A8F82', fontSize: 14 }}>
            Administra los usuarios registrados en el sistema
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '999px',
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>
            {users.length} {users.length === 1 ? 'usuario' : 'usuarios'}
          </Typography>
        </Box>
      </Box>

      {/* Add user form */}
      <Box
        component="form"
        onSubmit={handleAdd}
        sx={{
          borderRadius: '14px',
          background: '#FFFFFF',
          border: '1px solid #EDE8DE',
          p: 3,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', mb: 2 }}>
          Agregar usuario
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr auto' },
            gap: 1.5,
            alignItems: 'flex-end',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7A7A7A', mb: 0.5 }}>Nombre</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Juan García"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7A7A7A', mb: 0.5 }}>Usuario</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="juangarcia"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7A7A7A', mb: 0.5 }}>Contraseña</Typography>
            <TextField
              fullWidth
              size="small"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={<PersonAddRoundedIcon sx={{ fontSize: '16px !important' }} />}
            sx={{ py: 1, px: 2.5, whiteSpace: 'nowrap', fontSize: 13 }}
          >
            {saving ? 'Agregando...' : 'Agregar'}
          </Button>
        </Box>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress sx={{ color: '#E9A318' }} />
        </Box>
      )}

      {/* Table */}
      {!loading && (
        <Box
          sx={{
            borderRadius: '14px',
            background: '#FFFFFF',
            border: '1px solid #EDE8DE',
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Nombre</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 7 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ fontSize: 36 }}>👥</Box>
                        <Typography sx={{ color: '#9A8F82', fontSize: 14 }}>
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
                          <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 700 }}>
                            {(u.name || u.username).charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: '#1A1A1A' }}>
                            {u.name || '—'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1.5,
                            py: 0.4,
                            borderRadius: '6px',
                            background: '#FAF7F2',
                            border: '1px solid #EDE8DE',
                          }}
                        >
                          <Typography sx={{ fontSize: 13, color: '#7A7A7A' }}>
                            @{u.username}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: 11,
                            color: '#C4B49A',
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Tooltip title="Ver detalle" arrow>
                            <IconButton
                              onClick={() => navigate(`/users/${u._id}`)}
                              size="small"
                              sx={{
                                color: '#C4B49A',
                                border: '1px solid #EDE8DE',
                                '&:hover': {
                                  color: '#E9A318',
                                  background: '#FEF9EC',
                                  border: '1px solid #FDE68A',
                                },
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <OpenInNewRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar usuario" arrow>
                            <IconButton
                              onClick={() => removeUser(u._id)}
                              size="small"
                              sx={{
                                color: '#C4B49A',
                                border: '1px solid #EDE8DE',
                                '&:hover': {
                                  color: '#E53E3E',
                                  background: '#FFF5F5',
                                  border: '1px solid #FED7D7',
                                },
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <DeleteRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default Users
