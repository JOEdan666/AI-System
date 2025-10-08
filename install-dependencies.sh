#!/bin/bash

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js 未安装。请先安装 Node.js，然后再运行此脚本。"
    echo "macOS 用户可以使用 Homebrew 安装: brew install node"
    echo "Windows 用户可以访问 https://nodejs.org/ 下载安装包"
    exit 1
fi

# 检查是否安装了 npm
if ! command -v npm &> /dev/null
then
    echo "npm 未安装。请先安装 npm，然后再运行此脚本。"
    exit 1
fi

# 安装项目依赖
echo "开始安装项目依赖..."
npm install

# 构建项目以验证配置
echo "依赖安装完成，开始构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "🎉 项目构建成功！"
    echo "可以使用以下命令启动开发服务器："
    echo "npm run dev"
    echo "然后在浏览器中访问 http://localhost:3000"
else
    echo "❌ 项目构建失败，请检查错误信息并修复问题。"
fi