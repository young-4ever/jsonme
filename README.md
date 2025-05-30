# JsonMe - 基于JSON的个人简历网站

一个基于Vue 3 + TypeScript的现代化个人简历网站，通过简单的JSON配置文件即可生成专业的在线简历。

## ✨ 特性

- 🎨 **多主题支持** - 4种预设主题（简约、专业、创意、科技），满足不同风格需求
- 📱 **响应式布局** - 完美适配桌面端、平板和移动端
- 🌙 **智能深色模式** - 自动检测系统主题偏好，支持手动切换并记住用户偏好
- 🖨️ **打印优化** - 专门优化的打印样式，支持A4格式
- ⚡ **高性能** - 基于Vite构建，快速加载
- 🔧 **JSON配置** - 通过简单的JSON文件配置所有内容
- 💾 **偏好记忆** - 自动保存用户的主题选择和深色模式偏好
- 🚀 **一键部署** - 支持GitHub Pages自动部署

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/jsonme.git
cd jsonme
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 4. 配置简历内容

编辑 `public/resume.json` 文件，修改为你的个人信息：

```json
{
  "personal": {
    "name": "你的姓名",
    "title": "你的职位",
    "avatar": "头像URL",
    "contact": {
      "email": "your@email.com",
      "phone": "+86 138-0000-0000",
      "location": "你的城市",
      "website": "https://yourwebsite.com",
      "github": "https://github.com/yourusername"
    },
    "summary": "个人简介..."
  },
  "experience": [...],
  "education": [...],
  "skills": [...],
  "projects": [...],
  "theme": {
    "name": "professional",
    "colors": {...}
  }
}
```

## 📁 JSON配置结构

### 个人信息 (personal)
- `name`: 姓名
- `title`: 职位标题
- `avatar`: 头像图片URL
- `contact`: 联系方式对象
- `summary`: 个人简介

### 工作经历 (experience)
- `id`: 唯一标识
- `company`: 公司名称
- `position`: 职位
- `startDate`: 开始日期 (YYYY-MM格式)
- `endDate`: 结束日期 (可选)
- `current`: 是否为当前工作
- `description`: 工作描述
- `achievements`: 主要成就数组
- `technologies`: 使用的技术栈

### 技能 (skills)
- `id`: 唯一标识
- `name`: 技能名称
- `level`: 熟练度 (1-100)
- `category`: 技能分类

### 项目经历 (projects)
- `id`: 唯一标识
- `name`: 项目名称
- `description`: 项目描述
- `technologies`: 技术栈数组
- `startDate`: 开始日期
- `endDate`: 结束日期 (可选)
- `url`: 项目链接
- `github`: GitHub仓库链接
- `highlights`: 项目亮点

### 教育背景 (education)
- `id`: 唯一标识
- `school`: 学校名称
- `degree`: 学位
- `major`: 专业
- `startDate`: 开始日期
- `endDate`: 结束日期
- `gpa`: 绩点 (可选)

## 🎨 主题系统

JsonMe 提供4种精心设计的预设主题：

- **简约主题** - 简洁清爽的蓝色系设计
- **专业主题** - 商务专业的灰色系设计（默认）
- **创意主题** - 富有创意的紫色系设计
- **科技主题** - 现代科技感的青色系设计

### 主题切换方式

1. **界面切换**: 点击右上角🎨按钮选择主题
2. **JSON配置**: 在`resume.json`中设置主题

```json
{
  "theme": {
    "name": "creative",  // minimalist, professional, creative, tech
    "isDark": false      // 深色模式设置
  }
}
```

详细的主题使用指南请查看：[主题系统文档](docs/THEMES.md)

## 🚀 部署到GitHub Pages

### 方法一：自动部署 (推荐)

1. Fork这个项目到你的GitHub账户
2. 修改 `public/resume.json` 为你的信息
3. 推送到main分支，GitHub Actions会自动构建和部署
4. 在仓库设置中启用GitHub Pages，选择`gh-pages`分支

### 方法二：手动部署

```bash
# 构建项目
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 📱 响应式设计

- **桌面端**: 最佳浏览体验，完整功能
- **平板**: 自适应布局，保持良好可读性
- **移动端**: 优化的移动端体验，触摸友好

## 🖨️ 打印功能

- 点击右上角打印按钮或使用 `Ctrl+P`
- 自动隐藏不必要的UI元素
- 优化的A4纸张格式
- 保持良好的页面分割

## 🛠️ 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **状态管理**: Pinia
- **图标**: Emoji (无需额外依赖)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 支持

如果你觉得这个项目有用，请给它一个⭐️！

---

**JsonMe** - 让简历制作变得简单而优雅 