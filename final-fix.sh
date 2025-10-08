#!/bin/bash

echo "🔧 最终修复API连接问题..."

# SSH连接到服务器进行最终修复
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 停止所有learning-system进程
send "echo '🛑 停止所有进程...'\r"
expect "# "
send "pm2 delete learning-system\r"
expect "# "

# 检查.env.production文件
send "echo '🔍 检查环境变量:'\r"
expect "# "
send "cat .env.production | grep -E '(PORT|OPENAI)'\r"
expect "# "

# 确保没有PORT环境变量冲突，使用默认3000端口
send "echo '🚀 启动应用（使用默认端口3000）...'\r"
expect "# "
send "pm2 start npm --name learning-system -- start\r"
expect "# "

# 等待应用启动
send "sleep 5\r"
expect "# "

# 检查应用状态
send "echo '📊 检查应用状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 检查应用日志
send "echo '📝 检查应用日志:'\r"
expect "# "
send "pm2 logs learning-system --lines 5\r"
expect "# "

# 测试3000端口
send "echo '🧪 测试3000端口:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env | head -10\r"
expect "# "

# 修改Nginx配置指向3000端口
send "echo '🔧 修改Nginx配置指向3000端口...'\r"
expect "# "
send "sed -i 's/proxy_pass http:\\/\\/localhost:3003/proxy_pass http:\\/\\/localhost:3000/g' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 重新加载Nginx
send "echo '🔄 重新加载Nginx...'\r"
expect "# "
send "nginx -t && systemctl reload nginx\r"
expect "# "

# 最终测试
send "echo '🧪 最终测试API:'\r"
expect "# "
send "curl -s http://localhost/api/check-env | head -10\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 最终修复完成！"

# 测试外部访问
echo "🧪 测试外部API访问..."
curl -s "http://120.24.22.244/api/check-env" | head -10