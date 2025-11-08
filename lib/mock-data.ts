// Mock data for the beach platform

export interface Beach {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  status: "clean" | "regular" | "dirty"
  lastUpdated: string
  reports: number
  description: string
}

export interface Report {
  id: string
  beachId: string
  userId: string
  userName: string
  type: ReportType
  urgency: UrgencyLevel
  description: string
  image: string
  location: { lat: number; lng: number }
  timestamp: string
  status: ReportStatus
  points: number
  verifierComment?: string
  communityValidations?: string[] // userIds who validated in person
  validatedAt?: string // when community threshold reached
  resolved?: boolean
  resolvedAt?: string
  resolvedImages?: { before: string; after: string } | null
}

export type ReportType =
  | "trash"
  | "oil_spill"
  | "wildlife"
  | "erosion"
  | "water_pollution"
  | "illegal_construction"
  | "vehicles"
  | "other"

export type UrgencyLevel = "bajo" | "medio" | "alto" | "critico"
export type ReportStatus = "pending" | "verified" | "rejected" | "community_validated" | "resolved"

export const REPORT_TYPE_META: Record<ReportType, { label: string; color: string; icon: string }> = {
  trash: { label: "Basura", color: "#6b7280", icon: "Trash2" },
  oil_spill: { label: "Derrame de Petróleo", color: "#000000", icon: "Droplet" },
  wildlife: { label: "Animales en Peligro", color: "#ef4444", icon: "PawPrint" },
  erosion: { label: "Erosión Costera", color: "#9a3412", icon: "Waves" },
  water_pollution: { label: "Contaminación de Agua", color: "#2563eb", icon: "Droplets" },
  illegal_construction: { label: "Construcción Ilegal", color: "#7c3aed", icon: "Building" },
  vehicles: { label: "Vehículos en la Playa", color: "#374151", icon: "Car" },
  other: { label: "Otro", color: "#4b5563", icon: "AlertTriangle" },
}

export const URGENCY_BADGE: Record<UrgencyLevel, { label: string; className: string }> = {
  bajo: { label: "Bajo", className: "bg-green-100 text-green-700" },
  medio: { label: "Medio", className: "bg-yellow-100 text-yellow-700" },
  alto: { label: "Alto", className: "bg-orange-100 text-orange-700" },
  critico: { label: "Crítico", className: "bg-red-100 text-red-700" },
}

export interface Event {
  id: string
  title: string
  description: string
  beachId: string
  beachName: string
  date: string
  time: string
  duration: string
  volunteers: number
  maxVolunteers: number
  organizer: string
  organizerId: string
  image: string
  points: number
  status: "pending" | "approved" | "rejected" | "completed"
  chatId: string
  registeredUsers?: string[] // IDs de usuarios registrados
  allyId?: string // patrocinado por aliado
  isAllyExclusive?: boolean // evento exclusivo aliado/EcoPlaya
}

export interface ChatMessage {
  id: string
  chatId: string
  userId: string
  userName: string
  userAvatar: string
  message: string
  timestamp: string
  type: "message" | "system" | "announcement"
}

export interface EventChat {
  id: string
  eventId: string
  eventTitle: string
  messages: ChatMessage[]
  participants: string[] // IDs de usuarios
}

export interface Reward {
  id: string
  title: string
  description: string
  points: number
  category: "discount" | "badge" | "experience" | "nonmaterial"
  partner: string
  image: string
  available: boolean
  limitedUntil?: string // ISO for flash offers
  flashCost?: number // discounted points while active
}

