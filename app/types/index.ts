export interface School {
  id: number
  name: string
  slug: string
  logo: string
  description: string
  heroImage: string
  address: string
  phone: string
  whatsapp: string
  email: string
  mapLat: number
  mapLng: number
  languages: Language[]
}

export interface Language {
  id: number
  name: string
  icon: string
  logo: string
  teachers: Teacher[]
}

export interface Teacher {
  id: number
  name: string
  photo: string
  bio: string
  experience_years: number
  languages: TeacherLanguage[]
  videos: Video[]
  albums: Album[]
}

export interface TeacherLanguage {
  language_name: string
  level: string
}

export interface Video {
  id: number
  title: string
  thumbnail: string
  url: string
}

export interface Album {
  id: number
  title: string
  cover: string
  year: string
  photos: Photo[]
}

export interface Photo {
  id: number
  url: string
  caption?: string
}

export interface Testimonial {
  id: number
  name: string
  photo: string
  rating: number
  message: string
}

export interface Partner {
  id: number
  name: string
  logo: string
}

export interface Job {
  id: number
  title: string
  description: string
  requirements?: string
  location?: string
  type?: string
  created_at: string
}

export interface RegistrationData {
  full_name: string
  phone: string
  notes?: string
  school_id: number
  language_id: number
  teacher_id: number
}

export interface JobApplication {
  first_name: string
  last_name: string
  phone: string
  email: string
  cv: File | null
  notes?: string
  job_id: number
}
