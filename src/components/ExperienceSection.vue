<template>
  <section class="mb-8">
    <h2 class="section-title">工作经历</h2>
    
    <!-- 科技主题的JSON显示 -->
    <div v-if="isTechTheme" class="space-y-6">
      <JsonCard
        v-for="exp in sortedExperience"
        :key="exp.id"
        :data="exp"
        :title="`experience_${exp.id}`"
      />
    </div>
    
    <!-- 源代码主题的直接显示 -->
    <div v-else-if="isSourceTheme" class="space-y-4">
      <SourceCodeDisplay
        v-for="exp in sortedExperience"
        :key="exp.id"
        :data="exp"
        :title="`experience_${exp.id}`"
      />
    </div>
    
    <!-- 其他主题的常规显示 -->
    <div v-else class="space-y-6">
      <div
        v-for="exp in sortedExperience"
        :key="exp.id"
        class="card print-avoid-break hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {{ exp.position }}
            </h3>
            <h4 class="text-lg text-primary-600 dark:text-primary-400 mb-2">
              {{ exp.company }}
            </h4>
          </div>
          
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            📅 <span class="ml-1">{{ getDateRange(exp.startDate, exp.endDate, exp.current) }}</span>
          </div>
        </div>
        
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{ exp.description }}
        </p>
        
        <!-- 主要成就 -->
        <div v-if="exp.achievements && exp.achievements.length > 0" class="mb-4">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">主要成就：</h5>
          <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li v-for="achievement in exp.achievements" :key="achievement">
              {{ achievement }}
            </li>
          </ul>
        </div>
        
        <!-- 技术栈 -->
        <div v-if="exp.technologies && exp.technologies.length > 0">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">技术栈：</h5>
          <div class="flex flex-wrap">
            <span
              v-for="tech in exp.technologies"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Experience } from '@/types/resume'
import JsonCard from './JsonCard.vue'
import SourceCodeDisplay from './SourceCodeDisplay.vue'

interface Props {
  experience: Experience[]
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

const sortedExperience = computed(() => {
  return [...props.experience].sort((a, b) => {
    // 当前工作排在前面
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