// Mock beaches data
export const mockBeaches: Beach[] = [
  {
    id: "1",
    name: "Playa de la Concha",
    location: { lat: -12.0464, lng: -77.0428 },
    status: "clean",
    lastUpdated: "2024-01-15",
    reports: 3,
    description: "Hermosa playa urbana con aguas cristalinas",
  },
  {
    id: "2",
    name: "Playa Miraflores",
    location: { lat: -12.1196, lng: -77.0365 },
    status: "regular",
    lastUpdated: "2024-01-14",
    reports: 7,
    description: "Popular playa turística con algunas áreas que necesitan atención",
  },
  {
    id: "3",
    name: "Playa Barranco",
    location: { lat: -12.1467, lng: -77.0208 },
    status: "dirty",
    lastUpdated: "2024-01-13",
    reports: 12,
    description: "Playa que requiere limpieza urgente",
  },
  {
    id: "4",
    name: "Playa Chorrillos",
    location: { lat: -12.1833, lng: -77.0167 },
    status: "clean",
    lastUpdated: "2024-01-15",
    reports: 2,
    description: "Playa familiar bien mantenida",
  },
]

// Mock reports data
export const mockReports: Report[] = [
  {
    id: "1",
    beachId: "2",
    userId: "1",
    userName: "Juan Pérez",
    type: "trash",
    urgency: "medio",
    description: "Acumulación de botellas plásticas en la orilla",
    image: "/beach-trash-bottles.jpg",
    location: { lat: -12.1196, lng: -77.0365 },
    timestamp: "2024-01-14T10:30:00Z",
    status: "verified",
    points: 40,
    verifierComment: "Reporte verificado. Gracias por tu contribución, se programará limpieza en la zona.",
  },
  {
    id: "2",
    beachId: "3",
    userId: "2",
    userName: "María González",
    type: "oil_spill",
    urgency: "alto",
    description: "Mancha de aceite cerca del muelle",
    image: "/oil-spill-beach.jpg",
    location: { lat: -12.1467, lng: -77.0208 },
    timestamp: "2024-01-13T15:45:00Z",
    status: "pending",
    points: 25,
  },
  {
    id: "3",
    beachId: "1",
    userId: "1",
    userName: "Juan Pérez",
    type: "trash",
    urgency: "bajo",
    description: "Residuos plásticos en zona rocosa",
    image: "/placeholder.jpg",
    location: { lat: -12.0464, lng: -77.0428 },
    timestamp: "2024-01-10T09:15:00Z",
    status: "verified",
    points: 40,
    verifierComment: "Verificado. Área ya limpiada.",
  },
  {
    id: "4",
    beachId: "2",
    userId: "1",
    userName: "Juan Pérez",
    type: "other",
    urgency: "bajo",
    description: "Zona completamente limpia después de evento",
    image: "/placeholder.jpg",
    location: { lat: -12.1196, lng: -77.0365 },
    timestamp: "2024-01-05T16:20:00Z",
    status: "rejected",
    points: 0,
    verifierComment: "Este tipo de reporte no otorga puntos. Gracias por compartir el progreso.",
  },
]

// Mock events data
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Limpieza Masiva Playa Miraflores",
    description: "Jornada de limpieza comunitaria con herramientas proporcionadas",
    beachId: "2",
    beachName: "Playa Miraflores",
    date: "2024-01-20",
    time: "08:00",
    duration: "4 horas",
    volunteers: 45,
    maxVolunteers: 100,
    organizer: "Municipalidad de Miraflores",
    organizerId: "4",
  image: "/evento_1.jpeg", // Imagen 1: evento_1.jpeg
    points: 70,
    status: "approved",
    chatId: "chat-1",
    registeredUsers: ["1", "2"],
  },
  {
    id: "2",
    title: "Restauración de Dunas - Playa Barranco",
    description: "Plantación de vegetación nativa para proteger las dunas",
    beachId: "3",
    beachName: "Playa Barranco",
    date: "2024-01-25",
    time: "07:00",
    duration: "6 horas",
    volunteers: 23,
    maxVolunteers: 50,
    organizer: "EcoVoluntarios Perú",
    organizerId: "3",
  image: "/evento_2.jpg", // Imagen 2: evento_2.jpg
    points: 80,
    status: "approved",
    chatId: "chat-2",
    registeredUsers: ["1"],
  },
  {
    id: "3",
    title: "Campaña de Concientización - Costa Verde",
    description: "Distribución de material educativo y recolección de residuos",
    beachId: "1",
    beachName: "Playa de la Concha",
    date: "2024-01-28",
    time: "10:00",
    duration: "3 horas",
    volunteers: 32,
    maxVolunteers: 60,
    organizer: "EcoPlaya Foundation",
    organizerId: "3",
  image: "/evento_3.jpeg", // Imagen 3: evento_3.jpeg
    points: 50,
    status: "approved",
    chatId: "chat-3",
    registeredUsers: [],
  },
]

