#!/bin/bash

echo "🔍 检查服务器配置..."

# SSH连接到服务器检查配置
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 检查配置文件
send "echo '📋 检查.env.production:'\r"
expect "# "
send "cat .env.production\r"
expect "# "

# 检查是否有其他配置文件
send "echo '📋 检查其他env文件:'\r"
expect "# "
send "ls -la .env*\r"
expect "# "

# 检查PM2进程环境变量
send "echo '📋 检查PM2环境变量:'\r"
expect "# "
send "pm2 env learning-system\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 检查完成！"