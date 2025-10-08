#!/bin/bash

echo "🔧 修复Nginx端口配置..."

# SSH连接到服务器并修复Nginx配置
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 备份当前Nginx配置
send "echo '💾 备份Nginx配置...'\r"
expect "# "
send "cp /etc/nginx/sites-available/learning-system /etc/nginx/sites-available/learning-system.backup\r"
expect "# "

# 修改Nginx配置，将3003改为3000
send "echo '🔧 修改Nginx配置...'\r"
expect "# "
send "sed -i 's/proxy_pass http:\\/\\/localhost:3003/proxy_pass http:\\/\\/localhost:3000/g' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 检查修改后的配置
send "echo '🔍 检查修改后的配置:'\r"
expect "# "
send "grep -n 'proxy_pass' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 测试Nginx配置
send "echo '🧪 测试Nginx配置...'\r"
expect "# "
send "nginx -t\r"
expect "# "

# 重新加载Nginx
send "echo '🔄 重新加载Nginx...'\r"
expect "# "
send "systemctl reload nginx\r"
expect "# "

# 检查Nginx状态
send "echo '📊 检查Nginx状态:'\r"
expect "# "
send "systemctl status nginx --no-pager\r"
expect "# "

# 测试连接
send "echo '🧪 测试API连接:'\r"
expect "# "
send "curl -s http://localhost/api/check-env | head -10\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ Nginx端口配置修复完成！"