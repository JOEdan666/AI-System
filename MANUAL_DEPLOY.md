# 手动部署指南

## 服务器信息
- 服务器IP: 120.24.22.244
- 用户名: root
- 密码: Lyc001286
- 项目路径: /var/www/learning-system

## 部署步骤

### 1. 连接到服务器
```bash
ssh root@120.24.22.244
# 输入密码: Lyc001286
```

### 2. 进入项目目录
```bash
cd /var/www/learning-system
```

### 3. 检查项目文件
```bash
ls -la
# 确认项目文件已经上传
```

### 4. 安装PM2（如果还没安装）
```bash
# 方法1: 使用npm
npm install -g pm2

# 方法2: 如果npm慢，使用cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install -g pm2
```

### 5. 安装项目依赖
```bash
# 方法1: 使用npm
npm install --force

# 方法2: 使用cnpm（推荐，速度更快）
cnpm install --force
```

### 6. 生成Prisma客户端
```bash
npx prisma generate
```

### 7. 运行数据库迁移
```bash
npx prisma migrate deploy
```

### 8. 启动应用
```bash
# 停止可能存在的进程
pm2 stop learning-system 2>/dev/null || true

# 启动应用
PORT=3003 pm2 start npm --name learning-system -- start

# 检查状态
pm2 status
pm2 logs learning-system
```

### 9. 配置Nginx
```bash
# 安装Nginx（如果还没安装）
dnf install -y nginx

# 创建Nginx配置文件
cat > /etc/nginx/conf.d/learning-system.conf << 'EOF'
server {
    listen 80;
    server_name learning-system.top www.learning-system.top 120.24.22.244;

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 测试Nginx配置
nginx -t

# 启动Nginx
systemctl enable nginx
systemctl restart nginx

# 检查Nginx状态
systemctl status nginx
```

### 10. 检查防火墙设置
```bash
# 检查防火墙状态
firewall-cmd --state

# 如果防火墙开启，添加HTTP规则
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-port=3003/tcp
firewall-cmd --reload
```

### 11. 验证部署
```bash
# 检查应用是否运行
curl http://localhost:3003

# 检查通过Nginx的访问
curl http://localhost

# 检查PM2状态
pm2 status
pm2 logs learning-system --lines 50
```

## 访问地址
部署完成后，您可以通过以下地址访问：
- 直接访问: http://120.24.22.244
- 域名访问: http://learning-system.top （需要配置域名解析）

## 故障排除

### 如果应用无法启动
```bash
# 查看详细日志
pm2 logs learning-system

# 检查环境变量
cat .env

# 手动启动测试
PORT=3003 npm start
```

### 如果Nginx无法访问
```bash
# 检查Nginx错误日志
tail -f /var/log/nginx/error.log

# 检查Nginx配置
nginx -t

# 重启Nginx
systemctl restart nginx
```

### 如果数据库连接失败
```bash
# 检查数据库连接
npx prisma db pull

# 重新生成客户端
npx prisma generate
```

## 下一步：配置SSL证书
部署完成后，可以运行SSL配置脚本：
```bash
./setup-ssl.sh learning-system.top
```