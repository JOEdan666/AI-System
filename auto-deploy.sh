#!/bin/bash

# 阿里云ECS自动部署脚本
# 在服务器上运行部署脚本

# 配置变量
SERVER_IP="120.24.22.244"
SERVER_USER="root"
SERVER_PATH="/var/www/learning-system"
SERVER_PASSWORD="Lyc001286"

echo "🚀 开始在阿里云ECS服务器上部署项目..."

# 检查expect是否安装
if ! command -v expect &> /dev/null; then
    echo "⚠️ expect未安装，正在安装..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install expect
    else
        # Linux
        sudo apt-get update && sudo apt-get install -y expect
    fi
fi

# 创建expect脚本来运行部署
cat > deploy_expect.exp << EOF
#!/usr/bin/expect -f
set timeout 600
spawn ssh $SERVER_USER@$SERVER_IP
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$SERVER_PASSWORD\r" }
}

expect "# "
send "cd $SERVER_PATH\r"
expect "# "
send "chmod +x deploy-aliyun.sh\r"
expect "# "
send "./deploy-aliyun.sh\r"

# 等待部署完成
expect {
    "部署完成" { 
        send "exit\r"
        expect eof
    }
    "✅" {
        send "exit\r" 
        expect eof
    }
    timeout {
        send "exit\r"
        expect eof
    }
}
EOF

chmod +x deploy_expect.exp

echo "📦 在服务器上运行部署脚本..."
./deploy_expect.exp

# 清理临时文件
rm -f deploy_expect.exp

echo "✅ 部署脚本执行完成！"
echo ""
echo "🌐 您的网站应该已经可以通过以下地址访问："
echo "http://$SERVER_IP:3003"
echo "http://learning-system.top (需要域名解析)"
echo ""
echo "下一步: 配置SSL证书和域名解析"