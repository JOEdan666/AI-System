#!/bin/bash

# 阿里云 ECS 部署脚本 - 学习系统
echo "🚀 开始在阿里云 ECS 上部署学习系统..."

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 root 用户或 sudo 运行此脚本"
    exit 1
fi

# 更新系统
echo "📦 更新系统包..."
yum update -y

# 安装 Node.js 18
echo "📦 安装 Node.js 18..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# 安装 PM2 进程管理器
echo "📦 安装 PM2..."
npm install -g pm2

# 安装 Nginx
echo "📦 安装 Nginx..."
yum install -y nginx

# 创建应用目录
echo "📁 创建应用目录..."
mkdir -p /var/www/learning-system
cd /var/www/learning-system

# 如果是从本地上传，跳过 git clone
if [ ! -f "package.json" ]; then
    echo "❌ 请先将项目文件上传到 /var/www/learning-system 目录"
    echo "可以使用 scp 或 rsync 命令上传文件"
    exit 1
fi

# 安装依赖
echo "📦 安装项目依赖..."
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

# 创建 PM2 配置文件
echo "⚙️ 创建 PM2 配置..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'learning-system',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/learning-system',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3003
    }
  }]
}
EOF

# 启动应用
echo "🚀 启动应用..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 配置 Nginx
echo "⚙️ 配置 Nginx..."
cat > /etc/nginx/conf.d/learning-system.conf << EOF
server {
    listen 80;
    server_name learning-system.top www.learning-system.top;

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 启动 Nginx
echo "🌐 启动 Nginx..."
systemctl enable nginx
systemctl start nginx

# 配置防火墙
echo "🔥 配置防火墙..."
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

echo "✅ 部署完成！"
echo ""
echo "📋 部署信息："
echo "- 应用目录: /var/www/learning-system"
echo "- 应用端口: 3003 (内部)"
echo "- Nginx 端口: 80, 443"
echo "- PM2 进程名: learning-system"
echo ""
echo "🔧 常用命令："
echo "- 查看应用状态: pm2 status"
echo "- 查看应用日志: pm2 logs learning-system"
echo "- 重启应用: pm2 restart learning-system"
echo "- 查看 Nginx 状态: systemctl status nginx"
echo ""
echo "🌐 访问地址: http://learning-system.top"
echo ""
echo "⚠️  下一步："
echo "1. 配置域名 DNS 解析到此服务器 IP"
echo "2. 安装 SSL 证书 (推荐使用 Let's Encrypt)"
echo "3. 运行 SSL 配置脚本: ./setup-ssl.sh"