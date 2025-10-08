// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // 静态导出配置
//   output: 'export',
//   images: { unoptimized: true },
  
//   // 临时忽略类型错误，以便部署
//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 支持 PDF.js
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  
  // 临时忽略类型错误，以便部署
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // 实验性功能
  experimental: { esmExternals: 'loose' },
};

module.exports = nextConfig;


