# 🔑 DeepSeek API密钥获取指南

## 问题诊断
当前AI功能失败的原因是使用了无效的测试API密钥：
```
OPENAI_API_KEY=sk-b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8
```

## 解决方案

### 1. 获取有效的DeepSeek API密钥

1. **访问DeepSeek官网**：https://platform.deepseek.com/
2. **注册/登录账户**
3. **进入API管理页面**
4. **创建新的API密钥**
5. **复制生成的密钥**（格式类似：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

### 2. 更新API密钥

有了有效的API密钥后，运行以下命令更新：

```bash
# 方法1：直接编辑服务器上的配置文件
ssh root@120.24.22.244
cd /var/www/learning-system
nano .env.production
# 将 OPENAI_API_KEY 的值替换为新的有效密钥
pm2 restart learning-system

# 方法2：使用脚本更新（需要先修改脚本中的密钥）
./update-api-key-with-valid-key.sh
```

### 3. 验证修复

更新后，测试以下功能：
- ✅ 普通AI对话
- ✅ 系统AI学习讲解
- ✅ 知识点解答

## 当前状态
- 🟢 **服务器运行正常**：应用在3000端口稳定运行
- 🟢 **Nginx配置正确**：代理设置已修复
- 🟢 **API连接正常**：基础架构工作正常
- 🔴 **API密钥无效**：需要更新为有效的DeepSeek API密钥

## 注意事项
- DeepSeek API密钥通常以 `sk-` 开头
- 密钥长度为48个字符
- 请妥善保管API密钥，不要泄露
- 建议设置API使用限额以控制成本