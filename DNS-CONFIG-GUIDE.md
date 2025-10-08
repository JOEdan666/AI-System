# DNS配置指导

## 🌐 正式DNS配置（推荐）

### 阿里云DNS控制台配置
1. 访问：https://dns.console.aliyun.com/
2. 找到域名 `learning-system.top`
3. 添加以下解析记录：

```
记录类型: A
主机记录: @
解析线路: 默认  
记录值: 120.24.22.244
TTL: 600
```

```
记录类型: A
主机记录: www
解析线路: 默认
记录值: 120.24.22.244  
TTL: 600
```

### DNS生效时间
- 通常需要10分钟到24小时生效
- 可以使用 `nslookup learning-system.top` 检查是否生效

## 🔧 临时本地测试方案

如果您想立即测试域名访问，可以临时修改本地hosts文件：

### macOS/Linux:
```bash
sudo nano /etc/hosts
```
添加这一行：
```
120.24.22.244 learning-system.top
```

### Windows:
1. 以管理员身份打开记事本
2. 打开文件：`C:\Windows\System32\drivers\etc\hosts`
3. 添加这一行：
```
120.24.22.244 learning-system.top
```

## ✅ 验证访问

配置完成后，您可以通过以下方式访问：
- http://learning-system.top
- http://www.learning-system.top

## 🔍 当前服务器状态

- **服务器IP**: 120.24.22.244 ✅ 可访问
- **应用端口**: 3000 ✅ 运行中
- **Nginx代理**: 80端口 ✅ 配置完成
- **数据库**: PostgreSQL ✅ 连接正常
- **AI服务**: DeepSeek API ✅ 配置完成

## 📞 技术支持

如果DNS配置有问题，可以：
1. 联系阿里云客服
2. 检查域名是否已实名认证
3. 确认域名没有被锁定或暂停