// Mock event chats
export const mockEventChats: EventChat[] = [
  {
    id: "chat-1",
    eventId: "1",
    eventTitle: "Limpieza Masiva Playa Miraflores",
    participants: ["1", "2", "4"],
    messages: [
      {
        id: "msg-1",
        chatId: "chat-1",
        userId: "4",
        userName: "Municipalidad de Miraflores",
        userAvatar: "/placeholder-logo.png",
        message: "¡Bienvenidos al evento! Por favor lleguen 15 minutos antes para la distribución de materiales.",
        timestamp: "2024-01-19T10:00:00Z",
        type: "announcement",
      },
      {
        id: "msg-2",
        chatId: "chat-1",
        userId: "system",
        userName: "Sistema",
        userAvatar: "/placeholder-logo.svg",
        message: "Juan Pérez se ha registrado al evento",
        timestamp: "2024-01-19T10:05:00Z",
        type: "system",
      },
      {
        id: "msg-3",
        chatId: "chat-1",
        userId: "1",
        userName: "Juan Pérez",
        userAvatar: "/abstract-profile.png",
        message: "¡Hola a todos! ¿Necesitamos llevar algo en particular?",
        timestamp: "2024-01-19T11:30:00Z",
        type: "message",
      },
      {
        id: "msg-4",
        chatId: "chat-1",
        userId: "4",
        userName: "Municipalidad de Miraflores",
        userAvatar: "/placeholder-logo.png",
        message: "Solo ropa cómoda y protector solar. Nosotros proporcionamos guantes, bolsas y herramientas.",
        timestamp: "2024-01-19T12:00:00Z",
        type: "message",
      },
      {
        id: "msg-5",
        chatId: "chat-1",
        userId: "system",
        userName: "Sistema",
        userAvatar: "/placeholder-logo.svg",
        message: "María González se ha registrado al evento",
        timestamp: "2024-01-19T14:20:00Z",
        type: "system",
      },
      {
        id: "msg-6",
        chatId: "chat-1",
        userId: "2",
        userName: "María González",
        userAvatar: "/abstract-profile.png",
        message: "¡Qué emoción! Es mi primer evento de limpieza 🌊",
        timestamp: "2024-01-19T14:25:00Z",
        type: "message",
      },
      {
        id: "msg-7",
        chatId: "chat-1",
        userId: "1",
        userName: "Juan Pérez",
        userAvatar: "/abstract-profile.png",
        message: "¡Bienvenida María! Será una gran experiencia 💚",
        timestamp: "2024-01-19T14:30:00Z",
        type: "message",
      },
    ],
  },
  {
    id: "chat-2",
    eventId: "2",
    eventTitle: "Restauración de Dunas - Playa Barranco",
    participants: ["1", "3"],
    messages: [
      {
        id: "msg-8",
        chatId: "chat-2",
        userId: "3",
        userName: "EcoPlaya Foundation",
        userAvatar: "/placeholder-logo.png",
        message: "Evento de restauración de dunas. Punto de encuentro: Estacionamiento de Playa Barranco.",
        timestamp: "2024-01-24T09:00:00Z",
        type: "announcement",
      },
      {
        id: "msg-9",
        chatId: "chat-2",
        userId: "system",
        userName: "Sistema",
        userAvatar: "/placeholder-logo.svg",
        message: "Juan Pérez se ha registrado al evento",
        timestamp: "2024-01-24T10:15:00Z",
        type: "system",
      },
    ],
  },
  {
    id: "chat-3",
    eventId: "3",
    eventTitle: "Campaña de Concientización - Costa Verde",
    participants: ["3"],
    messages: [
      {
        id: "msg-10",
        chatId: "chat-3",
        userId: "3",
        userName: "EcoPlaya Foundation",
        userAvatar: "/placeholder-logo.png",
        message: "¡Evento creado! Esperamos contar con muchos voluntarios para esta campaña educativa.",
        timestamp: "2024-01-27T15:00:00Z",
        type: "announcement",
      },
    ],
  },
]

