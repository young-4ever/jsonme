# 🎨 VSCode风格源代码主题更新

## 🎯 更新目标

根据用户提供的图片参考，将源代码主题完全重新设计为VSCode风格的代码编辑器界面，提供真实的代码编辑器体验。

## ✨ 新特性

### 1. 完整的VSCode界面模拟

#### 🚦 macOS风格标题栏
- **交通灯按钮**: 红、黄、绿三个圆形按钮
- **文件名显示**: 显示 "resume.json"
- **深色主题**: 与VSCode一致的标题栏颜色 (#2d2d30)

#### 📊 行号显示
- **真实行号**: 每行代码都有对应的行号
- **右对齐**: 行号右对齐显示，符合编辑器习惯
- **灰色显示**: 使用 #858585 颜色，不干扰代码阅读
- **分隔线**: 行号区域与代码区域有清晰的分隔线

#### 🎨 语法高亮
- **键名**: 蓝色 (#9cdcfe) - 类似VSCode中的属性名
- **字符串**: 橙色 (#ce9178) - 温暖的橙色调
- **数字**: 绿色 (#b5cea8) - 清晰的数字标识
- **布尔值**: 蓝色 (#569cd6) - 关键字颜色
- **标点符号**: 默认颜色 (#d4d4d4) - 不抢夺注意力

### 2. 专业的编辑器体验

#### 💻 等宽字体
- 使用 Monaco、Menlo、Ubuntu Mono、Courier New 字体栈
- 确保在不同操作系统上都有最佳显示效果
- 字符对齐完美，易于阅读代码结构

#### 🌙 深色主题
- **背景色**: #1e1e1e (VSCode深色主题标准色)
- **文本色**: #d4d4d4 (高对比度，护眼)
- **边框色**: #3e3e42 (微妙的分隔线)
- **阴影效果**: 0 8px 32px rgba(0, 0, 0, 0.3) (立体感)

#### 📱 响应式设计
- **桌面端**: 完整的编辑器体验
- **平板端**: 适当缩小字体和间距
- **手机端**: 优化触摸体验，保持可读性

### 3. 技术实现细节

#### Vue.js 组件结构
```vue
<!-- VSCode风格编辑器 -->
<div v-if="currentThemeName === 'source'" class="vscode-editor">
  <!-- 标题栏 -->
  <div class="vscode-titlebar">
    <div class="vscode-traffic-lights">
      <div class="vscode-light red"></div>
      <div class="vscode-light yellow"></div>
      <div class="vscode-light green"></div>
    </div>
    <div class="vscode-title">resume.json</div>
  </div>
  
  <!-- 编辑器内容 -->
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
```

#### 计算属性优化
```javascript
// 行数计算
const jsonLines = computed(() => {
  if (!resumeData.value) return []
  const jsonString = JSON.stringify(resumeData.value, null, 2)
  return jsonString.split('\n')
})

// 语法高亮处理
const highlightedJsonWithLines = computed(() => {
  // 逐行处理语法高亮
  const lines = jsonString.split('\n')
  const highlightedLines = lines.map(line => {
    return line
      .replace(/(".*?")(\s*:\s*)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
      .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
      // ... 其他高亮规则
  })
  return highlightedLines.join('\n')
})
```

## 🎨 视觉对比

### 之前的实现
- ❌ 简单的文本显示
- ❌ 没有行号
- ❌ 缺乏编辑器感觉
- ❌ 界面单调

### 现在的实现
- ✅ 完整的VSCode界面
- ✅ 真实的行号显示
- ✅ 专业的编辑器体验
- ✅ 美观的视觉效果
- ✅ macOS风格的交通灯
- ✅ 立体的阴影效果

## 📱 响应式适配

### 桌面端 (>768px)
- 标题栏高度: 35px
- 交通灯大小: 12px
- 字体大小: 14px
- 行号宽度: 50px

### 平板端 (≤768px)
- 标题栏高度: 30px
- 交通灯大小: 10px
- 字体大小: 12px
- 行号宽度: 40px

### 手机端 (≤480px)
- 标题栏高度: 28px
- 交通灯大小: 8px
- 字体大小: 11px
- 行号宽度: 35px

## 🖨️ 打印优化

### 打印时的变化
- **背景**: 白色背景，节省墨水
- **标题栏**: 浅灰色背景 (#f0f0f0)
- **交通灯**: 隐藏，减少干扰
- **行号**: 浅灰背景 (#f8f8f8)
- **语法高亮**: 调整为打印友好的颜色
- **字体大小**: 优化为 9pt，适合A4纸张

## 🚀 使用方法

### 1. 通过界面切换
1. 访问 `http://localhost:5174`
2. 点击右上角 🎨 按钮
3. 选择 "📝 源代码" 主题
4. 享受VSCode风格的编辑器体验

### 2. 测试页面
访问 `test-vscode-theme.html` 查看独立的演示效果

### 3. 配置文件设置
```json
{
  "theme": {
    "name": "source",
    "isDark": false
  }
}
```

## 🎯 用户体验提升

### 开发者友好
- **熟悉的界面**: VSCode用户会感到非常熟悉
- **专业感**: 提升了整个应用的专业度
- **代码审查**: 适合代码审查和技术分享
- **教学演示**: 非常适合技术教学和演示

### 视觉效果
- **立体感**: 阴影效果让编辑器有立体感
- **层次感**: 清晰的界面层次结构
- **品质感**: 高品质的视觉设计
- **一致性**: 与VSCode保持高度一致

## 🔧 技术亮点

1. **性能优化**: 使用计算属性缓存高亮结果
2. **内存效率**: 避免不必要的DOM操作
3. **响应式**: 完美适配各种设备
4. **可维护性**: 清晰的组件结构
5. **扩展性**: 易于添加更多编辑器功能

## 🎉 总结

新的VSCode风格源代码主题完全重新定义了代码查看体验：

- 🎨 **视觉升级**: 从简单文本到专业编辑器
- 💻 **体验提升**: 真实的VSCode使用感受
- 📱 **全平台**: 完美的响应式适配
- 🖨️ **打印友好**: 优化的打印样式
- ⚡ **性能优秀**: 高效的渲染和计算

这个更新让JsonMe的源代码主题达到了专业级代码编辑器的水准！ 