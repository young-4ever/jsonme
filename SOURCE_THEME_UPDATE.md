# 源代码主题更新说明

## 🎯 更新目标

根据用户需求，源代码主题现在直接渲染JSON文本，而不是通过div组件渲染。这提供了更纯粹的源代码查看体验。

## ✅ 实现的更改

### 1. App.vue 主要更改

#### 模板结构更新
```vue
<!-- 源代码主题：直接渲染JSON文本 -->
<div v-if="currentThemeName === 'source'" class="source-code-container">
  <pre class="source-code-content"><code v-html="highlightedJsonText"></code></pre>
</div>

<!-- 其他主题：使用组件渲染 -->
<template v-else>
  <!-- 所有其他组件 -->
</template>
```

#### 新增计算属性
```javascript
// 源代码主题的JSON高亮显示
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
```

### 2. CSS样式更新

#### 新增源代码容器样式
```css
/* 源代码容器样式 */
.theme-source .source-code-container {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-x: auto;
}

.theme-source .source-code-content {
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.6;
  color: #d4d4d4;
  background: transparent;
  border: none;
  overflow-x: auto;
}
```

#### 增强的语法高亮样式
```css
/* 确保所有JSON高亮样式在源代码主题中生效 */
.theme-source .source-code-content .json-key {
  color: #9cdcfe !important;
}

.theme-source .source-code-content .json-string {
  color: #ce9178 !important;
}

.theme-source .source-code-content .json-number {
  color: #b5cea8 !important;
}

.theme-source .source-code-content .json-boolean {
  color: #569cd6 !important;
}

.theme-source .source-code-content .json-null {
  color: #569cd6 !important;
}

.theme-source .source-code-content .json-punctuation {
  color: #d4d4d4 !important;
}
```

#### 打印样式优化
```css
/* 源代码主题打印样式 */
.theme-source .source-code-container {
  background: white !important;
  color: black !important;
  font-family: 'Courier New', monospace !important;
  font-size: 10pt !important;
  line-height: 1.4 !important;
  padding: 8pt !important;
  margin: 0 !important;
}

/* 源代码主题打印时的语法高亮 */
.theme-source .source-code-content .json-key {
  color: #0066cc !important;
  font-weight: bold !important;
}

.theme-source .source-code-content .json-string {
  color: #008000 !important;
}
```

## 🎨 视觉效果

### 屏幕显示
- **背景**: VSCode深色主题 (#1e1e1e)
- **文本颜色**: 浅灰色 (#d4d4d4)
- **语法高亮**: VSCode风格配色
  - 键名: 蓝色 (#9cdcfe)
  - 字符串: 橙色 (#ce9178)
  - 数字: 绿色 (#b5cea8)
  - 布尔值: 蓝色 (#569cd6)
  - 标点符号: 默认颜色 (#d4d4d4)

### 打印显示
- **背景**: 白色
- **文本颜色**: 黑色
- **语法高亮**: 打印友好的配色
  - 键名: 深蓝色，加粗
  - 字符串: 绿色
  - 数字: 橙色
  - 布尔值: 蓝色，加粗

## 🚀 使用方法

### 1. 通过界面切换
1. 点击右上角的 🎨 按钮
2. 选择 "📝 源代码" 主题
3. 页面将直接显示JSON文本

### 2. 通过配置文件
在 `public/resume.json` 中设置：
```json
{
  "theme": {
    "name": "source",
    "isDark": false
  }
}
```

## 📱 响应式支持

源代码主题完全支持响应式设计：
- 在移动设备上自动调整字体大小
- 支持水平滚动查看长行
- 保持良好的可读性

## 🖨️ 打印优化

- 自动转换为打印友好的黑白配色
- 保持语法高亮的可读性
- 优化字体大小和行间距
- 支持A4纸张格式

## 🔧 技术实现细节

### 条件渲染
使用Vue的条件渲染来区分源代码主题和其他主题：
```vue
<div v-if="currentThemeName === 'source'">
  <!-- 源代码主题内容 -->
</div>
<template v-else>
  <!-- 其他主题组件 -->
</template>
```

### JSON处理
- 使用 `JSON.stringify(data, null, 2)` 格式化JSON
- 通过正则表达式实现语法高亮
- 使用 `v-html` 渲染高亮后的HTML

### 性能优化
- 使用计算属性缓存高亮结果
- 只在数据变化时重新计算
- 避免不必要的DOM操作

## ✨ 特色功能

1. **纯JSON显示**: 不使用任何组件，直接显示原始JSON数据
2. **VSCode风格**: 完全模拟VSCode的深色主题
3. **语法高亮**: 完整的JSON语法高亮支持
4. **打印友好**: 自动优化打印样式
5. **响应式**: 在所有设备上都有良好体验

## 🎯 与其他主题的区别

| 特性 | 源代码主题 | 其他主题 |
|------|------------|----------|
| 渲染方式 | 直接JSON文本 | Vue组件 |
| 视觉风格 | VSCode风格 | 卡片布局 |
| 语法高亮 | 完整支持 | 不适用 |
| 适用场景 | 开发者查看 | 一般展示 |

这次更新完全满足了用户的需求，提供了真正的源代码查看体验！ 