// District markers mock data (for map overlays)
export interface DistrictMarker {
  id: string
  nombre_distrito: string
  lat: number
  lng: number
  color: "primary" | "secondary"
}

export const mockDistrictMarkers: DistrictMarker[] = [
  {
    id: "d-1",
    nombre_distrito: "Chorrillos",
    lat: -12.1833,
    lng: -77.0167,
    color: "primary",
  },
  {
    id: "d-2",
    nombre_distrito: "Miraflores",
    lat: -12.1196,
    lng: -77.0365,
    color: "secondary",
  },
  {
    id: "d-3",
    nombre_distrito: "Barranco",
    lat: -12.1467,
    lng: -77.0208,
    color: "secondary",
  },
  {
    id: "d-4",
    nombre_distrito: "San Miguel",
    lat: -12.0735,
    lng: -77.0780,
    color: "secondary",
  },
]

// Mock allies (aliados estratégicos)
export interface Ally {
  id: string
  nombre: string
  distrito: string
  logo_url?: string
  banner_url?: string
  descripcion: string
  actividades: string[]
  rating?: number
  social_links?: { twitter?: string; instagram?: string; web?: string; facebook?: string; whatsapp?: string; email?: string }
  categoria?: "restaurant" | "eco-shop" | "surf-school" | "ngo" | "municipality" | "other"
  fotos?: string[]
  ubicacion?: { lat: number; lng: number; direccion?: string }
  horarios?: { dias: string; abre: string; cierra: string }[]
  descuentos?: { titulo: string; descripcion: string; pct?: number; validoHasta?: string }[]
  certificacion?: "Bronce" | "Plata" | "Oro" | "Platino"
  impacto?: { voluntariosPorPlataforma: number; eventosPatrocinados: number; redenciones: number }
}

