<template>
  <div class="relative">
    <!-- 主题选择按钮 -->
    <button
      @click="toggleDropdown"
      class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
      :title="currentTheme ? `当前主题: ${currentTheme.displayName}` : '选择主题'"
    >
      🎨
    </button>

    <!-- 主题选择下拉菜单 -->
    <div
      v-if="showDropdown"
      class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
      @click.stop
    >
      <div class="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm">选择主题</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">选择您喜欢的视觉风格</p>
      </div>

      <div class="p-2 max-h-80 overflow-y-auto">
        <div
          v-for="theme in themes"
          :key="theme.name"
          @click="selectTheme(theme.name)"
          class="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          :class="{
            'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700': currentTheme?.name === theme.name
          }"
        >
          <!-- 主题颜色预览 -->
          <div class="flex-shrink-0 mr-3">
            <div class="flex space-x-1">
              <div
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: isDarkMode ? theme.colors.dark.primary : theme.colors.light.primary }"
              ></div>
              <div
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent }"
              ></div>
            </div>
          </div>

          <!-- 主题信息 -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900 dark:text-white text-sm">
                {{ theme.displayName }}
              </h4>
              <div
                v-if="currentTheme?.name === theme.name"
                class="text-primary-600 dark:text-primary-400"
              >
                ✓
              </div>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {{ theme.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 深色模式切换 -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white text-sm">深色模式</h4>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {{ themeStatusText }}
            </p>
          </div>
          <button
            @click="toggleDarkMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
            :class="isDarkMode ? 'bg-primary-600' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- 点击外部关闭下拉菜单 -->
    <div
      v-if="showDropdown"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { themes, getThemeByName, getDefaultTheme } from '@/themes'

interface Props {
  currentThemeName?: string
  isDarkMode: boolean
}

interface Emits {
  (e: 'theme-change', themeName: string): void
  (e: 'dark-mode-toggle'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showDropdown = ref(false)
const themeStatusKey = ref(0) // 用于强制更新状态文本

const currentTheme = computed(() => {
  if (props.currentThemeName) {
    return getThemeByName(props.currentThemeName) || getDefaultTheme()
  }
  return getDefaultTheme()
})

const themeStatusText = computed(() => {
  // 使用 themeStatusKey 来强制重新计算
  themeStatusKey.value
  return getThemeStatusText()
})

// 监听深色模式变化，更新状态文本
watch(() => props.isDarkMode, () => {
  themeStatusKey.value++
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown() {
  showDropdown.value = false
}

function selectTheme(themeName: string) {
  emit('theme-change', themeName)
  closeDropdown()
}

function toggleDarkMode() {
  emit('dark-mode-toggle')
  // 强制更新状态文本
  setTimeout(() => {
    themeStatusKey.value++
  }, 50)
}

function getThemeStatusText() {
  const savedTheme = sessionStorage.getItem('jsonme-dark-mode')
  const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === null) {
    return `自动检测 (${isSystemDark ? '深色' : '浅色'})`
  } else {
    return `手动模式 (关闭标签页重置)`
  }
}

// 键盘事件处理
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && showDropdown.value) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script> 