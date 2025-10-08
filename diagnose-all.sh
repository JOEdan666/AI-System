#!/bin/bash

echo "🔍 综合诊断服务器配置..."

# SSH连接到服务器进行全面诊断
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 检查PM2状态
send "echo '📊 PM2状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 检查端口监听
send "echo '🔍 端口监听状态:'\r"
expect "# "
send "netstat -tlnp | grep -E ':(3000|3003)'\r"
expect "# "

# 检查Nginx配置
send "echo '🔧 Nginx配置:'\r"
expect "# "
send "cat /etc/nginx/sites-available/learning-system | grep -A5 -B5 proxy_pass\r"
expect "# "

# 检查Nginx错误日志
send "echo '📝 Nginx错误日志:'\r"
expect "# "
send "tail -10 /var/log/nginx/error.log\r"
expect "# "

# 检查应用日志
send "echo '📝 应用日志:'\r"
expect "# "
send "pm2 logs learning-system --lines 10\r"
expect "# "

# 测试本地3000端口
send "echo '🧪 测试本地3000端口:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env | head -5\r"
expect "# "

# 测试本地3003端口
send "echo '🧪 测试本地3003端口:'\r"
expect "# "
send "curl -s http://localhost:3003/api/check-env | head -5\r"
expect "# "

# 检查防火墙状态
send "echo '🔥 防火墙状态:'\r"
expect "# "
send "ufw status\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 诊断完成！"