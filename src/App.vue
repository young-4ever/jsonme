<template>
  <div class="min-h-screen transition-colors duration-300" :class="[
    currentThemeName === 'professional' ? '' : 'bg-gray-50 dark:bg-gray-900',
    `theme-${currentThemeName}`,
    { 'dark': isDarkMode }
  ]">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">加载简历数据中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">加载失败</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="loadData"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          重新加载
        </button>
      </div>
    </div>

    <!-- 主要内容 -->
    <div v-else-if="resumeData" class="page-enter" :class="[
      currentThemeName === 'professional' ? '' : 'container mx-auto px-4 py-8 max-w-4xl'
    ]">
      <!-- 顶部工具栏 -->
      <div class="fixed top-4 right-4 z-50 no-print">
        <div class="flex gap-2">
          <ThemeSelector
            :current-theme-name="currentThemeName"
            :is-dark-mode="isDarkMode"
            @theme-change="handleThemeChange"
            @dark-mode-toggle="toggleDarkMode"
          />
          
          <button
            @click="handlePrint"
            class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            title="打印简历"
          >
            🖨️
          </button>
        </div>
      </div>

      <!-- 源代码主题：VSCode风格编辑器 -->
      <div v-if="currentThemeName === 'source'" class="vscode-editor">
        <!-- VSCode标题栏 -->
        <div class="vscode-titlebar">
          <div class="vscode-traffic-lights">
            <div class="vscode-light red"></div>
            <div class="vscode-light yellow"></div>
            <div class="vscode-light green"></div>
          </div>
          <div class="vscode-title">resume.json</div>
        </div>
        
        <!-- VSCode编辑器内容 -->
        <div class="vscode-editor-content">
          <div class="vscode-line-numbers">
            <div 
              v-for="(line, index) in jsonLines" 
              :key="index" 
              class="vscode-line-number"
            >
              {{ index + 1 }}
            </div>
          </div>
          <div class="vscode-code-content">
            <pre class="vscode-code"><code v-html="highlightedJsonWithLines"></code></pre>
          </div>
        </div>
      </div>

      <!-- 创意主题：特殊布局 -->
      <template v-else-if="currentThemeName === 'creative'">
        <!-- 创意主题背景装饰 -->
        <div class="creative-decorations">
          <div class="creative-circle creative-circle-1"></div>
          <div class="creative-circle creative-circle-2"></div>
          <div class="creative-circle creative-circle-3"></div>
        </div>

        <!-- 个人信息 - 特殊样式 -->
        <div v-if="creativeOrderedSections.personal" class="section-enter creative-hero">
          <component
            :is="componentMap[creativeOrderedSections.personal.component]"
            v-bind="creativeOrderedSections.personal.props"
          />
        </div>

        <!-- 主要内容区域 - 动态布局 -->
        <div class="creative-content-grid">
          <!-- 动态渲染其他组件 -->
          <div
            v-for="(section, index) in creativeOrderedSections.others"
            :key="section.key"
            :class="{
              'creative-left-column': index % 2 === 0,
              'creative-right-column': index % 2 === 1,
              'creative-projects-full': section.key === 'projects'
            }"
          >
            <div
              :class="{
                'section-enter creative-section-left': index % 2 === 0,
                'section-enter creative-section-right': index % 2 === 1,
                'section-enter creative-projects-full': section.key === 'projects'
              }"
            >
              <component
                :is="componentMap[section.component]"
                v-bind="section.props"
              />
            </div>
          </div>
        </div>

        <!-- 创意主题页脚 -->
        <footer class="mt-16 text-center no-print creative-footer">
          <div class="creative-footer-content">
            <p class="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              由 <a href="https://github.com/jsonme" class="hover:underline">JsonMe</a> 创意呈现
            </p>
            <div class="creative-footer-decoration"></div>
          </div>
        </footer>
      </template>

      <!-- 其他主题：使用标准布局 -->
      <template v-else>
        <!-- 专业主题：使用特殊容器 -->
        <div v-if="currentThemeName === 'professional'" class="container">
          <!-- 动态渲染各个section -->
          <div
            v-for="section in orderedSections"
            :key="section.key"
            class="section-enter"
          >
            <component
              :is="componentMap[section.component]"
              v-bind="section.props"
          />
        </div>

          <!-- 页脚 -->
          <footer class="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm no-print">
            <p>由 <a href="https://github.com/jsonme" class="text-primary-600 dark:text-primary-400 hover:underline">JsonMe</a> 生成</p>
          </footer>
        </div>

        <!-- 其他主题：标准容器 -->
        <div v-else class="container mx-auto px-4 py-8 max-w-4xl">
          <!-- 动态渲染各个section -->
          <div
            v-for="section in orderedSections"
            :key="section.key"
            class="section-enter"
          >
            <component
              :is="componentMap[section.component]"
              v-bind="section.props"
          />
        </div>

        <!-- 页脚 -->
        <footer class="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm no-print">
          <p>由 <a href="https://github.com/jsonme" class="text-primary-600 dark:text-primary-400 hover:underline">JsonMe</a> 生成</p>
        </footer>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, computed } from 'vue'
