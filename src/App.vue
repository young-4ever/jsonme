<template>
  <div class="min-h-screen transition-colors duration-300" :class="[
    currentThemeName === 'professional' ? '' : 'bg-gray-50 dark:bg-gray-900',
    `theme-${currentThemeName}`,
    { 'dark': isDarkMode }
  ]">
    <!-- Fork me on GitHub 带状链接 -->
    <div class="github-ribbon no-print">
      <a href="https://github.com/young-4ever/jsonme" 
         target="_blank" 
         rel="noopener noreferrer"
         class="github-ribbon-link"
         title="Fork me on GitHub">
        <span class="github-ribbon-text">Fork me on GitHub</span>
      </a>
    </div>

    <!-- 欢迎页面 -->
    <div v-if="showWelcome">
      <WelcomePage @upload="handleUploadFromWelcome" @view-demo="handleViewDemo" />
    </div>

    <!-- 上传页面 -->
    <div v-else-if="showUploader">
      <JsonUploader @back="showUploader = false" />
    </div>

    <!-- 简历展示页面 -->
    <div v-else>
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
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="loadData"
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
              重新加载
            </button>
            <button @click="showUploader = true"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
              上传JSON文件
            </button>
          </div>
        </div>
      </div>

      <!-- 主要内容 -->
      <div v-else-if="resumeData" style="padding-bottom: 12px;" :class="['page-enter',
        currentThemeName === 'professional' ? 'px-4 py-8' : 'container mx-auto px-4 py-8 max-w-4xl'
      ]">
        <!-- 顶部工具栏 -->
        <div class="fixed top-4 right-4 z-50 no-print">
          <div class="flex gap-2">
            <ThemeSelector :current-theme-name="currentThemeName" :is-dark-mode="isDarkMode"
              @theme-change="handleThemeChange" @dark-mode-toggle="toggleDarkMode" />

            <button @click="showUploader = true"
              class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 text-sm"
              title="上传JSON文件">
              📤
            </button>

            <button @click="handlePrint"
              :disabled="isPrintLoading"
              class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              :title="isPrintLoading ? '正在准备打印...' : '打印简历'">
              <span v-if="isPrintLoading" class="animate-spin">⏳</span>
              <span v-else>🖨️</span>
            </button>
          </div>
        </div>

        <!-- 源代码主题：VSCode风格编辑器 -->
        <div v-if="currentThemeName === 'source'" class="vscode-editor mx-4 md:mx-auto max-w-4xl">
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
              <div v-for="(line, index) in jsonLines" :key="index" class="vscode-line-number">
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

          <div class="container mx-auto px-4 py-8 max-w-4xl">
            <!-- 个人信息 - 特殊样式 -->
            <div v-if="creativeOrderedSections.personal" class="section-enter creative-hero">
              <component :is="componentMap[creativeOrderedSections.personal.component]"
                v-bind="creativeOrderedSections.personal.props" />
            </div>

            <!-- 主要内容区域 - 动态布局 -->
            <div class="creative-content-grid">
              <!-- 动态渲染其他组件 -->
              <div v-for="(section, index) in creativeOrderedSections.others" :key="section.key" :class="{
                'creative-left-column': index % 2 === 0,
                'creative-right-column': index % 2 === 1,
                'creative-projects-full': section.key === 'projects'
              }">
                <div :class="{
                  'section-enter creative-section-left': index % 2 === 0,
                  'section-enter creative-section-right': index % 2 === 1,
                  'section-enter creative-projects-full': section.key === 'projects'
                }">
                  <component :is="componentMap[section.component]" v-bind="section.props" />
                </div>
              </div>
            </div>

            <!-- 创意主题页脚 -->
            <footer class="mt-16 text-center no-print creative-footer">
              <div class="creative-footer-content">
                <p
                  class="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  由 <a href="https://github.com/jsonme" class="hover:underline">JsonMe</a> 创意呈现
                </p>
                <div class="creative-footer-decoration"></div>
              </div>
            </footer>
          </div>
        </template>

        <!-- 其他主题：使用标准布局 -->
        <template v-else>
          <!-- 专业主题：使用特殊容器 -->
          <div v-if="currentThemeName === 'professional'" class="container">
            <!-- 动态渲染各个section -->
            <div v-for="section in orderedSections" :key="section.key" class="section-enter">
              <component :is="componentMap[section.component]" v-bind="section.props" />
            </div>

            <!-- 页脚 -->
            <footer class="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm no-print">
              <p>由 <a href="https://github.com/young-4ever/jsonme"
                  class="text-primary-600 dark:text-primary-400 hover:underline">JsonMe</a> 生成</p>
            </footer>
          </div>

          <!-- 其他主题：标准容器 -->
          <div v-else class="container mx-auto px-4 py-8 max-w-4xl">
            <!-- 动态渲染各个section -->
            <div v-for="section in orderedSections" :key="section.key" class="section-enter">
              <component :is="componentMap[section.component]" v-bind="section.props" />
            </div>

            <!-- 页脚 -->
            <footer class="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm no-print">
              <p>由 <a href="https://github.com/young-4ever/jsonme"
                  class="text-primary-600 dark:text-primary-400 hover:underline">JsonMe</a> 生成</p>
            </footer>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, computed } from 'vue'

