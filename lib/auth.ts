// Mock authentication system
export interface User {
  id: string
  email: string
  name: string
  points: number
  level: string
  avatar?: string
  role: "user" | "organization" | "admin"
  organizationName?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    email: "juan@example.com",
    name: "Juan Pérez",
    points: 1250,
    level: "Guardián del Mar",
    avatar: "/abstract-profile.png",
    role: "user",
  },
  {
    id: "2",
    email: "maria@example.com",
    name: "María González",
    points: 850,
    level: "Protector de Playa",
    avatar: "/abstract-profile.png",
    role: "user",
  },
  {
    id: "3",
    email: "org@ecoplaya.com",
    name: "EcoPlaya Foundation",
    points: 5000,
    level: "Organización Verificada",
    avatar: "/placeholder-logo.png",
    role: "organization",
    organizationName: "EcoPlaya Foundation",
  },
  {
    id: "4",
    email: "miraflores@municipalidad.pe",
    name: "Municipalidad de Miraflores",
    points: 8500,
    level: "Organización Oficial",
    avatar: "/placeholder-logo.png",
    role: "organization",
    organizationName: "Municipalidad de Miraflores",
  },
  {
    id: "5",
    email: "admin@ecoplaya.com",
    name: "Admin EcoPlaya",
    points: 0,
    level: "Administrador",
    avatar: "/placeholder-logo.svg",
    role: "admin",
  },
]

// Mock authentication functions
export const login = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  if (user) {
    // Different passwords for different roles
    let correctPassword = "password"
    if (user.role === "organization") correctPassword = "org123"
    if (user.role === "admin") correctPassword = "admin123"
    
    if (password === correctPassword) {
      localStorage.setItem("user", JSON.stringify(user))
      return user
    }
  }
  return null
}

export const register = async (email: string, password: string, name: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    points: 0,
    level: "Nuevo Voluntario",
    avatar: "/abstract-profile.png",
    role: "user",
  }

  mockUsers.push(newUser)
  localStorage.setItem("user", JSON.stringify(newUser))
  return newUser
}

export const logout = () => {
  localStorage.removeItem("user")
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}
