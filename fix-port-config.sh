#!/bin/bash

echo "🔧 修复端口配置..."

# SSH连接到服务器并修复端口配置
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 检查当前应用运行端口
send "echo '📊 检查当前应用状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 检查应用日志确认端口
send "echo '📝 检查应用端口:'\r"
expect "# "
send "pm2 logs learning-system --lines 5\r"
expect "# "

# 检查Nginx配置
send "echo '🔍 检查Nginx配置:'\r"
expect "# "
send "cat /etc/nginx/sites-available/learning-system\r"
expect "# "

# 停止当前应用
send "echo '🛑 停止应用...'\r"
expect "# "
send "pm2 stop learning-system\r"
expect "# "

# 设置端口环境变量并重启
send "echo '🚀 使用正确端口重启应用...'\r"
expect "# "
send "PORT=3003 pm2 start learning-system\r"
expect "# "

# 等待应用启动
send "sleep 5\r"
expect "# "

# 检查应用状态
send "echo '📊 检查应用状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 检查端口监听
send "echo '🔍 检查端口3003:'\r"
expect "# "
send "netstat -tlnp | grep 3003\r"
expect "# "

# 测试本地连接
send "echo '🧪 测试本地连接:'\r"
expect "# "
send "curl -s http://localhost:3003/api/check-env | head -10\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 端口配置修复完成！"