export const mockAllies: Ally[] = [
  {
    id: "a-1",
    nombre: "Surf Peru",
    distrito: "Chorrillos",
    // As requested: surfperu PNG and banner
    logo_url: "/surfperu_png.png",
    banner_url: "/banner_surf_peru.png",
    descripcion:
      "Surf Peru — Clases de surf para todas las edades y niveles. Instructores certificados. Ofrecemos clases individuales y grupales, alquiler de equipos, camps de verano y entrenamiento personalizado.",
    actividades: ["Clases de surf", "Alquiler de equipos", "Camps"],
    rating: 4.7,
    social_links: { instagram: "@surfchorrillos", whatsapp: "+51900000000", email: "contacto@surfperu.com" },
    categoria: "surf-school",
    fotos: ["/ally_surf_1.jpg","/ally_surf_2.jpg","/ally_surf_3.jpg"],
    ubicacion: { lat: -12.167, lng: -77.021, direccion: "Costa Verde, Chorrillos" },
    horarios: [ { dias: "L-V", abre: "06:00", cierra: "18:00" }, { dias: "S-D", abre: "06:00", cierra: "19:00" } ],
    descuentos: [ { titulo: "10% off clases", descripcion: "Para miembros EcoPlaya", pct: 10, validoHasta: new Date(Date.now()+1000*60*60*24*10).toISOString() } ],
    certificacion: "Plata",
    impacto: { voluntariosPorPlataforma: 124, eventosPatrocinados: 6, redenciones: 48 },
  },
  {
    id: "a-2",
    nombre: "Aloha Perú",
    distrito: "Miraflores",
    // As requested: aloha PNG and banner
    logo_url: "/aloha_png.png",
    banner_url: "/banner_aloha.png",
    descripcion:
      "Aloha Perú — Escuela de surf y actividades costeras. Clases de surf para niños y adultos, talleres de reciclaje comunitario y programas de voluntariado en la playa.",
    actividades: ["Clases de surf", "Reciclaje/Voluntariado"],
    rating: 4.5,
    social_links: { web: "https://reciclaya.example", instagram: "@alohaperu" },
    categoria: "surf-school",
    fotos: ["/ally_aloha_1.jpg","/ally_aloha_2.jpg"],
    ubicacion: { lat: -12.121, lng: -77.033, direccion: "Playa Makaha, Miraflores" },
    horarios: [ { dias: "Todos", abre: "07:00", cierra: "19:00" } ],
    descuentos: [ { titulo: "2x1 taller reciclaje", descripcion: "Solo este mes", validoHasta: new Date(Date.now()+1000*60*60*24*5).toISOString() } ],
    certificacion: "Oro",
    impacto: { voluntariosPorPlataforma: 210, eventosPatrocinados: 12, redenciones: 120 },
  },
  {
    id: "a-3",
    nombre: "Caplina",
    distrito: "Barranco",
    // As requested: caplina PNG and banner
    logo_url: "/caplina_png.png",
    banner_url: "/banner_caplina.png",
    descripcion:
      "Caplina — Clases de Stand Up Paddle (SUP) y yoga sobre tabla. Ofrecemos salidas guiadas, sesiones de yoga en la costa, alquiler de tablas y entrenamiento para todos los niveles.",
    actividades: ["SUP", "Yoga en tablas", "Alquiler de equipos"],
    rating: 4.9,
    categoria: "surf-school",
    fotos: ["/ally_caplina_1.jpg"],
    ubicacion: { lat: -12.147, lng: -77.021, direccion: "Bajada de Baños, Barranco" },
    certificacion: "Bronce",
    impacto: { voluntariosPorPlataforma: 56, eventosPatrocinados: 3, redenciones: 20 },
  },
  {
    id: "a-4",
    nombre: "Lima Food Boat",
    distrito: "San Miguel",
    // As requested: lima food boat PNG and banner
    logo_url: "/lima_food_boat.png",
    banner_url: "/banner_lima_food_boat.png",
    descripcion:
      "Lima Food Boat — Experiencias gastronómicas y paseos en bote. También ofrecemos alquiler de tablas, tours costeros y servicios de catering para eventos en la costa.",
    actividades: ["Alquiler de equipos", "Tours gastronómicos"],
    rating: 4.2,
    categoria: "restaurant",
    ubicacion: { lat: -12.0735, lng: -77.078, direccion: "Costa Verde, San Miguel" },
    certificacion: "Plata",
  },
  {
    id: "a-5",
    nombre: "Escuela de Surf Barranco",
    distrito: "Barranco",
  logo_url: "/lima-food-boat-2-logo.png",
  banner_url: "/surf-barranco-banner.jpg",
    descripcion: "Clases y camps de verano para jóvenes y adultos.",
    actividades: ["Clases de surf", "Alquiler de equipos"],
    categoria: "surf-school",
    certificacion: "Bronce",
  },
]

// Mock services for allies
export interface Service {
  id: string
  allyId: string
  titulo: string
  descripcion: string
  imagen_url?: string
  precio: number
  moneda: string
  duracion: string
  capacidad: number
  slots_disponibles: number
  categorias: string[]
  politicas?: string
  disponibilidad?: string[] // array of YYYY-MM-DD
}

