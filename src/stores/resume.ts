import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ResumeData, Theme } from '@/types/resume'

export const useResumeStore = defineStore('resume', () => {
  const resumeData = ref<ResumeData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isDarkMode = ref(false)

  // 计算属性
  const currentTheme = computed(() => {
    if (!resumeData.value) return null
    return {
      ...resumeData.value.theme,
      isDark: isDarkMode.value
    }
  })

  const skillsByCategory = computed(() => {
    if (!resumeData.value) return {}
    
    return resumeData.value.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, typeof resumeData.value.skills>)
  })

  const sortedExperience = computed(() => {
    if (!resumeData.value) return []
    
    return [...resumeData.value.experience].sort((a, b) => {
      // 当前工作排在前面
      if (a.current && !b.current) return -1
      if (!a.current && b.current) return 1
      
      // 按开始日期降序排列
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  })

  const sortedProjects = computed(() => {
    if (!resumeData.value) return []
    
    return [...resumeData.value.projects].sort((a, b) => {
      // 当前项目排在前面
      if (a.current && !b.current) return -1
      if (!a.current && b.current) return 1
      
      // 按开始日期降序排列
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  })

  // 方法
  async function loadResumeData(url: string = '/resume.json') {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      resumeData.value = data
      
      // 设置主题模式
      if (data.theme?.isDark !== undefined) {
        isDarkMode.value = data.theme.isDark
      }
      
      // 应用主题到DOM
      applyTheme()
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载简历数据失败'
      console.error('Failed to load resume data:', err)
    } finally {
      isLoading.value = false
    }
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
  }

  function applyTheme() {
    const html = document.documentElement
    
    if (isDarkMode.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    // 应用自定义颜色变量
    if (currentTheme.value?.colors) {
      const colors = currentTheme.value.colors
      const root = document.documentElement
      
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-secondary', colors.secondary)
      root.style.setProperty('--color-accent', colors.accent)
      root.style.setProperty('--color-background', colors.background)
      root.style.setProperty('--color-surface', colors.surface)
      root.style.setProperty('--color-text', colors.text)
      root.style.setProperty('--color-text-secondary', colors.textSecondary)
    }
  }

  function updatePersonalInfo(info: Partial<ResumeData['personal']>) {
    if (resumeData.value) {
      resumeData.value.personal = { ...resumeData.value.personal, ...info }
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit'
    })
  }

  function getDateRange(startDate: string, endDate?: string, current?: boolean): string {
    const start = formatDate(startDate)
    
    if (current) {
      return `${start} - 至今`
    }
    
    if (endDate) {
      const end = formatDate(endDate)
      return `${start} - ${end}`
    }
    
    return start
  }

  return {
    // 状态
    resumeData,
    isLoading,
    error,
    isDarkMode,
    
    // 计算属性
    currentTheme,
    skillsByCategory,
    sortedExperience,
    sortedProjects,
    
    // 方法
    loadResumeData,
    toggleDarkMode,
    applyTheme,
    updatePersonalInfo,
    formatDate,
    getDateRange
  }
}) 