#!/bin/bash

# 部署脚本 - 学习系统
echo "🚀 开始部署学习系统到 learning-system.top..."

# 检查环境变量
echo "📋 检查环境变量..."
if [ ! -f ".env.production" ]; then
    echo "❌ 缺少 .env.production 文件"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npx prisma generate

# 同步数据库
echo "🗄️ 同步数据库..."
npx prisma db push

# 构建项目
echo "🏗️ 构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📝 部署说明："
    echo "1. 将项目文件上传到服务器"
    echo "2. 配置域名 learning-system.top 指向服务器"
    echo "3. 运行 'npm start' 启动生产服务器"
    echo "4. 或者使用 Vercel 部署：'vercel --prod'"
else
    echo "❌ 构建失败！请检查错误信息"
    exit 1
fi