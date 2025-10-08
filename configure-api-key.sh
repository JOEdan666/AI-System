#!/bin/bash

# 🔑 配置有效的DeepSeek API密钥
# 使用方法：./configure-api-key.sh YOUR_REAL_API_KEY

echo "🔑 配置DeepSeek API密钥..."

# 检查是否提供了API密钥参数
if [ -z "$1" ]; then
    echo "❌ 错误：请提供有效的DeepSeek API密钥"
    echo "使用方法：./configure-api-key.sh sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    echo ""
    echo "📋 获取API密钥的步骤："
    echo "1. 访问 https://platform.deepseek.com/"
    echo "2. 注册/登录账户"
    echo "3. 进入API密钥管理页面"
    echo "4. 创建新的API密钥"
    echo "5. 复制密钥并运行此脚本"
    exit 1
fi

API_KEY="$1"

# 验证API密钥格式
if [[ ! "$API_KEY" =~ ^sk-[a-zA-Z0-9]{40,}$ ]]; then
    echo "❌ 错误：API密钥格式不正确"
    echo "正确格式应该是：sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    exit 1
fi

echo "✅ API密钥格式验证通过"

# 更新本地开发环境配置
echo "📝 更新本地开发环境配置..."
sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$API_KEY/" .env
echo "✅ 已更新 .env 文件"

# 更新生产环境配置
echo "📝 更新生产环境配置..."
sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$API_KEY/" .env.production
echo "✅ 已更新 .env.production 文件"

# 测试API连接
echo "🧪 测试API连接..."
curl -s -X POST "https://api.deepseek.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }' > /tmp/api_test.json

if grep -q "choices" /tmp/api_test.json; then
    echo "✅ API连接测试成功！"
else
    echo "❌ API连接测试失败，请检查密钥是否有效"
    echo "响应内容："
    cat /tmp/api_test.json
    exit 1
fi

echo ""
echo "🎉 配置完成！"
echo "📋 接下来的步骤："
echo "1. 重启开发服务器：npm run dev"
echo "2. 测试AI功能是否正常工作"
echo "3. 如果需要部署到线上，运行部署脚本"
echo ""
echo "💡 提示：备份文件已保存为 .env.bak 和 .env.production.bak"

# 清理临时文件
rm -f /tmp/api_test.json