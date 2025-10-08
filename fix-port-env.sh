#!/bin/bash

echo "🔧 修复端口环境变量..."

# SSH连接到服务器修复端口环境变量
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 检查.env.production中的PORT设置
send "echo '🔍 检查.env.production中的PORT设置:'\r"
expect "# "
send "cat .env.production | grep PORT\r"
expect "# "

# 移除PORT环境变量（让应用使用默认的3000端口）
send "echo '🗑️ 移除PORT环境变量...'\r"
expect "# "
send "sed -i '/^PORT=/d' .env.production\r"
expect "# "

# 确认修改
send "echo '✅ 确认修改:'\r"
expect "# "
send "cat .env.production | grep -E '(PORT|OPENAI)'\r"
expect "# "

# 停止应用
send "echo '🛑 停止应用...'\r"
expect "# "
send "pm2 stop learning-system\r"
expect "# "

# 重新启动应用
send "echo '🚀 重新启动应用...'\r"
expect "# "
send "pm2 start learning-system\r"
expect "# "

# 等待启动
send "sleep 5\r"
expect "# "

# 检查应用状态和日志
send "echo '📊 检查应用状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

send "echo '📝 检查应用日志:'\r"
expect "# "
send "pm2 logs learning-system --lines 5\r"
expect "# "

# 测试3000端口
send "echo '🧪 测试3000端口:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env | head -5\r"
expect "# "

# 测试通过Nginx的访问
send "echo '🧪 测试Nginx代理:'\r"
expect "# "
send "curl -s http://localhost/api/check-env | head -5\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 端口环境变量修复完成！"

# 最终测试
echo "🧪 最终测试外部API访问..."
curl -s "http://120.24.22.244/api/check-env" | head -10