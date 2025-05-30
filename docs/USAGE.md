# JsonMe 使用指南

本指南将详细介绍如何使用JsonMe创建和定制你的个人简历网站。

## 📋 目录

- [快速开始](#快速开始)
- [JSON配置详解](#json配置详解)
- [主题定制](#主题定制)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 🚀 快速开始

### 1. 获取项目

有两种方式获取项目：

**方式一：Fork项目（推荐）**
1. 访问 [JsonMe GitHub仓库](https://github.com/your-username/jsonme)
2. 点击右上角的 "Fork" 按钮
3. 克隆你的Fork到本地：
   ```bash
   git clone https://github.com/your-username/jsonme.git
   cd jsonme
   ```

**方式二：直接下载**
1. 下载项目ZIP文件
2. 解压到本地目录

### 2. 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看默认简历效果。

## 📝 JSON配置详解

所有的简历内容都通过 `public/resume.json` 文件进行配置。

### 个人信息配置

```json
{
  "personal": {
    "name": "张三",                    // 姓名
    "title": "前端开发工程师",           // 职位标题
    "avatar": "头像图片URL",            // 头像（可选）
    "contact": {
      "email": "zhangsan@example.com", // 邮箱
      "phone": "+86 138-0013-8000",    // 电话
      "location": "北京市朝阳区",        // 地址
      "website": "https://zhangsan.dev", // 个人网站（可选）
      "github": "https://github.com/zhangsan", // GitHub（可选）
      "linkedin": "https://linkedin.com/in/zhangsan" // LinkedIn（可选）
    },
    "summary": "个人简介文字..."        // 个人简介
  }
}
```

**注意事项：**
- `name` 和 `title` 是必填字段
- `avatar` 建议使用150x150像素的正方形图片
- 联系方式中至少填写 `email`
- `summary` 建议控制在100-200字

### 工作经历配置

```json
{
  "experience": [
    {
      "id": "exp1",                    // 唯一标识
      "company": "字节跳动",            // 公司名称
      "position": "高级前端开发工程师",  // 职位
      "startDate": "2021-03",          // 开始日期（YYYY-MM格式）
      "endDate": "2023-06",            // 结束日期（可选）
      "current": true,                 // 是否为当前工作
      "description": "工作描述...",     // 工作描述
      "achievements": [                // 主要成就（可选）
        "主导重构了用户管理系统，性能提升40%",
        "建立了前端代码规范和CI/CD流程"
      ],
      "technologies": [                // 技术栈（可选）
        "Vue 3", "TypeScript", "Vite"
      ]
    }
  ]
}
```

**字段说明：**
- `current: true` 表示当前工作，会显示"至今"
- `endDate` 在 `current: true` 时可以省略
- `achievements` 建议3-5条，突出量化成果
- `technologies` 列出主要使用的技术

### 技能配置

```json
{
  "skills": [
    {
      "id": "skill1",                  // 唯一标识
      "name": "Vue.js",                // 技能名称
      "level": 90,                     // 熟练度（1-100）
      "category": "前端框架"            // 技能分类
    }
  ]
}
```

**技能分类建议：**
- 编程语言
- 前端框架
- 后端技术
- 数据库
- 工具软件
- 设计技能

### 项目经历配置

```json
{
  "projects": [
    {
      "id": "proj1",                   // 唯一标识
      "name": "企业级管理系统",          // 项目名称
      "description": "项目描述...",     // 项目描述
      "technologies": ["Vue 3", "TypeScript"], // 技术栈
      "startDate": "2022-01",          // 开始日期
      "endDate": "2022-06",            // 结束日期（可选）
      "current": false,                // 是否为当前项目
      "url": "https://demo.example.com", // 项目链接（可选）
      "github": "https://github.com/user/repo", // GitHub链接（可选）
      "image": "项目截图URL",           // 项目图片（可选）
      "highlights": [                  // 项目亮点（可选）
        "实现了完整的RBAC权限系统",
        "集成了多种图表组件"
      ]
    }
  ]
}
```

### 教育背景配置

```json
{
  "education": [
    {
      "id": "edu1",                    // 唯一标识
      "school": "北京理工大学",          // 学校名称
      "degree": "学士",                 // 学位
      "major": "计算机科学与技术",       // 专业
      "startDate": "2015-09",          // 开始日期
      "endDate": "2019-06",            // 结束日期
      "gpa": "3.8/4.0",               // 绩点（可选）
      "description": "相关描述..."      // 描述（可选）
    }
  ]
}
```

## 🎨 主题定制

### 预设主题

目前支持以下预设主题：
- `professional` - 专业商务风格（默认）
- `creative` - 创意设计风格
- `minimal` - 极简风格

### 自定义颜色

```json
{
  "theme": {
    "name": "custom",
    "colors": {
      "primary": "#3b82f6",      // 主色调
      "secondary": "#64748b",    // 次要颜色
      "accent": "#06b6d4",       // 强调色
      "background": "#ffffff",   // 背景色
      "surface": "#f8fafc",      // 卡片背景
      "text": "#1e293b",         // 主文字颜色
      "textSecondary": "#64748b" // 次要文字颜色
    },
    "isDark": false              // 是否为深色主题（可选，不设置则自动检测系统主题）
  }
}
```

### 智能深色模式

JsonMe 支持智能的深色模式切换：

1. **自动检测系统主题**：首次访问时自动检测用户的系统主题偏好
2. **记住用户偏好**：用户手动切换主题后，偏好会保存到本地存储
3. **实时跟随系统**：当用户未手动设置时，会实时跟随系统主题变化
4. **智能提示**：鼠标悬停在主题切换按钮上会显示当前状态

**主题优先级：**
1. 用户手动设置的偏好（最高优先级）
2. JSON配置中的 `isDark` 设置
3. 系统主题偏好（默认）

### 颜色选择建议

**专业风格：**
- 主色：蓝色系 (#3b82f6, #2563eb)
- 适合：技术、金融、咨询行业

**创意风格：**
- 主色：紫色系 (#8b5cf6, #7c3aed)
- 适合：设计、媒体、艺术行业

**稳重风格：**
- 主色：灰色系 (#64748b, #475569)
- 适合：法律、医疗、教育行业

## 🚀 部署指南

### GitHub Pages 自动部署

1. **准备仓库**
   ```bash
   # Fork项目后克隆到本地
   git clone https://github.com/your-username/jsonme.git
   cd jsonme
   ```

2. **修改配置**
   - 编辑 `public/resume.json` 为你的信息
   - 可选：修改 `vite.config.ts` 中的 `base` 路径

3. **推送代码**
   ```bash
   git add .
   git commit -m "Update resume data"
   git push origin main
   ```

4. **启用GitHub Pages**
   - 进入仓库设置页面
   - 找到 "Pages" 选项
   - 选择 "Deploy from a branch"
   - 选择 `gh-pages` 分支
   - 等待部署完成

### 手动部署

```bash
# 构建项目
npm run build

# 使用gh-pages工具部署
npm run deploy
```

### 其他平台部署

**Netlify：**
1. 连接GitHub仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`

**Vercel：**
1. 导入GitHub仓库
2. 框架预设选择 "Vite"
3. 自动检测构建设置

## ❓ 常见问题

### Q: 如何更换头像？
A: 将头像图片上传到图床（如GitHub、七牛云等），然后在 `personal.avatar` 字段填入图片URL。

### Q: 技能熟练度如何评估？
A: 建议标准：
- 90-100: 精通，能够指导他人
- 80-89: 熟练，能够独立完成复杂任务
- 70-79: 熟悉，能够完成常规任务
- 60-69: 了解，需要查阅资料完成任务

### Q: 如何添加更多联系方式？
A: 目前支持邮箱、电话、地址、网站、GitHub、LinkedIn。如需添加其他方式，可以修改组件代码。

### Q: 打印效果不理想怎么办？
A: 
1. 使用Chrome浏览器打印效果最佳
2. 选择A4纸张大小
3. 取消页眉页脚
4. 调整边距为最小

### Q: 如何自定义域名？
A: 
1. 在 `public` 目录下创建 `CNAME` 文件
2. 文件内容为你的域名（如：`resume.yourdomain.com`）
3. 在域名DNS设置中添加CNAME记录指向 `your-username.github.io`

### Q: 如何备份简历数据？
A: 建议将 `resume.json` 文件单独备份到云盘或其他Git仓库。

## 🔧 高级定制

### 添加新的简历模块

1. 在 `src/types/resume.ts` 中定义新的接口
2. 在 `resume.json` 中添加对应数据
3. 创建新的Vue组件
4. 在 `App.vue` 中引入并使用

### 修改样式

项目使用Tailwind CSS，可以通过以下方式定制：

1. 修改 `tailwind.config.js` 中的主题配置
2. 在 `src/style.css` 中添加自定义样式
3. 直接修改组件中的class名称

### 添加动画效果

项目已预设了一些动画类：
- `animate-fade-in-up`: 淡入向上
- `animate-fade-in`: 淡入
- `animate-slide-up`: 向上滑动

可以在 `tailwind.config.js` 中添加更多动画效果。

---

如果你在使用过程中遇到问题，欢迎提交Issue或查看项目文档。 