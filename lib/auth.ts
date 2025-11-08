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
  district?: string
  phone?: string
  // Optional badges for gamification
  badges?: string[]
  referralCode?: string
  referralCount?: number
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
    referralCode: generateReferralCode(),
    referralCount: 0,
  }

  mockUsers.push(newUser)
  localStorage.setItem("user", JSON.stringify(newUser))
  return newUser
}

// Extended register accepting extra profile info
export const registerExtended = async (
  email: string,
  password: string,
  name: string,
  district?: string,
  phone?: string
): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    points: 0,
    level: "Nuevo Voluntario",
    avatar: "/abstract-profile.png",
    role: "user",
    district,
    phone,
    referralCode: generateReferralCode(),
    referralCount: 0,
  }
  mockUsers.push(newUser)
  localStorage.setItem("user", JSON.stringify(newUser))
  return newUser
}

// Forgot password mock (always succeeds after delay)
export const forgotPassword = async (email: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // In a real impl we'd verify email exists & send token
  return true
}

// Social auth mock
export const socialLogin = async (
  provider: "google" | "facebook"
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const base: User = {
    id: Date.now().toString(),
    email: provider === "google" ? "google_user@demo.com" : "facebook_user@demo.com",
    name: provider === "google" ? "Usuario Google" : "Usuario Facebook",
    points: 0,
    level: "Nuevo Voluntario",
    avatar: "/abstract-profile.png",
    role: "user",
  }
  mockUsers.push(base)
  localStorage.setItem("user", JSON.stringify(base))
  return base
}

export const logout = () => {
  localStorage.removeItem("user")
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

// Helper to persist current user updates
export const setCurrentUser = (user: User | null) => {
  if (typeof window === "undefined") return
  if (user) localStorage.setItem("user", JSON.stringify(user))
  else localStorage.removeItem("user")
}

export const updateCurrentUser = (updater: (u: User) => User): User | null => {
  const u = getCurrentUser()
  if (!u) return null
  const updated = updater(u)
  setCurrentUser(updated)
  return updated
}

export const addPoints = (points: number): number | null => {
  const updated = updateCurrentUser((u) => ({ ...u, points: (u.points || 0) + points }))
  return updated ? updated.points : null
}

export const grantBadge = (badge: string): string[] | null => {
  const updated = updateCurrentUser((u) => {
    const badges = Array.isArray(u.badges) ? u.badges : []
    if (!badges.includes(badge)) badges.push(badge)
    return { ...u, badges }
  })
  return updated ? (updated.badges || []) : null
}

// Referral helpers
function generateReferralCode() {
  return Math.random().toString(36).substring(2,8).toUpperCase()
}

export function ensureReferralCode() {
  updateCurrentUser(u => {
    if (!u.referralCode) return { ...u, referralCode: generateReferralCode(), referralCount: u.referralCount || 0 }
    return u
  })
}

export function registerReferralConversion(refCode: string) {
  // map refCode -> number of successful conversions this month
  const key = 'referralConversions'
  const map = JSON.parse(localStorage.getItem(key) || '{}')
  map[refCode] = (map[refCode] || 0) + 1
  localStorage.setItem(key, JSON.stringify(map))

  // increment referralCount for the user owning this code (mock users DB)
  const owner = mockUsers.find(u => u.referralCode === refCode)
  if (owner) {
    owner.referralCount = (owner.referralCount || 0) + 1
    // if owner is the current user, persist
    const current = getCurrentUser()
    if (current && current.id === owner.id) {
      setCurrentUser(owner)
    }
  }
}

export function getReferralLeaderboard(): { code: string; count: number }[] {
  const map = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('referralConversions') || '{}' : '{}')
  return Object.entries(map)
    .map(([code, count]) => ({ code, count: count as number }))
    .sort((a,b)=>b.count - a.count)
    .slice(0,10)
}

// Convert a referral when the referred user completes their first event registration
export function convertReferral(refCode: string) {
  if (typeof window === 'undefined') return
  const current = getCurrentUser()
  if (!current) return
  // prevent self-referral
  if (current.referralCode && current.referralCode === refCode) return
  const awardedKey = 'referralAwardedUsers'
  const awarded: string[] = JSON.parse(localStorage.getItem(awardedKey) || '[]')
  if (awarded.includes(current.id)) return // already awarded for first event

  // mark awarded
  awarded.push(current.id)
  localStorage.setItem(awardedKey, JSON.stringify(awarded))

  // award referred user
  updateCurrentUser(u => ({ ...u, points: u.points + 200 }))
  grantBadge('Referido Activo')

  // award referrer if exists in mock db
  const referrer = mockUsers.find(u => u.referralCode === refCode)
  if (referrer) {
    referrer.points += 200
    referrer.referralCount = (referrer.referralCount || 0) + 1
    // if referrer is current user (edge case self) we skip due to earlier check
    // if referrer is logged in (not current), we cannot know; only update mock db
    // If by chance they are current user (should not), persist
    const currentNow = getCurrentUser()
    if (currentNow && currentNow.id === referrer.id) setCurrentUser(referrer)
  }
  // track conversion stats
  registerReferralConversion(refCode)
}
