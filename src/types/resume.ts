export interface ContactInfo {
  email?: string
  phone?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
}

export interface PersonalInfo {
  name: string
  title: string
  avatar?: string
  contact: ContactInfo
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current?: boolean
  description: string
  achievements?: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  level: number // 1-100
  category: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  current?: boolean
  url?: string
  github?: string
  image?: string
  highlights?: string[]
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

export interface Theme {
  name: string
  colors: ThemeColors
  isDark?: boolean
}

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  theme: Theme
}

export interface ResumeConfig {
  data: ResumeData
  settings: {
    showAvatar: boolean
    showContact: boolean
    showSummary: boolean
    sectionsOrder: string[]
    printOptimized: boolean
  }
} 