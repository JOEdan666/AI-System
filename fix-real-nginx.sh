#!/bin/bash

echo "🔧 修复真正的Nginx配置..."

# SSH连接到服务器
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 查看当前配置
send "echo '📋 当前配置:'\r"
expect "# "
send "cat /etc/nginx/conf.d/learning-system.conf\r"
expect "# "

# 备份配置
send "echo '💾 备份配置:'\r"
expect "# "
send "cp /etc/nginx/conf.d/learning-system.conf /etc/nginx/conf.d/learning-system.conf.backup\r"
expect "# "

# 修改配置，将3003改为3000
send "echo '🔧 修改配置:'\r"
expect "# "
send "sed -i 's/proxy_pass http:\\/\\/localhost:3003/proxy_pass http:\\/\\/localhost:3000/g' /etc/nginx/conf.d/learning-system.conf\r"
expect "# "

# 确认修改
send "echo '✅ 确认修改:'\r"
expect "# "
send "cat /etc/nginx/conf.d/learning-system.conf\r"
expect "# "

# 测试配置
send "echo '🧪 测试配置:'\r"
expect "# "
send "nginx -t\r"
expect "# "

# 重新加载Nginx
send "echo '🔄 重新加载Nginx:'\r"
expect "# "
send "systemctl reload nginx\r"
expect "# "

# 测试访问
send "echo '🧪 测试访问:'\r"
expect "# "
send "curl -s http://localhost/api/check-env\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 修复完成！"

# 最终测试
echo "🧪 最终外部测试..."
curl -s "http://120.24.22.244/api/check-env"

echo ""
echo "🧪 测试AI功能..."
curl -X POST "http://120.24.22.244/api/openai-chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"你好，请简单回复一下"}],"stream":false}'