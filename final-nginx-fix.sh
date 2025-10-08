#!/bin/bash

echo "🔧 最终修复Nginx配置..."

# SSH连接到服务器修复Nginx
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 检查当前Nginx配置
send "echo '🔍 检查当前Nginx配置:'\r"
expect "# "
send "cat /etc/nginx/sites-available/learning-system\r"
expect "# "

# 修改Nginx配置，确保指向3000端口
send "echo '🔧 修改Nginx配置指向3000端口...'\r"
expect "# "
send "sed -i 's/proxy_pass http:\\/\\/localhost:3003/proxy_pass http:\\/\\/localhost:3000/g' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 确认修改
send "echo '✅ 确认修改:'\r"
expect "# "
send "grep 'proxy_pass' /etc/nginx/sites-available/learning-system\r"
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

# 测试通过Nginx的访问
send "echo '🧪 测试通过Nginx访问:'\r"
expect "# "
send "curl -s http://localhost/api/check-env\r"
expect "# "

# 测试AI API
send "echo '🧪 测试AI API:'\r"
expect "# "
send "curl -X POST http://localhost/api/openai-chat -H 'Content-Type: application/json' -d '{\"messages\":[{\"role\":\"user\",\"content\":\"测试\"}],\"stream\":false}'\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ Nginx修复完成！"

# 最终测试外部访问
echo "🧪 最终测试外部访问..."
curl -s "http://120.24.22.244/api/check-env"

echo ""
echo "🧪 测试AI功能..."
curl -X POST "http://120.24.22.244/api/openai-chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"你好"}],"stream":false}' | head -10