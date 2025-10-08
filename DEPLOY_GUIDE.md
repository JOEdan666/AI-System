# 🚀 一键部署指南 - GitHub + Vercel

## 📋 部署前准备清单

### ✅ 必需账户
- [ ] GitHub 账户
- [ ] Vercel 账户 (用GitHub登录)
- [ ] PostgreSQL 数据库 (推荐: Vercel Postgres 或 Supabase)
- [ ] DeepSeek API 账户

### ✅ 必需信息
- [ ] 数据库连接字符串
- [ ] DeepSeek API Key
- [ ] 域名 (可选，Vercel会提供免费域名)

## 🎯 第一步：发布到 GitHub

### 1. 创建 GitHub 仓库
```bash
# 在项目根目录执行
git init
git add .
git commit -m "🎉 Initial commit: AI学习平台"

# 在 GitHub 创建新仓库后
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 2. 添加 .gitignore (如果没有)
确保以下文件被忽略：
```
.env
.env.local
.env.production
node_modules/
.next/
dist/
*.log
```

## 🚀 第二步：部署到 Vercel

### 方法一：一键部署 (推荐)
1. 访问 [Vercel](https://vercel.com)
2. 用 GitHub 账户登录
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. Vercel 会自动检测到 Next.js 项目

### 方法二：命令行部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

## ⚙️ 第三步：配置环境变量

在 Vercel 项目设置中添加以下环境变量：

### 🔑 必需环境变量
```bash
# 数据库配置
DATABASE_URL=postgresql://username:password@host:port/database?schema=public

# AI服务配置
OPENAI_API_KEY=sk-your-deepseek-api-key
OPENAI_BASE_URL=https://api.deepseek.com/v1
OPENAI_MODEL=deepseek-chat

# 认证配置
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-random-secret-string

# 应用配置
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### 📝 配置步骤
1. 进入 Vercel 项目 Dashboard
2. 点击 "Settings" → "Environment Variables"
3. 逐一添加上述环境变量
4. 点击 "Redeploy" 重新部署

## 🗄️ 第四步：数据库设置

### 选项一：Vercel Postgres (推荐)
1. 在 Vercel 项目中点击 "Storage"
2. 选择 "Postgres"
3. 创建数据库
4. 复制连接字符串到 `DATABASE_URL`

### 选项二：Supabase (免费)
1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取数据库连接字符串
4. 添加到环境变量

### 数据库初始化
部署后，数据库会自动初始化 (Prisma migrations)

## 🎨 第五步：自定义域名 (可选)

### 免费域名
Vercel 自动提供: `your-project.vercel.app`

### 自定义域名
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加您的域名
3. 按照提示配置 DNS 记录

## 🔧 常见问题解决

### 构建失败
```bash
# 检查依赖
npm install

# 本地测试构建
npm run build
```

### 数据库连接失败
- 检查 `DATABASE_URL` 格式
- 确保数据库可从外网访问
- 检查用户名密码是否正确

### API 调用失败
- 检查 `OPENAI_API_KEY` 是否有效
- 确认 API 额度是否充足
- 检查 `OPENAI_BASE_URL` 配置

## 📊 部署后验证

访问以下页面确认功能正常：
- 🏠 首页: `https://your-domain/`
- 📚 知识库: `https://your-domain/`
- 🎓 学习界面: `https://your-domain/learning-interface`
- 📈 学习历史: `https://your-domain/learning-history`

## 🎉 完成！

您的 AI 学习平台现已成功部署！

### 下一步建议
- [ ] 设置自定义域名
- [ ] 配置 Google Analytics
- [ ] 设置监控和日志
- [ ] 备份数据库

---

## 🆘 需要帮助？

如果遇到问题，请检查：
1. Vercel 部署日志
2. 浏览器开发者工具
3. 环境变量配置
4. 数据库连接状态

祝您部署顺利！🎊