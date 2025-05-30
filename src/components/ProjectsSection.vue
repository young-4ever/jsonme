<template>
  <section class="mb-8">
    <h2 class="section-title">项目经历</h2>
    
    <!-- 科技主题的JSON显示 -->
    <div v-if="isTechTheme" class="space-y-6">
      <JsonCard
        v-for="project in sortedProjects"
        :key="project.id"
        :data="project"
        :title="`project_${project.id}`"
      />
    </div>
    
    <!-- 源代码主题的直接显示 -->
    <div v-else-if="isSourceTheme" class="space-y-4">
      <SourceCodeDisplay
        v-for="project in sortedProjects"
        :key="project.id"
        :data="project"
        :title="`project_${project.id}`"
      />
    </div>
    
    <!-- 其他主题的常规显示 -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 projects-grid">
      <div
        v-for="project in sortedProjects"
        :key="project.id"
        class="card print-avoid-break hover:shadow-md transition-shadow duration-200"
      >
        <!-- 项目图片 -->
        <div v-if="project.image" class="mb-4">
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full h-48 object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        
        <!-- 项目标题和时间 -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {{ project.name }}
          </h3>
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            📅 <span class="ml-1">{{ getDateRange(project.startDate, project.endDate, project.current) }}</span>
          </div>
        </div>
        
        <!-- 项目描述 -->
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{ project.description }}
        </p>
        
        <!-- 项目亮点 -->
        <div v-if="project.highlights && project.highlights.length > 0" class="mb-4">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">项目亮点：</h5>
          <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li v-for="highlight in project.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
        </div>
        
        <!-- 技术栈 -->
        <div v-if="project.technologies && project.technologies.length > 0" class="mb-4">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">技术栈：</h5>
          <div class="flex flex-wrap">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <!-- 项目链接 -->
        <div class="flex flex-wrap gap-3">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            🔗 在线预览
          </a>
          
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            📂 源码
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Project } from '@/types/resume'
import JsonCard from './JsonCard.vue'
import SourceCodeDisplay from './SourceCodeDisplay.vue'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

// 获取当前主题
const currentThemeName = inject<string>('currentThemeName', 'professional')

const isTechTheme = computed(() => {
  return currentThemeName === 'tech'
})

const isSourceTheme = computed(() => {
  return currentThemeName === 'source'
})

const sortedProjects = computed(() => {
  return [...props.projects].sort((a, b) => {
    // 当前项目排在前面
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    
    // 按开始日期降序排列
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit'
  })
}

function getDateRange(startDate: string, endDate?: string, current?: boolean) {
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
</script> 