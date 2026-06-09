import { useState, useEffect } from 'react'
import { getUsers, createUser, deleteUser } from '../services/userService'
import useAuth from './useAuth'

interface User {
  _id: string
  name: string
  username: string
}

const useUsers = () => {
  const { token } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    const fetchUsers = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getUsers(token)
        setUsers(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [token])

  const addUser = async (form: { name: string; username: string; password: string }) => {
    const newUser = await createUser(form, token)
    setUsers((prev) => [...prev, newUser])
    return newUser
  }

  const removeUser = async (id: string) => {
    await deleteUser(id, token)
    setUsers((prev) => prev.filter((u) => u._id !== id))
  }

  return { users, loading, error, addUser, removeUser }
}

export default useUsers
