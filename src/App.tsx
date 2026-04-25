import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'

const API_URL = 'http://localhost:8000'

interface User {
  _id: string
  name: string
  username: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>({ _id: '', name: '', username: '' })
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (isLoggedIn) {
      fetch(API_URL + '/users')
        .then((r) => r.json())
        .then((data) => setUsers(data))
    }
  }, [isLoggedIn])

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const res = await fetch(API_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.login) {
      setUser(data.user)
      setIsLoggedIn(true)
    }
    return data.login
  }

  const handleLogout = () => {
    setUser({ _id: '', name: '', username: '' })
    setUsers([])
    setIsLoggedIn(false)
  }

  const addUser = async (name: string, username: string, password: string) => {
    const res = await fetch(API_URL + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password }),
    })
    const data = await res.json()
    setUsers((prev) => [...prev, data])
  }

  const delUser = async (id: string) => {
    setUsers((prev) => prev.filter((u) => u._id !== id))
    await fetch(API_URL + '/users/' + id, { method: 'DELETE' })
  }

  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        <>
          <Navbar username={user.username} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home username={user.name || user.username} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/users" element={<Users users={users} addUser={addUser} delUser={delUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </>
  )
}

export default App
