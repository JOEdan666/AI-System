#!/bin/bash

# 构建应用并重启服务的脚本

echo "🔧 开始构建和重启应用..."

# 使用expect自动化SSH连接
expect << 'EOF'
set timeout 300
spawn ssh root@120.24.22.244

expect "password:"
send "Lyc001286\r"

expect "# "
send "cd /var/www/learning-system\r"

expect "# "
send "echo '🛑 停止当前应用...'\r"

expect "# "
send "pm2 stop learning-system || true\r"

expect "# "
send "echo '🔨 构建生产版本...'\r"

expect "# "
send "npm run build\r"

expect "# "
send "echo '✅ 构建完成，启动应用...'\r"

expect "# "
send "PORT=3003 pm2 start npm --name learning-system -- start\r"

expect "# "
send "echo '⏳ 等待应用启动...'\r"

expect "# "
send "sleep 10\r"

expect "# "
send "echo '🔍 检查应用状态...'\r"

expect "# "
send "pm2 status\r"

expect "# "
send "echo '🔍 检查应用日志...'\r"

expect "# "
send "pm2 logs learning-system --lines 10\r"

expect "# "
send "echo '🔍 测试本地连接...'\r"

expect "# "
send "curl -I http://localhost:3003\r"

expect "# "
send "echo '🔧 重启Nginx...'\r"

expect "# "
send "systemctl restart nginx\r"

expect "# "
send "echo '🔍 最终测试...'\r"

expect "# "
send "curl -I http://localhost\r"

expect "# "
send "exit\r"

expect eof
EOF

echo "✅ 构建和重启完成！"
echo "🌐 请重新访问: http://120.24.22.244"