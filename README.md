# JsonMe 演示

## 🎯 项目概览

JsonMe是一个基于Vue 3 + TypeScript的现代化个人简历网站生成器。通过简单的JSON配置文件，你可以快速创建一个专业、美观、响应式的在线简历。

## 🌟 核心特性展示

### 1. JSON文件上传功能 ✨
```
🔹 拖拽或点击上传JSON简历文件
🔹 智能选择最佳上传方式
🔹 Base64 URL编码（小文件，推荐）
🔹 免费GitHub Gist服务（内置Token）
🔹 自定义GitHub Token支持
🔹 生成专属的JsonMe链接
🔹 支持二维码分享
🔹 永久保存，随时访问
```

**上传方式说明：**

#### 🚀 URL编码方式（推荐）
- **适用**: 文件小于8KB的JSON
- **优点**: 即时生成，无需外部服务，永不失效
- **原理**: 将JSON数据Base64编码后放入URL参数
- **链接格式**: `https://domain.com/jsonme/?data=base64encodeddata`

#### 🆓 免费Gist服务（新功能）
- **适用**: 任何大小的JSON文件
- **优点**: 无需GitHub账号，免费使用
- **限制**: 每小时10次上传（可配置）
- **原理**: 使用内置GitHub Token上传到公开Gist
- **链接格式**: `https://domain.com/jsonme/?gist=gist_raw_url`

#### 🎫 一次性分享链接（新功能）
- **适用**: 需要分享上传权限给他人
- **优点**: 安全可控，一次性使用
- **特点**: 24小时有效期，使用后立即失效
- **生成**: 在上传页面点击"生成分享链接"
- **链接格式**: `https://domain.com/jsonme/?upload&upload_token=ott_xxx`

#### 🔑 自定义GitHub Token
- **适用**: 需要频繁上传或大量使用
- **优点**: 无使用限制，完全控制
- **要求**: 需要GitHub账号和Token
- **权限**: 只需`gist`权限
- **链接格式**: `https://domain.com/jsonme/?gist=gist_raw_url`

**使用方法：**
1. 访问网站首页，点击"上传JSON文件"
2. 拖拽或选择你的JSON简历文件  
3. 系统自动选择最佳上传方式
4. 对于Gist方式，可选择提供GitHub Token
5. 预览数据无误后点击"生成链接"
6. 获得专属链接，可分享给他人查看

**生成分享链接：**
1. 在上传页面点击"生成分享链接"
2. 复制生成的一次性上传链接
3. 分享给需要上传JSON的人员
4. 对方通过链接可免费上传一次
5. 链接使用后自动失效（24小时内有效）

