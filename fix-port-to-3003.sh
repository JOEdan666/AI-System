#!/bin/bash

# 修复端口冲突 - 将应用改回3003端口
echo "正在修复端口配置，将应用改回3003端口..."

# 连接到服务器并修改Nginx配置
expect << 'EOF'
set timeout 30
spawn ssh root@120.24.22.244

expect {
    "password:" {
        send "Fang962222\r"
        exp_continue
    }
    "# " {
        # 修改Nginx配置文件，将proxy_pass改回3003端口
        send "sed -i 's/proxy_pass http:\\/\\/localhost:3000/proxy_pass http:\\/\\/localhost:3003/g' /etc/nginx/sites-available/learning-system\r"
        expect "# "
        
        # 也检查conf.d目录下的配置
        send "sed -i 's/proxy_pass http:\\/\\/localhost:3000/proxy_pass http:\\/\\/localhost:3003/g' /etc/nginx/conf.d/learning-system.conf 2>/dev/null || true\r"
        expect "# "
        
        # 测试Nginx配置
        send "nginx -t\r"
        expect "# "
        
        # 重新加载Nginx
        send "systemctl reload nginx\r"
        expect "# "
        
        # 停止可能在3000端口运行的应用
        send "pm2 stop all\r"
        expect "# "
        
        # 重新启动应用在3003端口
        send "cd /root/learning-system\r"
        expect "# "
        
        send "PORT=3003 pm2 start npm --name learning-system -- start\r"
        expect "# "
        
        # 检查应用状态
        send "pm2 status\r"
        expect "# "
        
        # 检查端口占用
        send "netstat -tlnp | grep :300\r"
        expect "# "
        
        send "exit\r"
    }
}
expect eof
EOF

echo "端口配置修复完成！"
echo "应用现在应该运行在3003端口"
echo "请访问 http://120.24.22.244/ 查看您的应用"