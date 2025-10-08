#!/bin/bash

# 🚀 AI学习平台 - 一键部署到Vercel脚本
# 使用方法: chmod +x deploy-to-vercel.sh && ./deploy-to-vercel.sh

set -e

echo "🚀 开始部署 AI学习平台到 Vercel..."
echo "=================================="

# 检查必要工具
echo "📋 检查部署环境..."

if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装，请先安装 Git"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ 环境检查通过"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查是否有 .env 文件
if [ ! -f ".env" ]; then
    echo "⚠️  未找到 .env 文件"
    echo "📝 请复制 .env.example 为 .env 并配置您的环境变量"
    echo "cp .env.example .env"
    echo "然后编辑 .env 文件填入您的配置"
    exit 1
fi

# 本地构建测试
echo "🔨 本地构建测试..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 本地构建失败，请检查代码"
    exit 1
fi

echo "✅ 本地构建成功"

# 检查Git仓库状态
echo "📋 检查Git仓库状态..."
if [ ! -d ".git" ]; then
    echo "🔧 初始化Git仓库..."
    git init
fi

# 检查是否已连接到GitHub仓库
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 连接到GitHub仓库..."
    git remote add origin https://github.com/JOEdan666/AI-System-best-.git
    echo "✅ 已连接到仓库: https://github.com/JOEdan666/AI-System-best-"
fi

# 添加所有文件并提交
echo "📝 提交最新更改..."
git add .
git commit -m "Update: 部署配置和最新功能更新 $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有新的更改需要提交"

# 推送到GitHub
echo "📤 推送到GitHub..."
git push -u origin main || git push origin main

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📥 安装 Vercel CLI..."
    npm install -g vercel
fi

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
echo "请按照提示完成部署配置"
echo "=================================="

vercel --prod

echo ""
echo "🎉 部署完成！"
echo "=================================="
echo "📝 接下来请完成以下步骤："
echo ""
echo "1. 🔑 在 Vercel 项目设置中配置环境变量："
echo "   - DATABASE_URL (PostgreSQL 数据库连接)"
echo "   - OPENAI_API_KEY (DeepSeek API 密钥)"
echo "   - OPENAI_BASE_URL=https://api.deepseek.com/v1"
echo "   - OPENAI_MODEL=deepseek-chat"
echo "   - NEXTAUTH_URL (您的域名)"
echo "   - NEXTAUTH_SECRET (随机字符串)"
echo ""
echo "2. 🗄️ 设置数据库："
echo "   - 推荐使用 Vercel Postgres 或 Supabase"
echo "   - 数据库会自动初始化 (Prisma migrations)"
echo ""
echo "3. 🔄 重新部署："
echo "   - 配置环境变量后，点击 Vercel 中的 'Redeploy'"
echo ""
echo "4. ✅ 验证部署："
echo "   - 访问您的网站确认功能正常"
echo ""
echo "📖 详细说明请查看 DEPLOY_GUIDE.md"
echo "🎊 祝您部署顺利！"