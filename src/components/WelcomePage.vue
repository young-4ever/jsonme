<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Logo区域 -->
      <div class="mb-8">
        <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          JsonMe
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          基于JSON配置的现代化简历生成器，让你的简历更加专业和美观
        </p>
      </div>

      <!-- 特性展示 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-4xl mb-4">🎨</div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">多主题支持</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            支持专业、创意、极简等多种主题风格
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-4xl mb-4">📱</div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">响应式设计</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            完美适配桌面端、平板和移动设备
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">快速部署</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            一键部署到GitHub Pages，永久免费托管
          </p>
        </div>
      </div>

      <!-- 主要操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button
          @click="$emit('upload')"
          class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg"
        >
          📤 上传JSON文件
        </button>
        <button
          @click="$emit('viewDemo')"
          class="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold text-lg shadow-lg"
        >
          👀 查看示例
        </button>
      </div>

      <!-- JSON示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-left mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          JSON配置示例
        </h3>
        <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm"><code>{
  "personal": {
    "name": "张三",
    "title": "前端开发工程师",
    "avatar": "https://example.com/avatar.jpg",
    "contact": {
      "email": "zhangsan@example.com",
      "phone": "138-0000-0000",
      "location": "北京市",
      "github": "https://github.com/zhangsan"
    },
    "summary": "3年前端开发经验..."
  },
  "experience": [...],
  "education": [...],
  "skills": [...],
  "projects": [...],
  "theme": {
    "name": "professional"
  }
}</code></pre>
      </div>

      <!-- 功能说明 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎯 适用场景</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• 求职简历制作</li>
            <li>• 个人品牌展示</li>
            <li>• 学术简历</li>
            <li>• 项目作品集</li>
          </ul>
        </div>
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">✨ 核心特性</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• JSON驱动，易于维护</li>
            <li>• 深色模式支持</li>
            <li>• 打印优化</li>
            <li>• SEO友好</li>
          </ul>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="text-center text-gray-500 dark:text-gray-400">
        <p class="mb-2">
          由 <a href="https://github.com/young-4ever/jsonme" class="text-blue-600 dark:text-blue-400 hover:underline">JsonMe</a> 强力驱动
        </p>
        <p class="text-sm">
          开源免费 • 简单易用 • 现代美观
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义emit事件
const emit = defineEmits<{
  upload: []
  viewDemo: []
}>()
</script>

<style scoped>
/* 添加一些动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.max-w-4xl > * {
  animation: fadeInUp 0.6s ease-out forwards;
}

.max-w-4xl > *:nth-child(2) {
  animation-delay: 0.1s;
}

.max-w-4xl > *:nth-child(3) {
  animation-delay: 0.2s;
}

.max-w-4xl > *:nth-child(4) {
  animation-delay: 0.3s;
}
</style> 