import PersonalInfo from '@/components/PersonalInfo.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
import { getThemeByName, getDefaultTheme } from '@/themes'

const resumeData = ref(null)
const isLoading = ref(false)
const error = ref(null)
const isDarkMode = ref(false)
const currentThemeName = ref('minimalist')

// 提供主题名称给子组件
provide('currentThemeName', currentThemeName)

// 动态组件排序逻辑
const orderedSections = computed(() => {
  if (!resumeData.value) return []
  
  const sections = []
  const data = resumeData.value
  
  // 获取JSON中字段的顺序（除了theme字段）
  const fieldsOrder = Object.keys(data).filter(key => key !== 'theme')
  
  fieldsOrder.forEach(field => {
    switch (field) {
      case 'personal':
        sections.push({
          key: 'personal',
          component: 'PersonalInfo',
          props: { personal: data.personal },
          condition: true
        })
        break
      case 'experience':
        sections.push({
          key: 'experience',
          component: 'ExperienceSection',
          props: { experience: data.experience },
          condition: data.experience && data.experience.length > 0
        })
        break
      case 'skills':
        sections.push({
          key: 'skills',
          component: 'SkillsSection',
          props: { skills: data.skills },
          condition: data.skills && data.skills.length > 0
        })
        break
      case 'projects':
        sections.push({
          key: 'projects',
          component: 'ProjectsSection',
          props: { projects: data.projects },
          condition: data.projects && data.projects.length > 0
        })
        break
      case 'education':
        sections.push({
          key: 'education',
          component: 'EducationSection',
          props: { education: data.education },
          condition: data.education && data.education.length > 0
        })
        break
    }
  })
  
  // 只返回满足条件的sections
  return sections.filter(section => section.condition)
})

// 组件映射
const componentMap = {
  PersonalInfo,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  EducationSection
}

// 创意主题的动态排序逻辑
const creativeOrderedSections = computed(() => {
  if (!resumeData.value) return { personal: null, others: [] }
  
  const data = resumeData.value
  const fieldsOrder = Object.keys(data).filter(key => key !== 'theme')
  
  let personal = null
  const others = []
  
  fieldsOrder.forEach(field => {
    switch (field) {
      case 'personal':
        personal = {
          key: 'personal',
          component: 'PersonalInfo',
          props: { personal: data.personal }
        }
        break
      case 'experience':
        if (data.experience && data.experience.length > 0) {
          others.push({
            key: 'experience',
            component: 'ExperienceSection',
            props: { experience: data.experience }
          })
        }
        break
      case 'skills':
        if (data.skills && data.skills.length > 0) {
          others.push({
            key: 'skills',
            component: 'SkillsSection',
            props: { skills: data.skills }
          })
        }
        break
      case 'projects':
        if (data.projects && data.projects.length > 0) {
          others.push({
            key: 'projects',
            component: 'ProjectsSection',
            props: { projects: data.projects }
          })
        }
        break
      case 'education':
        if (data.education && data.education.length > 0) {
          others.push({
            key: 'education',
            component: 'EducationSection',
            props: { education: data.education }
          })
        }
        break
    }
  })
  
  return { personal, others }
})

// 源代码主题的JSON处理
const jsonLines = computed(() => {
  if (!resumeData.value) return []
  const jsonString = JSON.stringify(resumeData.value, null, 2)
  return jsonString.split('\n')
})

