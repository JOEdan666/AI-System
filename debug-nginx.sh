#!/bin/bash

echo "🔍 调试Nginx问题..."

# SSH连接到服务器调试
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 检查Nginx错误日志
send "echo '📋 检查Nginx错误日志:'\r"
expect "# "
send "tail -20 /var/log/nginx/error.log\r"
expect "# "

# 检查应用是否在3000端口运行
send "echo '🔍 检查3000端口:'\r"
expect "# "
send "netstat -tlnp | grep 3000\r"
expect "# "

# 检查Nginx配置
send "echo '📋 检查Nginx配置:'\r"
expect "# "
send "cat /etc/nginx/sites-available/learning-system | grep -A5 -B5 proxy_pass\r"
expect "# "

# 测试直接访问3000端口
send "echo '🧪 直接测试3000端口:'\r"
expect "# "
send "curl -I http://localhost:3000/api/check-env\r"
expect "# "

# 检查防火墙
send "echo '🔍 检查防火墙:'\r"
expect "# "
send "iptables -L | grep 3000\r"
expect "# "

# 检查SELinux
send "echo '🔍 检查SELinux:'\r"
expect "# "
send "getenforce\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 调试完成！"