// Advanced event data model for filters and mock data
export type District = "Miraflores" | "Barranco" | "Chorrillos" | "San Miguel"

export type Category = "Costa" | "Mar" | "Educación" | "Reciclaje"

export interface AllyCapabilities {
  boat?: { capacity: number; provider: string }
  sup?: { boards: number; provider: string }
  kits?: { gloves: number; bags: number; scales: number; sacks: number; tshirts?: number }
  insurance?: boolean
}

export interface AllyRef {
  id: string
  name: string
  capabilities: AllyCapabilities
  notes?: string
}

export interface OrganizerRef {
  type: "ONG" | "Municipalidad" | "Empresa" | "Comunidad"
  name: string
  contact?: string
}

export interface Requirements {
  mustKnowSwimming?: boolean
  minAge?: number
  waiver?: boolean
}

export interface Benefits {
  points: number
  certificate: boolean
  volunteerHours?: number
  discounts?: { allyId: string; description: string; pct?: number }[]
}

export interface Capacity {
  maxVolunteers?: number
}

export interface Location {
  distrito: District
  playa: string
  lat: number
  lng: number
}

export interface EventAdvanced {
  id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  location: Location
  category: Category
  activities: string[]
  organizer: OrganizerRef
  allies: AllyRef[]
  requirements?: Requirements
  benefits?: Benefits
  capacity?: Capacity
  images?: string[]
  status: "upcoming" | "past" | "draft"
}

// Small allies catalog used by filters
export const mockAllies: AllyRef[] = [
  {
    id: "ally-1",
    name: "Surf Perú",
    capabilities: { sup: { boards: 10, provider: "SurfPeru Co." }, kits: { gloves: 50, bags: 200, scales: 2, sacks: 100 } },
  },
  {
    id: "ally-2",
    name: "Caplina SUP",
    capabilities: { sup: { boards: 8, provider: "Caplina" }, insurance: true },
  },
  {
    id: "ally-3",
    name: "Mar Adentro",
    capabilities: { boat: { capacity: 12, provider: "MarAdentro" }, kits: { gloves: 30, bags: 100, scales: 1, sacks: 50 } },
  },
  {
    id: "ally-4",
    name: "Aloha Perú",
    capabilities: { sup: { boards: 6, provider: "Aloha" }, kits: { gloves: 20, bags: 80, scales: 1, sacks: 30 } },
  },
  {
    id: "ally-5",
    name: "Lima Food Boat",
    capabilities: { boat: { capacity: 20, provider: "Lima Food Boat" }, kits: { gloves: 10, bags: 50, scales: 1, sacks: 20 } },
  },
]

