#!/bin/bash

# 修复502 Bad Gateway错误的诊断和修复脚本

SERVER_IP="120.24.22.244"
SERVER_USER="root"
SERVER_PATH="/var/www/learning-system"

echo "🔍 开始诊断502错误..."

# 使用expect自动化SSH连接和诊断
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244

expect "password:"
send "Lyc001286\r"

expect "# "
send "echo '🔍 检查PM2状态...'\r"

expect "# "
send "pm2 status\r"

expect "# "
send "echo '🔍 检查应用日志...'\r"

expect "# "
send "pm2 logs learning-system --lines 20\r"

expect "# "
send "echo '🔍 检查端口占用...'\r"

expect "# "
send "netstat -tlnp | grep :3003\r"

expect "# "
send "echo '🔍 检查Nginx配置...'\r"

expect "# "
send "cat /etc/nginx/sites-available/learning-system\r"

expect "# "
send "echo '🔍 检查Nginx状态...'\r"

expect "# "
send "systemctl status nginx\r"

expect "# "
send "echo '🔧 重启应用...'\r"

expect "# "
send "cd /var/www/learning-system\r"

expect "# "
send "pm2 restart learning-system\r"

expect "# "
send "echo '⏳ 等待应用启动...'\r"

expect "# "
send "sleep 5\r"

expect "# "
send "echo '🔍 检查应用是否在正确端口运行...'\r"

expect "# "
send "curl -I http://localhost:3003\r"

expect "# "
send "echo '🔧 重启Nginx...'\r"

expect "# "
send "systemctl restart nginx\r"

expect "# "
send "echo '✅ 修复完成，检查最终状态...'\r"

expect "# "
send "pm2 status\r"

expect "# "
send "systemctl status nginx --no-pager\r"

expect "# "
send "curl -I http://localhost\r"

expect "# "
send "exit\r"

expect eof
EOF

echo "✅ 诊断和修复完成！"
echo "🌐 请重新访问: http://120.24.22.244"