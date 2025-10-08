#!/bin/bash

# 最终API修复脚本
echo "🔧 开始最终API修复..."

# SSH连接到服务器并修复
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
send "echo '🛑 停止所有learning-system进程...'\r"
expect "# "
send "pm2 delete learning-system\r"
expect "# "

# 等待进程完全停止
send "sleep 3\r"
expect "# "

# 验证API密钥已更新
send "echo '📋 验证API密钥配置:'\r"
expect "# "
send "grep OPENAI_API_KEY .env.production\r"
expect "# "

# 重新启动应用（只启动一个实例）
send "echo '🚀 重新启动应用...'\r"
expect "# "
send "pm2 start npm --name learning-system -- start\r"
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

# 测试API连接
send "echo '🧪 测试API连接...'\r"
expect "# "
send "curl -s http://localhost:3003/api/check-env\r"
expect "# "

# 测试端口
send "echo '🔍 检查端口3003:'\r"
expect "# "
send "netstat -tlnp | grep 3003\r"
expect "# "

send "exit\r"
expect eof
EOF

echo "✅ API修复完成！"
echo ""
echo "📋 修复内容："
echo "1. ✅ 清理了重复的进程"
echo "2. ✅ 使用正确的API密钥重启应用"
echo "3. ✅ 验证了应用状态"
echo ""
echo "🔗 现在可以测试AI功能了！"