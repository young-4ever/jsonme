<template>
  <div class="source-code-display">
    <pre class="source-code-content"><code v-html="highlightedJson"></code></pre>
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
</script>

<style scoped>
.source-code-display {
  margin-bottom: 2rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
}

.source-code-content {
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

.source-code-content code {
  font-family: inherit;
}
</style> 