# 🎓 智能学习系统 - AI驱动的个性化学习平台

一个基于 Next.js 14 + TypeScript 的现代化智能学习系统，集成AI对话、系统化学习流程、错题本管理和个性化学习分析，为学生提供全方位的学习支持。

## ✨ 核心功能

### 🧠 AI智能学习流程
- **AI讲解系统**：基于DeepSeek大模型，提供深度的知识点讲解和分析
- **苏格拉底式对话**：通过启发式提问，引导学生深入思考和理解
- **智能测验生成**：自动生成个性化测试题目，检验学习效果
- **学习进度追踪**：实时记录学习状态，支持断点续学

### 📚 知识库管理
- **多格式文档支持**：PDF、Word、图片等多种格式文件导入
- **智能OCR识别**：自动提取文档中的文本内容，支持手写文字识别
- **知识点标注**：支持对重要内容进行标记和分类管理
- **快速检索**：基于内容的智能搜索和关联推荐

### 📝 错题本系统
- **自动错题收集**：智能识别和记录学习过程中的错误
- **错因分析**：AI分析错误原因，提供针对性的改进建议
- **错题复盘**：定期生成错题清单和易错点分析报告
- **个性化复习**：基于错题数据制定专属复习计划

### 📊 学习分析与报告
- **学习效果评估**：多维度分析学习表现和知识掌握情况
- **个性化建议**：基于学习数据提供定制化的学习路径
- **进度可视化**：直观展示学习进度和成长轨迹
- **学习报告生成**：自动生成详细的学习分析报告

### 🎯 个性化学习体验
- **多地区考纲适配**：支持不同地区的教学大纲和考试要求
- **年级分层教学**：根据学生年级提供适配的学习内容
- **学科专业化**：针对不同学科提供专业的学习策略
- **响应式设计**：完美适配各种设备，随时随地学习

## 🛠️ 技术架构

### 前端技术栈
- **Next.js 14**：React全栈框架，支持App Router和服务端渲染
- **TypeScript**：类型安全的JavaScript，提升开发效率和代码质量
- **Tailwind CSS**：原子化CSS框架，快速构建现代化UI界面
- **Framer Motion**：流畅的动画效果和交互体验
- **React Hook Form**：高性能的表单处理和验证

### 后端与数据库
- **PostgreSQL**：可靠的关系型数据库，存储学习数据和用户信息
- **Prisma ORM**：现代化的数据库访问层，类型安全的数据操作
- **Next.js API Routes**：服务端API接口，处理业务逻辑

### AI与智能服务
- **讯飞星火API**：主要AI对话引擎，提供智能学习指导
- **DeepSeek API**：备用AI服务，确保服务稳定性
- **PDF.js**：PDF文档解析和文本提取
- **Tesseract.js**：OCR文字识别，支持图片转文字

### 部署与运维
- **Vercel**：现代化的部署平台，支持自动化CI/CD
- **Docker**：容器化部署，确保环境一致性
- **阿里云RDS**：云数据库服务，保障数据安全和性能

## 如何运行项目

在运行项目之前，您需要确保已经安装了 Node.js 和 npm。

### 步骤 1：克隆项目并安装依赖

```bash
# 克隆项目（如果是从Git仓库获取）
git clone <项目仓库地址>

# 进入项目目录
cd 产品First

# 安装依赖
npm install
```

### 步骤 2：配置环境变量

创建`.env.local`文件，添加必要的配置信息：

```env
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/learning_system"

# 讯飞星火API配置
NEXT_PUBLIC_XUNFEI_APP_ID=您的APP_ID
NEXT_PUBLIC_XUNFEI_API_KEY=您的API_KEY
NEXT_PUBLIC_XUNFEI_API_SECRET=您的API_SECRET
NEXT_PUBLIC_XUNFEI_DOMAIN=您的DOMAIN
NEXT_PUBLIC_XUNFEI_API_URL=您的API_URL

# DeepSeek API配置（备用AI服务）
OPENAI_API_KEY=您的DEEPSEEK_API_KEY
OPENAI_BASE_URL=https://api.deepseek.com
OPENAI_MODEL=deepseek-chat

# NextAuth配置（如需要用户认证）
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=您的密钥

# 环境标识
NODE_ENV=development
```

> **注意**：请确保数据库已创建并可访问，AI API密钥有效且有足够的调用额度。

### 步骤 3：初始化数据库

```bash
# 生成Prisma客户端
npx prisma generate

# 运行数据库迁移（首次运行）
npx prisma db push

# 查看数据库结构（可选）
npx prisma studio
```

