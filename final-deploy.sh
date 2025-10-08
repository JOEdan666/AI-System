#!/bin/bash

# 最终部署脚本
echo "🚀 开始最终部署..."

# 创建expect脚本
cat > final_deploy.exp << 'EOF'
#!/usr/bin/expect -f
set timeout 300
spawn ssh root@120.24.22.244
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "Lyc001286\r" }
}

expect "# "
send "cd /var/www/learning-system\r"
expect "# "

send "echo '🔧 开始部署应用...'\r"
expect "# "

# 安装cnpm以提高下载速度
send "npm install -g cnpm --registry=https://registry.npmmirror.com\r"
expect "# "

# 安装PM2
send "cnpm install -g pm2\r"
expect "# "

# 安装项目依赖
send "cnpm install --force\r"
expect "# "

# 生成Prisma客户端
send "npx prisma generate\r"
expect "# "

# 运行数据库迁移
send "npx prisma migrate deploy\r"
expect "# "

# 停止可能存在的应用
send "pm2 stop learning-system 2>/dev/null || true\r"
expect "# "

# 启动应用
send "PORT=3003 pm2 start npm --name learning-system -- start\r"
expect "# "

# 检查PM2状态
send "pm2 status\r"
expect "# "

# 配置Nginx
send "dnf install -y nginx\r"
expect "# "

send "cat > /etc/nginx/conf.d/learning-system.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name learning-system.top www.learning-system.top 120.24.22.244;

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
NGINX_EOF\r"
expect "# "

# 测试Nginx配置
send "nginx -t\r"
expect "# "

# 启动Nginx
send "systemctl enable nginx\r"
expect "# "
send "systemctl restart nginx\r"
expect "# "

# 配置防火墙
send "firewall-cmd --permanent --add-service=http\r"
expect "# "
send "firewall-cmd --permanent --add-port=3003/tcp\r"
expect "# "
send "firewall-cmd --reload\r"
expect "# "

# 最终检查
send "echo '✅ 部署完成！'\r"
expect "# "
send "echo '🌐 访问地址: http://120.24.22.244'\r"
expect "# "
send "echo '🌐 域名访问: http://learning-system.top'\r"
expect "# "

send "pm2 status\r"
expect "# "

send "curl -I http://localhost:3003\r"
expect "# "

send "exit\r"
expect eof
EOF

chmod +x final_deploy.exp
./final_deploy.exp

# 清理
rm -f final_deploy.exp

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 您的网站现在可以通过以下地址访问："
echo "   http://120.24.22.244"
echo "   http://learning-system.top (需要配置域名解析)"
echo ""
echo "📋 下一步："
echo "   1. 配置域名解析，将 learning-system.top 指向 120.24.22.244"
echo "   2. 运行 SSL 配置: ./setup-ssl.sh learning-system.top"