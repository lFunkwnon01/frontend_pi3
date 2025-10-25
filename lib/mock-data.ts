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
  type: "trash" | "pollution" | "clean"
  description: string
  image: string
  location: {
    lat: number
    lng: number
  }
  timestamp: string
  status: "pending" | "verified" | "rejected"
  points: number
  verifierComment?: string
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
  category: "discount" | "badge" | "experience"
  partner: string
  image: string
  available: boolean
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
    type: "pollution",
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
    type: "clean",
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
  social_links?: { twitter?: string; instagram?: string; web?: string }
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
    social_links: { instagram: "@surfchorrillos" },
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
    social_links: { web: "https://reciclaya.example" },
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
  },
  {
    id: "a-5",
    nombre: "Escuela de Surf Barranco",
    distrito: "Barranco",
  logo_url: "/lima-food-boat-2-logo.png",
  banner_url: "/surf-barranco-banner.jpg",
    descripcion: "Clases y camps de verano para jóvenes y adultos.",
    actividades: ["Clases de surf", "Alquiler de equipos"],
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
