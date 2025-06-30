<template>
  <section class="mb-8">
    <h2 class="section-title">技能专长</h2>
    
    <!-- 科技主题的JSON显示 -->
    <div v-if="isTechTheme" class="space-y-6">
      <JsonCard :data="skillsByCategory" title="skills" />
    </div>
    
    <!-- 源代码主题的直接显示 -->
    <div v-else-if="isSourceTheme">
      <SourceCodeDisplay :data="skillsByCategory" title="skills" />
    </div>
    
    <!-- 其他主题的常规显示 -->
    <div v-else class="skills-list">
      <div
        v-for="(skills, category) in skillsByCategory"
        :key="category"
        class="skill-category"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 skill-category-title">
          {{ category }}
        </h3>
        
        <div class="space-y-3">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="skill-item"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-700 dark:text-gray-300 skill-item-name">
                {{ skill.name }}
              </span>
              <span class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed skill-item-level">
                {{ getSkillDescription(skill.level) }}
              </span>
            </div>
            
            <div class="skill-bar mb-3">
              <div
                class="skill-progress"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
            
            <!-- 技能描述 -->
            <div v-if="skill.description">
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ skill.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Skill } from '@/types/resume'
import JsonCard from './JsonCard.vue'
import SourceCodeDisplay from './SourceCodeDisplay.vue'

interface Props {
  skills: Skill[]
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

const skillsByCategory = computed(() => {
  return props.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
})

// 将技能等级转换为描述
function getSkillDescription(level: number): string {
  if (level <= 50) {
    return '了解'
  } else if (level > 50 && level < 70) {
    return '掌握'
  } else if (level >= 70 && level < 90) {
    return '熟悉'
  } else {
    return '精通'
  }
}
</script> 