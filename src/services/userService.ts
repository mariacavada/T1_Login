const API_URL = 'https://t1login-production.up.railway.app'

export const getUsers = async (token: string) => {
  const res = await fetch(API_URL + '/users', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Error al obtener usuarios')
  return res.json()
}

export const getUserById = async (id: string, token: string) => {
  const res = await fetch(API_URL + '/users/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Usuario no encontrado')
  return res.json()
}

export const createUser = async (
  form: { name: string; username: string; password: string },
  token: string
) => {
  const res = await fetch(API_URL + '/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(form),
  })
  if (!res.ok) throw new Error('Error al crear usuario')
  return res.json()
}

export const deleteUser = async (id: string, token: string) => {
  await fetch(API_URL + '/users/' + id, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
