#!/bin/bash

# 阿里云ECS自动上传脚本
# 使用expect自动处理密码输入

# 配置变量
SERVER_IP="120.24.22.244"
SERVER_USER="root"
SERVER_PATH="/var/www/learning-system"
SERVER_PASSWORD="Lyc001286"

echo "📤 准备自动上传项目到阿里云 ECS..."

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

# 创建上传排除列表
echo "📋 创建上传排除列表..."
cat > .upload-exclude << EOF
node_modules/
.next/
.git/
.env.local
.env.development
.env.test
dev.db
*.log
.DS_Store
.vscode/
.claude/
auto-upload.sh
project.tar.gz
EOF

# 构建项目
echo "🏗️ 构建项目..."
npm run build

# 创建expect脚本来处理SSH密码
cat > ssh_expect.exp << EOF
#!/usr/bin/expect -f
set timeout 30
spawn ssh $SERVER_USER@$SERVER_IP "mkdir -p $SERVER_PATH"
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$SERVER_PASSWORD\r" }
}
expect eof
EOF

chmod +x ssh_expect.exp

echo "📁 在服务器上创建目录..."
./ssh_expect.exp

# 创建项目压缩包
echo "📦 创建项目压缩包..."
tar --exclude-from=.upload-exclude -czf project.tar.gz .

# 创建expect脚本来上传文件
cat > scp_expect.exp << EOF
#!/usr/bin/expect -f
set timeout 300
spawn scp project.tar.gz $SERVER_USER@$SERVER_IP:$SERVER_PATH/
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$SERVER_PASSWORD\r" }
}
expect eof
EOF

chmod +x scp_expect.exp

echo "📤 上传项目文件到服务器..."
./scp_expect.exp

# 创建expect脚本来解压文件
cat > extract_expect.exp << EOF
#!/usr/bin/expect -f
set timeout 60
spawn ssh $SERVER_USER@$SERVER_IP "cd $SERVER_PATH && tar -xzf project.tar.gz && rm project.tar.gz"
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$SERVER_PASSWORD\r" }
}
expect eof
EOF

chmod +x extract_expect.exp

echo "📂 在服务器上解压项目文件..."
./extract_expect.exp

# 创建expect脚本来上传环境配置
cat > env_expect.exp << EOF
#!/usr/bin/expect -f
set timeout 30
spawn scp .env.production $SERVER_USER@$SERVER_IP:$SERVER_PATH/.env
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "$SERVER_PASSWORD\r" }
}
expect eof
EOF

chmod +x env_expect.exp

echo "📤 上传生产环境配置..."
./env_expect.exp

# 清理临时文件
echo "🧹 清理临时文件..."
rm -f project.tar.gz ssh_expect.exp scp_expect.exp extract_expect.exp env_expect.exp

echo "✅ 项目上传完成！"
echo "📍 服务器路径: $SERVER_PATH"
echo "🔗 服务器IP: $SERVER_IP"
echo ""
echo "下一步: 在服务器上运行部署脚本"
echo "ssh $SERVER_USER@$SERVER_IP"
echo "cd $SERVER_PATH"
echo "./deploy-aliyun.sh"