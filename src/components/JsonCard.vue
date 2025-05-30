<template>
  <div class="json-card bg-gray-900 dark:bg-black border border-primary-500/30 rounded-lg shadow-lg p-6 font-mono relative overflow-hidden">
    <!-- 网格背景 -->
    <div class="absolute inset-0 opacity-10">
      <div class="grid-pattern"></div>
    </div>
    
    <!-- 顶部装饰条 -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
    
    <!-- JSON内容 -->
    <div class="relative z-10">
      <pre class="text-sm text-gray-300 leading-relaxed overflow-x-auto"><code v-html="highlightedJson"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: any
  title?: string
}

const props = defineProps<Props>()

const formattedJson = computed(() => {
  const jsonData = props.title ? { [props.title]: props.data } : props.data
  return JSON.stringify(jsonData, null, 2)
})

const highlightedJson = computed(() => {
  const json = formattedJson.value
  return json
    .replace(/(".*?")(\s*:\s*)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
    .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
    .replace(/([{}[\],])/g, '<span class="json-punctuation">$1</span>')
})
</script>

<style scoped>
.grid-pattern {
  background-image: 
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  width: 100%;
  height: 100%;
}

.json-card pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.json-card code {
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
}
</style> 