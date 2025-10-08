#!/bin/bash

echo "🔧 完整修复API连接问题..."

# SSH连接到服务器进行完整修复
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 进入项目目录
send "cd /var/www/learning-system\r"
expect "# "

# 完全停止并删除learning-system进程
send "echo '🛑 完全停止learning-system进程...'\r"
expect "# "
send "pm2 delete learning-system\r"
expect "# "

# 检查是否还有残留进程
send "echo '🔍 检查残留进程:'\r"
expect "# "
send "ps aux | grep node | grep -v grep\r"
expect "# "

# 杀死可能占用3003端口的进程
send "echo '🗡️ 清理端口占用:'\r"
expect "# "
send "lsof -ti:3003 | xargs kill -9 2>/dev/null || echo '没有进程占用3003端口'\r"
expect "# "

# 检查.env.production文件
send "echo '🔍 检查环境变量文件:'\r"
expect "# "
send "cat .env.production\r"
expect "# "

# 创建一个新的启动脚本，明确不使用3003端口
send "echo '📝 创建启动脚本...'\r"
expect "# "
send "cat > start-app.js << 'SCRIPT'\nprocess.env.PORT = '3000';\nrequire('child_process').spawn('npm', ['start'], {\n  stdio: 'inherit',\n  env: { ...process.env, PORT: '3000' }\n});\nSCRIPT\r"
expect "# "

# 使用新脚本启动应用
send "echo '🚀 使用新脚本启动应用...'\r"
expect "# "
send "pm2 start start-app.js --name learning-system\r"
expect "# "

# 等待应用启动
send "sleep 8\r"
expect "# "

# 检查应用状态
send "echo '📊 检查应用状态:'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 检查应用日志
send "echo '📝 检查应用日志:'\r"
expect "# "
send "pm2 logs learning-system --lines 10\r"
expect "# "

# 检查端口监听
send "echo '🔍 检查端口监听:'\r"
expect "# "
send "netstat -tlnp | grep -E ':(3000|3003)'\r"
expect "# "

# 测试3000端口
send "echo '🧪 测试3000端口API:'\r"
expect "# "
send "curl -s http://localhost:3000/api/check-env\r"
expect "# "

# 确保Nginx配置正确
send "echo '🔧 确保Nginx配置正确...'\r"
expect "# "
send "grep 'proxy_pass' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 如果需要，修改Nginx配置
send "sed -i 's/proxy_pass http:\\/\\/localhost:3003/proxy_pass http:\\/\\/localhost:3000/g' /etc/nginx/sites-available/learning-system\r"
expect "# "

# 重新加载Nginx
send "echo '🔄 重新加载Nginx...'\r"
expect "# "
send "nginx -t && systemctl reload nginx\r"
expect "# "

# 最终测试
send "echo '🧪 最终测试通过Nginx:'\r"
expect "# "
send "curl -s http://localhost/api/check-env\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ 完整修复完成！"

# 等待一下让服务器完全启动
echo "⏳ 等待服务器完全启动..."
sleep 5

# 最终测试外部访问
echo "🧪 最终测试外部API访问..."
curl -s "http://120.24.22.244/api/check-env"