// 立即阻止浏览器自动恢复滚动位置（在页面加载早期执行）
if (typeof window !== 'undefined') {
  // 阻止浏览器自动恢复滚动位置
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  
  // 立即滚动到顶部
  window.scrollTo(0, 0)
}
import PersonalInfo from '@/components/PersonalInfo.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
import JsonUploader from '@/components/JsonUploader.vue'
import WelcomePage from '@/components/WelcomePage.vue'
import { getThemeByName, getDefaultTheme } from '@/themes'

const resumeData = ref(null)
const isLoading = ref(false)
const error = ref(null)
const isDarkMode = ref(false)
const currentThemeName = ref('minimalist')
const showUploader = ref(false)
const showWelcome = ref(false)
const isPrintLoading = ref(false)

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

// 解密Gist URL
function decryptGistUrl(encrypted) {
  try {
    // 如果是旧格式的URL编码，直接解码
    if (encrypted.includes('http')) {
      return decodeURIComponent(encrypted)
    }
    
    // 1. 移除前缀和后缀（各4位）
    if (encrypted.length <= 8) {
      throw new Error('加密字符串太短')
    }
    const withoutPrefixSuffix = encrypted.slice(4, -4)
    
    // 2. 反转字符串
    const unreversed = withoutPrefixSuffix.split('').reverse().join('')
    
    // 3. 恢复字符替换 (使用循环映射的逆操作)
    const unsubstituted = unreversed
      .replace(/_/g, '/')
      .replace(/-/g, '+')
      .replace(/[A-Z]/g, (char) => {
        const code = char.charCodeAt(0) - 65 // A=0, B=1, ..., Z=25
        const shifted = (code - 1 + 26) % 26 // 循环反向映射
        return String.fromCharCode(shifted + 65)
      })
      .replace(/[a-z]/g, (char) => {
        const code = char.charCodeAt(0) - 97 // a=0, b=1, ..., z=25
        const shifted = (code - 1 + 26) % 26 // 循环反向映射
        return String.fromCharCode(shifted + 97)
      })
    
    // 4. Base64解码
    const decoded = atob(unsubstituted)
    
    return decoded
  } catch (err) {
    console.error('URL解密失败:', err)
    // 降级方案：尝试直接URL解码
    try {
      return decodeURIComponent(encrypted)
    } catch {
      throw new Error('链接解析失败，可能链接已损坏')
    }
  }
}

