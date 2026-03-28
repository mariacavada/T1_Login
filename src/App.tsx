import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (user: string) => {
    setUsername(user)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUsername('')
    setIsLoggedIn(false)
  }

  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        <>
          <Navbar username={username} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home username={username} />} />
            <Route path="/profile" element={<Profile username={username} />} />
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