// A few advanced mock events (small set). These can be extended or replaced by real API calls.
export const mockEventsAdvanced: EventAdvanced[] = [
  {
    id: "e-1",
    title: "Limpieza Playa Miraflores - Mañana",
    description: "Jornada de limpieza en Miraflores. Se proveerán kits.",
    startDate: "2025-11-10T08:00:00Z",
    endDate: "2025-11-10T12:00:00Z",
    location: { distrito: "Miraflores", playa: "Playa Miraflores", lat: -12.1196, lng: -77.0365 },
    category: "Costa",
    activities: ["Limpieza", "Educación"],
    organizer: { type: "Municipalidad", name: "Municipalidad de Miraflores", contact: "contacto@miraflores.gob" },
    allies: [mockAllies[0], mockAllies[2]],
    requirements: { mustKnowSwimming: false, minAge: 12, waiver: true },
    benefits: { points: 50, certificate: true, volunteerHours: 4 },
    capacity: { maxVolunteers: 120 },
    images: ["/evento_1.jpeg"],
    status: "upcoming",
  },
  {
    id: "e-2",
    title: "Restauración de Dunas - Barranco",
    description: "Plantación y manejo de dunas. Actividad voluntaria con herramientas.",
    startDate: "2025-11-20T07:00:00Z",
    location: { distrito: "Barranco", playa: "Playa Barranco", lat: -12.1467, lng: -77.0208 },
    category: "Costa",
    activities: ["Restauración de Dunas", "Educación"],
    organizer: { type: "ONG", name: "EcoVoluntarios Perú", contact: "hola@ecovoluntarios.pe" },
    allies: [mockAllies[1]],
    requirements: { mustKnowSwimming: false, minAge: 16, waiver: true },
    benefits: { points: 80, certificate: true, volunteerHours: 6 },
    capacity: { maxVolunteers: 40 },
    images: ["/evento_2.jpg"],
    status: "upcoming",
  },
  {
    id: "e-3",
    title: "Buceo de Recolección - Chorrillos",
    description: "Buceo organizado para retiro de residuos sumergidos. Experiencia previa requerida.",
    startDate: "2025-10-01T09:00:00Z",
    location: { distrito: "Chorrillos", playa: "Playa Chorrillos", lat: -12.1833, lng: -77.0167 },
    category: "Mar",
    activities: ["Buceo", "Reciclaje"],
    organizer: { type: "Empresa", name: "Mar Adentro", contact: "contact@maradentro.pe" },
    allies: [mockAllies[2]],
    requirements: { mustKnowSwimming: true, minAge: 18, waiver: true },
    benefits: { points: 120, certificate: true, volunteerHours: 5 },
    capacity: { maxVolunteers: 12 },
    images: ["/imagen_playa_3.jpg"],
    status: "past",
  },
  {
    id: "e-4",
    title: "Limpieza Profunda en el Mar - Barranco",
    description: "Operativo de recaudación de residuos sumergidos en coordinación con Surf Perú y Caplina SUP. Incluye kits (guantes, bolsas, costales) y soporte de seguridad. Es obligatorio saber nadar.",
    startDate: "2025-11-15T07:30:00Z",
    location: { distrito: "Barranco", playa: "Playa Barranco", lat: -12.1467, lng: -77.0208 },
    category: "Mar",
    activities: ["Buceo", "Reciclaje"],
    organizer: { type: "Comunidad", name: "EcoPlaya + Aliados", contact: "eventos@ecoplaya.pe" },
    allies: [mockAllies[0], mockAllies[1]],
    requirements: { mustKnowSwimming: true, minAge: 16, waiver: true },
    benefits: { points: 120, certificate: true, volunteerHours: 4 },
    capacity: { maxVolunteers: 30 },
    images: ["/imagen_playa_2.jpg"],
    status: "upcoming",
  },
  {
    id: "e-5",
    title: "Operativo de Recolección Marina - Miraflores",
    description: "Jornada de limpieza subacuática con apoyo de Aloha Perú. Se brindan kits de limpieza (guantes, bolsas, balanza) y se requiere saber nadar.",
    startDate: "2025-11-18T08:00:00Z",
    location: { distrito: "Miraflores", playa: "Playa Miraflores", lat: -12.1196, lng: -77.0365 },
    category: "Costa",
    activities: ["Snorkel", "Limpieza"],
    organizer: { type: "ONG", name: "EcoPlaya + Aloha Perú", contact: "hola@alohaperu.org" },
    allies: [mockAllies[3]],
    requirements: { mustKnowSwimming: true, minAge: 14, waiver: true },
    benefits: { points: 80, certificate: true, volunteerHours: 3 },
    capacity: { maxVolunteers: 40 },
    images: ["/evento_1.jpeg"],
    status: "upcoming",
  },
  {
    id: "e-6",
    title: "Jornada de Limpieza Marina y Monitoreo - San Miguel",
    description: "Actividad de SUP para apoyo logístico y recolección de residuos flotantes. Con la colaboración de Caplina SUP y Surf Perú. Se entregan kits y se recomienda saber nadar.",
    startDate: "2025-11-22T09:00:00Z",
    location: { distrito: "San Miguel", playa: "Playa San Miguel", lat: -12.085, lng: -77.082 },
    category: "Mar",
    activities: ["SUP", "Limpieza"],
    organizer: { type: "Comunidad", name: "EcoPlaya + Aliados", contact: "eventos@ecoplaya.pe" },
    allies: [mockAllies[1], mockAllies[0]],
    requirements: { mustKnowSwimming: true, minAge: 12, waiver: true },
    benefits: { points: 60, certificate: false, volunteerHours: 2 },
    capacity: { maxVolunteers: 50 },
    images: ["/imagen_playa_1.jpg"],
    status: "upcoming",
  },
]

export default mockEventsAdvanced
