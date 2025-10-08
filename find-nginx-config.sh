#!/bin/bash

echo "🔍 查找并修复Nginx配置..."

# SSH连接到服务器
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 查找Nginx配置文件
send "echo '🔍 查找Nginx配置文件:'\r"
expect "# "
send "find /etc/nginx -name '*learning*' -o -name '*3003*'\r"
expect "# "

# 查看所有站点配置
send "echo '📋 查看所有站点配置:'\r"
expect "# "
send "ls -la /etc/nginx/sites-available/\r"
expect "# "
send "ls -la /etc/nginx/sites-enabled/\r"
expect "# "

# 查看主配置文件
send "echo '📋 查看主配置文件:'\r"
expect "# "
send "grep -r '3003' /etc/nginx/\r"
expect "# "

# 查看默认配置
send "echo '📋 查看默认配置:'\r"
expect "# "
send "cat /etc/nginx/sites-available/default | grep -A10 -B10 proxy_pass\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 查找完成！"