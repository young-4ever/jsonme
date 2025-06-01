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
  displayName: string
  description: string
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
}

// 简约主题
const minimalistTheme: Theme = {
  name: 'minimalist',
  displayName: '简约',
  description: '简洁清爽的设计风格',
  colors: {
    light: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b'
    },
    dark: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      accent: '#22d3ee',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8'
    }
  }
}

// 专业主题
const professionalTheme: Theme = {
  name: 'professional',
  displayName: '专业',
  description: '商务专业的设计风格',
  colors: {
    light: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#059669',
      background: '#e8e6e0',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280'
    },
    dark: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
      accent: '#10b981',
      background: '#0f0f0f',
      surface: '#2a2a2a',
      text: '#f9fafb',
      textSecondary: '#d1d5db'
    }
  }
}

// 创意主题
const creativeTheme: Theme = {
  name: 'creative',
  displayName: '创意',
  description: '富有创意的蓝色系设计风格',
  colors: {
    light: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#eff6ff',
      text: '#1f2937',
      textSecondary: '#6b7280'
    },
    dark: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#22d3ee',
      background: '#0f172a',
      surface: '#1e3a8a',
      text: '#f3f4f6',
      textSecondary: '#d1d5db'
    }
  }
}

// 科技主题
const techTheme: Theme = {
  name: 'tech',
  displayName: '科技',
  description: '现代科技感设计风格',
  colors: {
    light: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#111827',
      surface: '#1f2937',
      text: '#ffffff',
      textSecondary: '#d1d5db'
    },
    dark: {
      primary: '#38bdf8',
      secondary: '#94a3b8',
      accent: '#22d3ee',
      background: '#020617',
      surface: '#0f172a',
      text: '#ffffff',
      textSecondary: '#e5e7eb'
    }
  }
}

// 源代码主题
const sourceCodeTheme: Theme = {
  name: 'source',
  displayName: '源代码',
  description: '直接展示JSON数据格式',
  colors: {
    light: {
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#dc2626',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280'
    },
    dark: {
      primary: '#10b981',
      secondary: '#9ca3af',
      accent: '#ef4444',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db'
    }
  }
}

export const themes: Theme[] = [
  minimalistTheme,
  professionalTheme,
  creativeTheme,
  techTheme,
  sourceCodeTheme
]

export const getThemeByName = (name: string): Theme | undefined => {
  return themes.find(theme => theme.name === name)
}

export const getDefaultTheme = (): Theme => {
  return minimalistTheme
} 