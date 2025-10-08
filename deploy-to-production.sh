#!/bin/bash

# 生产环境部署脚本
# 目标服务器: learning-system.top (120.24.22.244)

set -e

echo "🚀 开始部署到生产环境..."

# 服务器信息
SERVER_IP="120.24.22.244"
SERVER_USER="root"
SERVER_PASSWORD="Lyc001286"
APP_DIR="/var/www/learning-system"
DOMAIN="learning-system.top"

echo "📦 构建生产版本..."
npm run build

echo "📁 创建部署包..."
# 创建临时目录
TEMP_DIR="./deploy-temp"
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR

# 复制必要文件
cp -r .next $TEMP_DIR/
cp -r public $TEMP_DIR/
cp -r prisma $TEMP_DIR/
cp package.json $TEMP_DIR/
cp package-lock.json $TEMP_DIR/
cp next.config.js $TEMP_DIR/
cp .env.production $TEMP_DIR/.env
cp -r app $TEMP_DIR/

# 创建压缩包
tar -czf learning-system-deploy.tar.gz -C $TEMP_DIR .

echo "📤 上传到服务器..."
# 使用expect自动化SSH连接和文件传输
expect << EOF
set timeout 30
spawn scp learning-system-deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/
expect {
    "password:" {
        send "$SERVER_PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF

echo "🔧 在服务器上部署..."
expect << EOF
set timeout 60
spawn ssh $SERVER_USER@$SERVER_IP
expect {
    "password:" {
        send "$SERVER_PASSWORD\r"
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
}

expect "# "

# 停止现有服务
send "pm2 stop learning-system || true\r"
expect "# "

# 创建应用目录
send "mkdir -p $APP_DIR\r"
expect "# "

# 解压应用
send "cd $APP_DIR && rm -rf * && tar -xzf /tmp/learning-system-deploy.tar.gz\r"
expect "# "

# 安装依赖
send "cd $APP_DIR && npm install --production\r"
expect "# "

# 运行数据库迁移
send "cd $APP_DIR && npx prisma generate\r"
expect "# "
send "cd $APP_DIR && npx prisma db push\r"
expect "# "

# 配置PM2
send "cd $APP_DIR && pm2 start npm --name 'learning-system' -- start\r"
expect "# "

# 保存PM2配置
send "pm2 save\r"
expect "# "

# 配置Nginx
send "cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX_EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
NGINX_EOF\r"
expect "# "

# 启用站点
send "ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/\r"
expect "# "

# 测试Nginx配置
send "nginx -t\r"
expect "# "

# 重启Nginx
send "systemctl restart nginx\r"
expect "# "

# 检查服务状态
send "pm2 status\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "🧹 清理临时文件..."
rm -rf $TEMP_DIR
rm learning-system-deploy.tar.gz

echo "✅ 部署完成！"
echo "🌐 网站地址: http://$DOMAIN"
echo "📊 服务器状态: ssh $SERVER_USER@$SERVER_IP"