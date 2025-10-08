#!/bin/bash

echo "🔍 检查应用状态..."

# SSH连接到服务器
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 检查PM2状态
send "echo '📊 PM2状态:'\r"
expect "# "
send "pm2 list\r"
expect "# "

# 检查应用日志
send "echo '📋 应用日志:'\r"
expect "# "
send "pm2 logs learning-system --lines 20\r"
expect "# "

# 检查端口监听
send "echo '🔌 端口监听:'\r"
expect "# "
send "netstat -tlnp | grep 3000\r"
expect "# "

# 直接测试端口
send "echo '🧪 直接测试端口:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 检查完成！"