const highlightedJsonText = computed(() => {
  if (!resumeData.value) return ''
  
  const jsonString = JSON.stringify(resumeData.value, null, 2)
  
  return jsonString
    // 高亮键名
    .replace(/(".*?")(\s*:\s*)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
    // 高亮字符串值
    .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
    // 高亮数字
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    // 高亮布尔值
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
    // 高亮null
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
    // 高亮标点符号
    .replace(/([{}[\],])/g, '<span class="json-punctuation">$1</span>')
})

const highlightedJsonWithLines = computed(() => {
  if (!resumeData.value) return ''
  
  const jsonString = JSON.stringify(resumeData.value, null, 2)
  const lines = jsonString.split('\n')
  
  const highlightedLines = lines.map(line => {
    return line
      // 高亮键名
      .replace(/(".*?")(\s*:\s*)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
      // 高亮字符串值
      .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
      // 高亮数字
      .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      // 高亮布尔值
      .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
      // 高亮null
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
      // 高亮标点符号
      .replace(/([{}[\],])/g, '<span class="json-punctuation">$1</span>')
  })
  
  return highlightedLines.join('\n')
})

// 方法
async function loadData() {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}resume.json`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    resumeData.value = data
    
    // 初始化主题模式
    initializeTheme(data.theme)
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载简历数据失败'
    console.error('Failed to load resume data:', err)
  } finally {
    isLoading.value = false
  }
}

function initializeTheme(themeConfig) {
  // 初始化主题名称
  const savedThemeName = localStorage.getItem('jsonme-theme-name')
  if (savedThemeName) {
    currentThemeName.value = savedThemeName
  } else if (themeConfig?.name) {
    currentThemeName.value = themeConfig.name
  }
  
  // 深色模式优先级：
  // 1. 用户手动设置 (localStorage)
  // 2. JSON配置文件设置
  // 3. 系统自动检测
  const savedDarkMode = sessionStorage.getItem('jsonme-dark-mode')
  if (savedDarkMode !== null) {
    // 使用用户手动设置
    isDarkMode.value = savedDarkMode === 'true'
  } else if (themeConfig?.isDark !== undefined) {
    // 使用JSON配置中的设置
    isDarkMode.value = themeConfig.isDark
  } else {
    // 自动检测系统深色模式偏好
    isDarkMode.value = detectSystemDarkMode()
  }
  
  // 应用主题到DOM
  applyTheme()
  
  // 监听系统主题变化
  setupSystemThemeListener()
}

function detectSystemDarkMode() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

function setupSystemThemeListener() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 监听系统主题变化
    const handleSystemThemeChange = (e) => {
      // 检查是否有手动设置的主题
      const savedTheme = sessionStorage.getItem('jsonme-dark-mode')
      if (savedTheme === null) {
        // 没有手动设置时，自动跟随系统
        isDarkMode.value = e.matches
        applyTheme()
      }
      // 如果有手动设置，则不自动跟随系统变化
    }
    
    // 添加监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleSystemThemeChange)
    }
    
    // 在组件卸载时清理监听器
    onUnmounted(() => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      } else {
        mediaQuery.removeListener(handleSystemThemeChange)
      }
    })
  }
}

function toggleDarkMode() {
  // 简化逻辑：直接切换模式并保存到localStorage
  // 页面刷新后会自动重置为自动检测
  isDarkMode.value = !isDarkMode.value
  
  // 保存当前手动设置（页面刷新后会被清除）
  sessionStorage.setItem('jsonme-dark-mode', isDarkMode.value.toString())
  
  applyTheme()
}

function handleThemeChange(themeName) {
  currentThemeName.value = themeName
  
  // 保存主题偏好到localStorage
  localStorage.setItem('jsonme-theme-name', themeName)
  
  applyTheme()
}

function applyTheme() {
  const html = document.documentElement
  
  if (isDarkMode.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  
  // 获取当前主题
  const currentTheme = getThemeByName(currentThemeName.value) || getDefaultTheme()
  const colors = isDarkMode.value ? currentTheme.colors.dark : currentTheme.colors.light
  
  // 应用主题颜色变量
  const root = document.documentElement
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-secondary', colors.secondary)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-background', colors.background)
  root.style.setProperty('--color-surface', colors.surface)
  root.style.setProperty('--color-text', colors.text)
  root.style.setProperty('--color-text-secondary', colors.textSecondary)
}

function handlePrint() {
  window.print()
}

// 页面可见性变化处理
function handleVisibilityChange() {
  // 移除自动滚动到顶部，避免干扰用户操作
  // 特别是打印对话框关闭时的体验
}

onMounted(async () => {
  // 加载数据
  await loadData()
  
  // 监听页面可见性变化
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  // 清理事件监听器
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script> 