// 方法
async function loadData() {
  isLoading.value = true
  error.value = null

  try {
    const urlParams = new URLSearchParams(window.location.search)
    let data

    // 检查是否有上传参数，如果有则显示上传页面
    if (urlParams.has('upload')) {
      showUploader.value = true
      isLoading.value = false
      return
    }

    if (urlParams.has('data')) {
      // 从加密的URL参数加载数据
      const encryptedData = urlParams.get('data')
      console.log('Loading from encrypted data')

      try {
        // 首先尝试解密为Gist URL
        const gistUrl = decryptGistUrl(encryptedData)
        
        // 检查是否是有效的Gist URL
        if (gistUrl.includes('gist.githubusercontent.com')) {
          console.log('Loading from decrypted Gist:', gistUrl)
          const response = await fetch(gistUrl)
          if (!response.ok) {
            throw new Error(`Gist加载失败: ${response.status} ${response.statusText}`)
          }
          data = await response.json()
        } else {
          // 降级：按原来的Base64 JSON处理
          console.log('Fallback to Base64 JSON data')
          const encodedString = atob(encryptedData)
          const jsonString = decodeURIComponent(encodedString)
          data = JSON.parse(jsonString)
        }
      } catch (err) {
        console.error('Data decode error:', err)
        throw new Error('数据解码失败，链接可能已损坏')
      }
    } else if (urlParams.has('gist')) {
      // 从Gist URL加载数据
      const gistUrl = decodeURIComponent(urlParams.get('gist'))
      console.log('Loading from Gist:', gistUrl)

      const response = await fetch(gistUrl)
      if (!response.ok) {
        throw new Error(`Gist加载失败: ${response.status} ${response.statusText}`)
      }

      data = await response.json()
    } else if (urlParams.has('url')) {
      // 从外部URL加载数据（用于其他服务）
      const externalUrl = decodeURIComponent(urlParams.get('url'))
      console.log('Loading from external URL:', externalUrl)

      const response = await fetch(externalUrl)
      if (!response.ok) {
        throw new Error(`外部数据加载失败: ${response.status} ${response.statusText}`)
      }

      data = await response.json()
    } else {
      // 尝试加载本地resume.json，如果失败则显示欢迎页面
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}resume.json`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        data = await response.json()
      } catch (err) {
        // 如果没有本地数据，显示欢迎页面而不是错误
        showWelcome.value = true
        isLoading.value = false
        return
      }
    }

    resumeData.value = data

    // 预加载头像图片
    preloadAvatarImage()

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

async function handlePrint() {
  isPrintLoading.value = true
  
  try {
    // 检查并等待所有图片加载完成
    await waitForImagesToLoad()
    
    // 短暂延迟确保渲染完成
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 执行打印
    window.print()
  } catch (error) {
    console.error('打印准备失败:', error)
    // 即使图片加载失败，也继续执行打印
    window.print()
  } finally {
    isPrintLoading.value = false
  }
}

// 等待所有图片加载完成
async function waitForImagesToLoad() {
  return new Promise((resolve, reject) => {
    const images = document.querySelectorAll('img')
    
    if (images.length === 0) {
      resolve()
      return
    }
    
    let loadedCount = 0
    let hasError = false
    const totalImages = images.length
    
    // 设置超时时间（5秒）
    const timeout = setTimeout(() => {
      console.warn('图片加载超时，继续执行打印')
      resolve()
    }, 5000)
    
    const checkComplete = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        clearTimeout(timeout)
        resolve()
      }
    }
    
    const handleError = (img) => {
      console.warn('图片加载失败:', img.src)
      hasError = true
      checkComplete()
    }
    
    images.forEach((img) => {
      // 如果图片已经加载完成
      if (img.complete) {
        if (img.naturalWidth === 0) {
          // 图片加载失败
          handleError(img)
        } else {
          // 图片加载成功
          checkComplete()
        }
      } else {
        // 图片还在加载中，添加事件监听器
        const onLoad = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          checkComplete()
        }
        
        const onError = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          handleError(img)
        }
        
        img.addEventListener('load', onLoad)
        img.addEventListener('error', onError)
      }
    })
  })
}

// 预加载头像图片
function preloadAvatarImage() {
  if (resumeData.value?.personal?.avatar) {
    const img = new Image()
    img.src = resumeData.value.personal.avatar
    img.onload = () => {
      console.log('头像预加载成功')
    }
    img.onerror = () => {
      console.warn('头像预加载失败:', img.src)
    }
  }
}

// 页面可见性变化处理
function handleVisibilityChange() {
  // 移除自动滚动到顶部，避免干扰用户操作
  // 特别是打印对话框关闭时的体验
}

// 添加处理欢迎页面事件的方法
function handleUploadFromWelcome() {
  showWelcome.value = false
  showUploader.value = true
}

function handleViewDemo() {
  showWelcome.value = false
  // 加载默认数据
  loadData()
}

onMounted(async () => {
  // 阻止浏览器自动恢复滚动位置
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  
  // 强制页面滚动到顶部
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

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

<style>
</style>