**GitHub Token获取方法：**
1. 访问 [GitHub Token设置](https://github.com/settings/tokens)
2. 点击"Generate new token (classic)"
3. 只需勾选 `gist` 权限
4. 复制生成的token到上传页面

### 2. JSON驱动的内容管理
```json
{
  "personal": {
    "name": "张三",
    "title": "前端开发工程师",
    "summary": "拥有5年前端开发经验..."
  }
}
```

### 3. 响应式设计
- 📱 移动端优化
- 💻 桌面端完整体验
- 📱 平板适配

### 4. 深色模式支持
- 🌙 一键切换深色/浅色主题
- 🎨 自动适配系统主题
- 💾 记住用户偏好

### 5. 打印优化
- 🖨️ A4纸张格式优化
- 📄 专业的打印样式
- 🔍 自动调整布局

## 📊 技术架构

```
JsonMe
├── Vue 3 (Composition API)
├── TypeScript (类型安全)
├── Vite (快速构建)
├── Tailwind CSS (样式框架)
├── Pinia (状态管理)
├── GitHub Gist API (文件存储)
└── GitHub Pages (部署)
```

## 🚀 快速开始

### 方式一：上传JSON文件（推荐）
1. 访问 [JsonMe在线版](https://young-4ever.github.io/jsonme/)
2. 点击"上传JSON文件"
3. 选择你的JSON简历文件
4. 选择上传方式：
   - **免费服务**: 无需账号，每小时10次
   - **自定义Token**: 无限制使用
   - **URL编码**: 小文件即时生成
5. 获得专属分享链接

### 方式二：本地开发
```bash
# 克隆项目
git clone https://github.com/young-4ever/jsonme.git
cd jsonme

# 安装依赖
npm install

# 配置环境变量（可选，启用默认Gist服务）
cp env.example .env
# 编辑 .env 文件，添加你的GitHub Token

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 方式三：Fork部署
```bash
# 1. Fork这个仓库到你的GitHub账号
# 2. 修改 public/resume.json 文件
# 3. 可选：在GitHub Secrets中配置环境变量
#    - VITE_DEFAULT_GITHUB_TOKEN: 你的GitHub Token
#    - VITE_DEFAULT_TOKEN_RATE_LIMIT: 速率限制（默认10）
# 4. 开启GitHub Pages
# 5. 访问 https://你的用户名.github.io/jsonme/
```

## 📝 JSON配置格式

### 完整配置示例
```json
{
  "personal": {
    "name": "你的姓名",
    "title": "你的职位",
    "avatar": "头像URL（可选）",
    "contact": {
      "email": "your@email.com",
      "phone": "138-0000-0000",
      "location": "所在城市",
      "website": "个人网站",
      "github": "GitHub链接",
      "linkedin": "LinkedIn链接"
    },
    "summary": "个人简介"
  },
  "experience": [
    {
      "id": "exp1",
      "company": "公司名称",
      "position": "职位名称",
      "startDate": "2022-01",
      "endDate": "2023-12",
      "current": false,
      "description": ["工作描述1", "工作描述2"],
      "achievements": ["主要成就1", "主要成就2"],
      "technologies": ["技术栈1", "技术栈2"]
    }
  ],
  "education": [
    {
      "id": "edu1",
      "school": "学校名称",
      "degree": "学位",
      "major": "专业",
      "startDate": "2018-09",
      "endDate": "2022-06",
      "gpa": "3.8/4.0",
      "description": "额外描述"
    }
  ],
  "skills": [
    {
      "id": "skill1",
      "name": "技能名称",
      "level": 90,
      "category": "技能分类"
    }
  ],
  "projects": [
    {
      "id": "proj1",
      "name": "项目名称",
      "description": "项目描述",
      "technologies": ["技术栈"],
      "startDate": "2023-01",
      "endDate": "2023-06",
      "current": false,
      "url": "项目链接",
      "github": "GitHub链接",
      "highlights": ["项目亮点1", "项目亮点2"]
    }
  ],
  "theme": {
    "name": "主题名称"
  }
}
```

### 支持的主题
- `professional` - 专业主题
- `minimalist` - 极简主题
- `creative` - 创意主题
- `source` - 源代码主题
- `tech` - 科技主题

## 🎨 界面预览

### 欢迎页面
```
┌─────────────────────────────────┐
│           JsonMe Logo           │
│     JSON驱动的简历生成器         │
├─────────────────────────────────┤
│  [📤 上传JSON文件] [👀 查看示例]  │
├─────────────────────────────────┤
│         特性展示区域             │
│    • 多主题支持                 │
│    • 响应式设计                 │
│    • 快速部署                   │
└─────────────────────────────────┘
```

### 上传页面
```
┌─────────────────────────────────┐
│ [← 返回]  JsonMe 文件上传        │
├─────────────────────────────────┤
│  ┌─────────────────────────────┐ │
│  │     拖拽上传区域             │ │
│  │   点击或拖拽JSON文件到这里    │ │
│  └─────────────────────────────┘ │
├─────────────────────────────────┤
│         数据预览区域             │
│     [上传并生成链接]             │
├─────────────────────────────────┤
│        生成结果展示              │
│   • 专属链接                    │
│   • 二维码                      │
│   • 操作按钮                    │
└─────────────────────────────────┘
```

### 简历展示页面
```
┌─────────────────────────────────┐
│ 🌙 📤 🖨️                       │ 工具栏
├─────────────────────────────────┤
│ 👤 个人信息区域                  │
│ • 头像、姓名、职位               │
│ • 联系方式                      │
│ • 个人简介                      │
├─────────────────────────────────┤
│ 💼 工作经历                     │
│ • 公司、职位、时间               │
│ • 工作描述、成就                 │
│ • 技术栈标签                    │
├─────────────────────────────────┤
│ 🛠️ 技能专长                     │
│ • 分类展示                      │
│ • 熟练度进度条                   │
├─────────────────────────────────┤
│ 🚀 项目经历                     │
│ • 项目名称、描述                 │
│ • 技术栈、链接                   │
│ • 项目亮点                      │
├─────────────────────────────────┤
│ 🎓 教育背景                     │
│ • 学校、专业、时间               │
│ • 绩点、描述                    │
└─────────────────────────────────┘
```

## 📡 API接口

### 支持的URL参数

- `?gist=<gist_raw_url>` - 从GitHub Gist加载简历数据
- `?upload` - 直接跳转到上传页面

**示例：**
```
# 从Gist加载
https://your-domain.com/jsonme/?gist=https://gist.githubusercontent.com/...

# 跳转上传页面
https://your-domain.com/jsonme/?upload
```

## 🎯 使用场景

### 1. 求职简历
- ✅ 专业的视觉设计
- ✅ 完整的信息展示
- ✅ 易于分享和打印

### 2. 个人品牌展示
- ✅ 在线作品集
- ✅ 技能展示
- ✅ 项目经历

### 3. 学术简历
- ✅ 教育背景突出
- ✅ 研究项目展示
- ✅ 学术成就记录

### 4. 快速分享
- ✅ 上传JSON生成链接
- ✅ 二维码扫码访问
- ✅ 社交媒体分享

## 🔧 自定义选项

### 主题颜色
```json
{
  "theme": {
    "name": "professional",
    "colors": {
      "primary": "#your-color",
      "secondary": "#your-color",
      "accent": "#your-color"
    }
  }
}
```

### 布局调整
- 📱 响应式断点
- 🎨 组件间距
- 📝 字体大小

### 内容模块
- ➕ 添加新模块
- 🔄 调整显示顺序
- 🎛️ 控制显示/隐藏

## 📈 性能指标

- ⚡ 首屏加载时间 < 2秒
- 📱 移动端性能评分 > 90
- 🔍 SEO优化评分 > 95
- ♿ 可访问性评分 > 90

## 🌍 浏览器支持

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

## 📱 移动端特性

- 🔄 触摸友好的交互
- 📱 优化的移动端布局
- ⚡ 快速加载和渲染
- 💾 离线缓存支持

## 🔒 隐私和安全

- 🔸 所有上传的JSON文件存储在GitHub Gist（公开）
- 🔸 不收集任何个人隐私信息
- 🔸 不使用Cookies或本地存储追踪
- 🔸 完全开源，代码透明

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程
```bash
# 1. Fork项目
# 2. 创建功能分支
git checkout -b feature/your-feature

# 3. 提交更改
git commit -m "Add your feature"

# 4. 推送分支
git push origin feature/your-feature

# 5. 创建Pull Request
```

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🎓 学习资源

- 📖 [详细使用指南](./docs/USAGE.md)
- 🎯 [PRD需求文档](./docs/PRD.md)
- 💻 [源码解析](./src/)
- 🤝 [贡献指南](./CONTRIBUTING.md)

---

**Made with ❤️ by [JsonMe Team](https://github.com/young-4ever)** 