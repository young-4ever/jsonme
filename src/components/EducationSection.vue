<template>
  <section class="mb-8">
    <h2 class="section-title">教育背景</h2>
    
    <!-- 科技主题的JSON显示 -->
    <div v-if="isTechTheme" class="space-y-6">
      <JsonCard
        v-for="edu in education"
        :key="edu.id"
        :data="edu"
        :title="`education_${edu.id}`"
      />
    </div>
    
    <!-- 源代码主题的直接显示 -->
    <div v-else-if="isSourceTheme" class="space-y-4">
      <SourceCodeDisplay
        v-for="edu in education"
        :key="edu.id"
        :data="edu"
        :title="`education_${edu.id}`"
      />
    </div>
    
    <!-- 其他主题的常规显示 -->
    <div v-else class="space-y-4">
      <div
        v-for="edu in education"
        :key="edu.id"
        class="card print-avoid-break transition-shadow duration-200"
      >
        <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {{ edu.school }}
            </h3>
            <h4 class="text-lg text-primary-600 dark:text-primary-400 mb-1">
              {{ edu.degree }} · {{ edu.major }}
            </h4>
            <p v-if="edu.gpa" class="text-sm text-gray-600 dark:text-gray-400 w-fit">
              GPA: {{ edu.gpa }}
            </p>
          </div>
          
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
            📅 <span class="ml-1">{{ getDateRange(edu.startDate, edu.endDate) }}</span>
          </div>
        </div>
        
        <p v-if="edu.description" class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ edu.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Education } from '@/types/resume'
import JsonCard from './JsonCard.vue'
import SourceCodeDisplay from './SourceCodeDisplay.vue'

interface Props {
  education: Education[]
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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit'
  })
}

function getDateRange(startDate: string, endDate?: string) {
  const start = formatDate(startDate)
  
  if (endDate) {
    const end = formatDate(endDate)
    return `${start} - ${end}`
  }
  
  return start
}
</script> 