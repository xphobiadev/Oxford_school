export type LocalizedField = {
  en: string;
  fr: string | null;
  ar: string | null;
}

export type LocalizedMeta = {
  gender: string | null;
  nationality: string | null;
  city: string | null;
}

export type LocalizedTeacherMeta = {
  experience_years: number | null;
  bio: string | null;
  education: string | null;
  certifications: string[];
}

export interface MainSchoolInfo {
  id: number;
  name: LocalizedField;
  address: LocalizedField;
  short_description: LocalizedField;
  email: string | null;
  primary_phone: string | null;
  secondary_phone: string | null;
  logo: string | null;
}

export interface BaseLanguage {
  id: number;
  code: string;
  name: LocalizedField;
}

export interface Language extends BaseLanguage {
  logo: string | null;
  teachers?: Teacher[]; // Populated frontend side potentially
}

export interface School {
  id: number;
  name: LocalizedField;
  address: LocalizedField;
  short_description: LocalizedField;
  email: string | null;
  primary_phone: string | null;
  secondary_phone: string | null;
  logo: string | null;
  language_ids: number[];
  languages: Language[];
  
  // Custom frontend fields not in base API
  slug?: string;
  heroImage?: string; 
  mapLat?: number;
  mapLng?: number;
}

export interface Testimonial {
  id: number;
  content: LocalizedField;
  author: LocalizedField;
  website: string | null;
  order: number;
  photo: string | null;
}

export interface Partner {
  id: number;
  name: LocalizedField;
  website: string | null;
  order: number;
  logo: string | null;
}

export interface PageContent {
  id: number;
  type: string;
  title: LocalizedField;
  content: LocalizedField;
}

export interface Social {
  id: number;
  name: LocalizedField;
  url: string;
  order: number;
  icon: string | null;
}

export interface Job {
  id: number;
  title: LocalizedField;
  description: LocalizedField;
  school_id: number;
  created_at: string;
}

export interface Media {
  id: number;
  url: string;
  mime_type: string;
}

export interface Gallery {
  id: number;
  title: LocalizedField;
  activity_date: string;
  media: Media[];
}

export interface Teacher {
  id: number;
  first_name: LocalizedField;
  last_name: LocalizedField;
  meta: {
    en: LocalizedTeacherMeta;
    fr: LocalizedTeacherMeta;
    ar: LocalizedTeacherMeta;
  };
  galleries: Gallery[];

  // Frontend helper arrays
  mappedLanguages?: { language_name: string; level: string }[];
}

export interface Certificate {
  id: number;
  ref_no: string;
  description: LocalizedField;
  level: string; // "A1 | A2 | B1 | B2 | C1 | C2"
  issued_at: string;
  holder_label: string | null;
}

export interface Schedule {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room_name: string | null;
}

export interface Exam {
  id: number;
  title: LocalizedField;
  score: string | null;
  exam_date: string;
  exam_file: string | null;
}

export interface Student {
  id: number;
  ref_no: string;
  first_name: LocalizedField;
  last_name: LocalizedField;
  email: string | null;
  phone: string | null;
  birthdate: string;
  meta: {
    en: LocalizedMeta;
    fr: LocalizedMeta;
    ar: LocalizedMeta;
  };
  schedules: Schedule[];
  exams: Exam[];
}

export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: string;
  school_id: number;
  language_id: number;
  teacher_id: number;
}

export interface JobApplication {
  full_name: string;
  description?: string;
  email: string;
  phone: string;
  cv: File | null;
  cover_letter?: string;
  job_id: number;
}
