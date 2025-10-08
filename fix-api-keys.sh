#!/bin/bash

# 修复API密钥配置脚本
echo "🔧 开始修复API密钥配置..."

# SSH连接到服务器并修复环境变量
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244
expect "password:"
send "Lyc001286\r"
expect "# "

# 检查当前环境变量
send "echo '📋 检查当前环境变量...'\r"
expect "# "
send "cd /root/learning-system\r"
expect "# "
send "cat .env.production\r"
expect "# "

# 提示用户输入真实的API密钥
send "echo '⚠️  发现API密钥配置问题！'\r"
expect "# "
send "echo '当前API密钥是假的，需要更新为真实的DeepSeek API密钥'\r"
expect "# "

# 创建备份
send "cp .env.production .env.production.backup\r"
expect "# "
send "echo '✅ 已创建配置文件备份'\r"
expect "# "

# 显示需要更新的内容
send "echo '📝 需要更新以下配置:'\r"
expect "# "
send "echo '1. OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'\r"
expect "# "
send "echo '2. 请确保API密钥有效且有足够的额度'\r"
expect "# "

# 检查PM2状态
send "echo '📊 检查应用状态...'\r"
expect "# "
send "pm2 status\r"
expect "# "

# 退出SSH
send "exit\r"
expect eof
EOF

echo "🔍 API密钥问题诊断完成！"
echo ""
echo "📋 问题总结："
echo "1. ❌ 生产环境的API密钥是假的 (sk-b8b8b8b8...)"
echo "2. ❌ 这导致所有AI功能无法正常工作"
echo "3. ✅ 需要更新为真实的DeepSeek API密钥"
echo ""
echo "🔧 解决方案："
echo "1. 获取真实的DeepSeek API密钥"
echo "2. 更新服务器上的.env.production文件"
echo "3. 重启应用使配置生效"
echo ""
echo "💡 提示：请提供真实的DeepSeek API密钥以继续修复"