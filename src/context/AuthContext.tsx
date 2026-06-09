import { createContext, useState, type ReactNode } from 'react'

const API_URL = 'https://t1login-production.up.railway.app'

interface User {
  _id: string
  name: string
  username: string
}

interface AuthContextType {
  user: User
  token: string
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>({ _id: '', name: '', username: '' })
  const [token, setToken] = useState('')

  const login = async (username: string, password: string): Promise<boolean> => {
    const res = await fetch(API_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.login) {
      setUser(data.user)
      setToken(data.token)
      setIsLoggedIn(true)
    }
    return data.login
  }

  const logout = () => {
    setUser({ _id: '', name: '', username: '' })
    setToken('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