export const mockServices: Service[] = [
  {
    id: "s-1",
    allyId: "a-1",
    titulo: "Clase de Surf - Nivel Inicial",
    descripcion: "Clase individual de 1 hora para principiantes. Tablas incluidas.",
    imagen_url: "/imagen_1d.jpg",
    precio: 35,
    moneda: "USD",
    duracion: "1 hora",
    capacidad: 4,
    slots_disponibles: 4,
    categorias: ["Clases de surf"],
    politicas: "Cancelación 24h antes",
    disponibilidad: ["2025-10-28", "2025-10-29", "2025-10-30", "2025-11-01"],
  },
  {
    id: "s-2",
    allyId: "a-1",
    titulo: "Alquiler de Tabla - Medio Día",
    descripcion: "Alquiler de tabla por medio día (4 horas).",
    imagen_url: "/imagen_2d.jpg",
    precio: 20,
    moneda: "USD",
    duracion: "4 horas",
    capacidad: 1,
    slots_disponibles: 6,
    categorias: ["Alquiler de equipos"],
    disponibilidad: ["2025-10-28", "2025-10-30", "2025-11-02"],
  },
  {
    id: "s-3",
    allyId: "a-2",
    titulo: "Taller de Reciclaje Comunitario",
    descripcion: "Sesión educativa y práctica de reciclaje en la playa.",
    imagen_url: "/services/recycling-workshop.jpg",
    precio: 0,
    moneda: "USD",
    duracion: "2 horas",
    capacidad: 30,
    slots_disponibles: 30,
    categorias: ["Reciclaje/Voluntariado"],
    disponibilidad: ["2025-10-29", "2025-11-03"],
  },
]

// Simple testimonials by ally (mock/local)
export interface AllyTestimonial { id: string; allyId: string; user: string; comment: string; rating: number; created: string }
export const mockAllyTestimonials: AllyTestimonial[] = [
  { id: 't-1', allyId: 'a-1', user: 'Lucía', comment: 'Excelentes clases, súper pacientes.', rating: 5, created: new Date().toISOString() },
  { id: 't-2', allyId: 'a-2', user: 'Carlos', comment: 'El taller de reciclaje estuvo buenazo.', rating: 5, created: new Date().toISOString() },
]

// Mock bookings (empty initial)
export interface Booking {
  bookingId: string
  allyId: string
  serviceId: string
  fecha: string
  hora?: string
  personas: number
  total: number
  estado: "confirmed" | "pending" | "cancelled"
}

export const mockBookings: Booking[] = []

// Mock rewards data
export const mockRewards: Reward[] = [
  {
    id: "1",
    title: "20% descuento en Café Oceánico",
    description: "Descuento en bebidas y snacks saludables",
    points: 150,
    category: "discount",
    partner: "Café Oceánico",
  image: "/recompensas_1.jpg",
    available: true,
    limitedUntil: new Date(Date.now() + 1000*60*60*48).toISOString(),
    flashCost: 100,
  },
  {
    id: "2",
    title: "Insignia Guardián del Mar",
    description: "Reconocimiento por 10 limpiezas completadas",
    points: 600,
    category: "badge",
    partner: "Plataforma EcoPlaya",
    image: "/ocean-guardian-badge.jpg",
    available: true,
  },
  {
    id: "3",
    title: "Tour de Snorkel Gratuito",
    description: "Experiencia de snorkel en aguas protegidas",
    points: 1000,
    category: "experience",
    partner: "AquaAdventures",
    image: "/snorkeling-tour.jpg",
    available: true,
  },
  {
    id: "4",
    title: "Camiseta EcoPlaya Official",
    description: "Camiseta de algodón orgánico con el logo de EcoPlaya",
    points: 300,
    category: "discount",
    partner: "EcoStore",
  image: "/recompensa_4.jpg",
    available: true,
  },
  {
    id: "5",
    title: "Kit de Limpieza Profesional",
    description: "Guantes reutilizables, bolsas biodegradables y pinzas recolectoras",
    points: 450,
    category: "discount",
    partner: "EcoTools",
  image: "/recompensa_5.jpg",
    available: true,
  },
  // Non-material rewards
  {
    id: "nm-1",
    title: "Mención en el post mensual de agradecimiento",
    description: "Tu nombre aparecerá en nuestro post mensual",
    points: 50,
    category: "nonmaterial",
    partner: "EcoPlaya",
    image: "/ocean-guardian-badge.jpg",
    available: true,
  },
  {
    id: "nm-2",
    title: "Certificado Digital de Participación",
    description: "Recibe un certificado digital por tu aporte",
    points: 100,
    category: "nonmaterial",
    partner: "EcoPlaya",
    image: "/placeholder.jpg",
    available: true,
  },
  {
    id: "nm-3",
    title: "Video-saludo de fundadores",
    description: "Un agradecimiento personalizado en video",
    points: 500,
    category: "nonmaterial",
    partner: "EcoPlaya",
    image: "/placeholder.jpg",
    available: true,
  },
]

