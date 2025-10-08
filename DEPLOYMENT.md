# 学习系统部署指南

## 域名信息
- 域名：learning-system.top
- 数据库：PostgreSQL (阿里云RDS)

## 部署选项

### 选项 1: 阿里云 ECS 部署（推荐）

#### 1.1 准备阿里云 ECS 服务器
- 操作系统：CentOS 7/8 或 Ubuntu 18.04+
- 配置：至少 2核4G 内存
- 网络：开放 80、443、22 端口

#### 1.2 上传项目文件
```bash
# 1. 修改上传脚本中的服务器 IP
vim upload-to-aliyun.sh
# 将 YOUR_SERVER_IP 替换为您的阿里云 ECS 公网 IP

# 2. 运行上传脚本
./upload-to-aliyun.sh
```

#### 1.3 服务器部署
```bash
# 1. 登录服务器
ssh root@YOUR_SERVER_IP

# 2. 进入项目目录
cd /var/www/learning-system

# 3. 运行部署脚本
./deploy-aliyun.sh

# 4. 配置 SSL 证书
./setup-ssl.sh
```

#### 1.4 配置域名解析
在阿里云域名控制台添加 DNS 记录：
- 类型：A
- 主机记录：@
- 记录值：您的 ECS 公网 IP
- TTL：600

### 选项 2: Vercel 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署到生产环境**
   ```bash
   vercel --prod
   ```

4. **配置自定义域名**
   - 在 Vercel 控制台中添加域名 `learning-system.top`
   - 配置 DNS 记录指向 Vercel

### 选项 2: 服务器部署

1. **运行部署脚本**
   ```bash
   ./deploy.sh
   ```

2. **启动生产服务器**
   ```bash
   npm start
   ```

### 选项 3: Docker 部署

1. **构建 Docker 镜像**
   ```bash
   docker build -t learning-system .
   ```

2. **运行容器**
   ```bash
   docker run -p 3000:3000 --env-file .env.production learning-system
   ```

## 环境变量配置

确保以下环境变量已正确配置：

```env
# 数据库
DATABASE_URL="postgresql://JOEdan:962222mini%23@pgm-wz9e83um4mxsop2yvo.pg.rds.aliyuncs.com:5432/pgm-wz9e83um4mxsop2y"

# DeepSeek API
OPENAI_API_KEY="your-deepseek-api-key"
OPENAI_BASE_URL="https://api.deepseek.com"
OPENAI_MODEL="deepseek-chat"

# NextAuth
NEXTAUTH_URL="https://learning-system.top"
NEXTAUTH_SECRET="your-secret-key"

# 环境
NODE_ENV="production"
```

## 数据库设置

数据库已配置并同步，包含以下表：
- User（用户）
- LearningItem（学习项目）
- KnowledgeBaseItem（知识库）
- LearningSession（学习会话）
- UserAnswer（用户答案）
- LearningProgress（学习进度）
- Conversation（对话记录）

## 域名配置

1. **DNS 设置**
   - 将 `learning-system.top` 的 A 记录指向服务器 IP
   - 或者将 CNAME 记录指向 Vercel 域名

2. **SSL 证书**
   - Vercel 自动提供 SSL 证书
   - 服务器部署需要手动配置 SSL

## 验证部署

部署完成后，访问以下页面验证功能：

1. 主页：`https://learning-system.top`
2. 学习界面：`https://learning-system.top/learning-interface`
3. API 测试：`https://learning-system.top/api/health`

## 故障排除

1. **数据库连接问题**
   - 检查 DATABASE_URL 是否正确
   - 确认数据库服务器可访问

2. **API 调用失败**
   - 验证 DeepSeek API 密钥
   - 检查网络连接

3. **构建失败**
   - 运行 `npm run build` 检查错误
   - 确保所有依赖已安装

## 监控和维护

- 定期检查应用日志
- 监控数据库性能
- 备份重要数据
- 更新依赖包