### 步骤 4：启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或者使用yarn
yarn dev
```

开发服务器启动后，打开浏览器并访问 [http://localhost:3003](http://localhost:3003) 即可使用应用。

### 步骤 5：验证功能

访问以下页面验证系统功能：
- 📚 **知识库管理**：`/knowledge-base` - 上传和管理学习材料
- 🎓 **学习界面**：`/learning-interface` - 开始AI辅导学习
- 💬 **AI对话**：`/chat` - 与AI进行自由对话
- 📊 **学习历史**：`/learning-history` - 查看学习记录和错题本

## 部署指南

### 方法一：静态部署（推荐）

```bash
# 构建静态文件
npm run export

# 部署out目录到您的静态网站托管服务
```

### 方法二：Netlify部署

1. 在Netlify上创建新站点
2. 连接您的Git仓库或上传`out`目录
3. 配置环境变量（与`.env.local`相同）
4. 部署完成后，可以配置自定义域名

## 📖 使用指南

### 🚀 快速开始

#### 1. 知识库管理
- **上传学习材料**：支持PDF、Word、图片等格式，系统自动提取文本内容
- **OCR识别**：对于图片和扫描文档，系统自动进行文字识别
- **内容标注**：可以对重要知识点进行标记和分类
- **智能搜索**：快速检索相关学习内容

#### 2. AI学习流程
- **选择学习内容**：从知识库中选择要学习的材料或直接输入学习主题
- **AI深度讲解**：系统提供详细的知识点分析和讲解
- **苏格拉底对话**：通过问答形式深化理解，培养批判性思维
- **智能测验**：自动生成个性化测试题目，检验学习效果
- **学习报告**：获得详细的学习分析和改进建议

#### 3. 错题本功能
- **自动收集**：学习过程中的错误自动记录到错题本
- **错因分析**：AI分析错误原因，提供针对性解释
- **定期复习**：系统推荐错题复习计划
- **进步追踪**：可视化展示错题改进情况

#### 4. 学习历史管理
- **学习记录**：查看所有学习会话和对话历史
- **进度追踪**：了解学习进度和时间投入
- **成绩分析**：查看测验成绩和知识掌握情况
- **个性化建议**：基于学习数据获得定制化建议

### 💡 使用技巧

- **断点续学**：系统自动保存学习进度，可随时继续之前的学习
- **多设备同步**：学习数据云端存储，支持多设备访问
- **个性化设置**：可根据地区、年级、学科进行个性化配置
- **学习计划**：制定学习目标，系统帮助跟踪完成情况

## ⚠️ 注意事项

### 系统要求
- **Node.js**：版本 18.0 或更高
- **数据库**：PostgreSQL 12+ 或兼容版本
- **浏览器**：Chrome 90+、Firefox 88+、Safari 14+ 或其他现代浏览器

### 使用须知
- **数据安全**：学习数据存储在云端数据库，请妥善保管账户信息
- **API配额**：AI功能依赖第三方API服务，请确保有足够的调用额度
- **网络要求**：部分功能需要稳定的网络连接，建议在良好网络环境下使用
- **文件大小**：单个上传文件建议不超过50MB，以确保处理速度
- **OCR处理**：图片文字识别可能需要几秒到几分钟，请耐心等待

### 隐私保护
- 系统遵循数据最小化原则，仅收集必要的学习数据
- 用户上传的文档和学习内容仅用于个人学习目的
- 不会与第三方分享个人学习数据

## 🔧 开发说明

### 项目结构
```
app/
├── components/          # 可复用组件
│   ├── LearningFlow/   # 学习流程相关组件
│   └── UI/             # 基础UI组件
├── services/           # 业务逻辑服务
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
└── api/                # API路由
prisma/
├── schema.prisma       # 数据库模型定义
└── migrations/         # 数据库迁移文件
```

### 开发指南
- 使用 **Next.js 14 App Router** 架构
- 遵循 **TypeScript** 严格模式开发
- 采用 **Prisma ORM** 进行数据库操作
- 使用 **Tailwind CSS** 进行样式开发
- 组件开发遵循 **React Hooks** 最佳实践

### 扩展功能
如需添加新功能，建议：
1. 在 `app/components` 下创建新组件
2. 在 `app/services` 下添加业务逻辑
3. 在 `prisma/schema.prisma` 中定义数据模型
4. 在 `app/api` 下创建API接口

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目：
1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

如有问题或建议，请通过以下方式联系：
- 📧 邮箱：[您的邮箱]
- 🐛 问题反馈：[GitHub Issues](https://github.com/your-repo/issues)
- 💬 讨论交流：[GitHub Discussions](https://github.com/your-repo/discussions)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！