// Marketplace offers mock (eco-friendly)
export interface MarketplaceOffer {
  id: string
  title: string
  description: string
  points: number
  partner: string
  image: string
  category: 'bamboo' | 'organic_clothing' | 'eco_tour' | 'surf_class'
  available: boolean
}

export const mockMarketplace: MarketplaceOffer[] = [
  { id: 'm1', title: 'Set de utensilios de bambú', description: 'Cubiertos y sorbete reutilizables', points: 200, partner: 'EcoStore', image: '/placeholder.jpg', category: 'bamboo', available: true },
  { id: 'm2', title: 'Camiseta de algodón orgánico', description: 'Talla a elección', points: 350, partner: 'EcoTextiles', image: '/placeholder.jpg', category: 'organic_clothing', available: true },
  { id: 'm3', title: 'Tour ecológico en kayak', description: 'Recorrido guiado por zonas protegidas', points: 800, partner: 'AquaAdventures', image: '/placeholder.jpg', category: 'eco_tour', available: true },
  { id: 'm4', title: 'Clase de surf (1h)', description: 'Instructor certificado y equipo incluido', points: 250, partner: 'Surf Peru', image: '/placeholder.jpg', category: 'surf_class', available: true },
]

// Mock impact statistics
export const mockImpactStats = {
  totalVolunteers: 2847,
  trashCollected: 15420, // kg
  beachesRestored: 23,
  eventsCompleted: 156,
  co2Prevented: 8930, // kg
  monthlyGrowth: 23, // percentage
}

// Community activity feed (latest first)
export interface CommunityActivity {
  id: string
  userName: string
  userAvatar: string
  message: string
  timestamp: string // ISO
  type: "join" | "report" | "badge"
}

export const mockCommunityActivities: CommunityActivity[] = [
  {
    id: "act-7",
    userName: "Ana",
    userAvatar: "/abstract-profile.png",
    message: "desbloqueó el badge Guardián del Mar",
    timestamp: new Date().toISOString(),
    type: "badge",
  },
  {
    id: "act-6",
    userName: "Carlos",
    userAvatar: "/abstract-profile.png",
    message: "reportó basura en Playa Barranco",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    type: "report",
  },
  {
    id: "act-5",
    userName: "María",
    userAvatar: "/abstract-profile.png",
    message: "se unió al evento Limpieza Miraflores",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    type: "join",
  },
  {
    id: "act-4",
    userName: "Diego",
    userAvatar: "/abstract-profile.png",
    message: "reportó un derrame en Playa San Miguel",
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    type: "report",
  },
  {
    id: "act-3",
    userName: "Lucía",
    userAvatar: "/abstract-profile.png",
    message: "se unió al evento Restauración de Dunas - Barranco",
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    type: "join",
  },
  {
    id: "act-2",
    userName: "Jorge",
    userAvatar: "/abstract-profile.png",
    message: "desbloqueó el badge Reportero Costero",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: "badge",
  },
  {
    id: "act-1",
    userName: "Valeria",
    userAvatar: "/abstract-profile.png",
    message: "reportó basura en Playa Miraflores",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: "report",
  },
]
