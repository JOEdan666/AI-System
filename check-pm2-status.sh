#!/bin/bash

echo "🔍 检查PM2状态并重启..."

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
send "echo '📋 检查PM2进程:'\r"
expect "# "
send "pm2 list\r"
expect "# "

# 重启所有进程并更新环境变量
send "echo '🔄 重启并更新环境变量:'\r"
expect "# "
send "pm2 restart all --update-env\r"
expect "# "

# 等待启动
send "sleep 5\r"
expect "# "

# 测试API
send "echo '🧪 测试API:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env\r"
expect "# "

# 测试AI功能
send "echo '🧪 测试AI功能:'\r"
expect "# "
send "curl -X POST http://localhost:3000/api/openai-chat -H 'Content-Type: application/json' -d '{\"messages\":[{\"role\":\"user\",\"content\":\"你好\"}],\"stream\":false}'\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ PM2重启完成！"

# 最终外部测试
echo "🧪 最终外部测试..."
curl -X POST "http://120.24.22.244/api/openai-chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"你好，这是最终测试"}],"stream":false}'