import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
const eslintPlugin = await import("vite-plugin-eslint").then((m) => m.default);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],

  resolve: {
    // 设置路径别名，简化导入路径
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // 构建配置
  build: {
    // 构建目标浏览器，支持现代浏览器
    target: "esnext",

    // 输出目录
    outDir: "dist",

    // 静态资源目录
    assetsDir: "assets",

    // 生成源码映射，便于调试
    sourcemap: false, // 生产环境关闭，减小文件体积

    // 构建时是否清空输出目录
    emptyOutDir: true,

    // Rollup配置
    rollupOptions: {
      output: {
        // 手动代码分割策略，将不同功能的代码分离到不同chunk
        manualChunks: {
          // 核心React库
          vendor: ["react", "react-dom"],

          // 路由相关库
          router: ["react-router"],

          // 数据状态管理库
          query: ["@tanstack/react-query", "@tanstack/react-query-devtools"],

          // UI组件和样式库
          ui: [
            "styled-components",
            "react-hot-toast",
            "react-hook-form",
            "react-icons",
          ],

          // 图表库
          charts: ["recharts"],

          // 日期处理库
          utils: ["date-fns"],

          // 认证相关
          auth: ["react-error-boundary"],
        },

        // 资源文件命名规则
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // chunk大小警告限制（KB）
    chunkSizeWarningLimit: 1000,

    // 压缩配置
    minify: "terser",
    terserOptions: {
      compress: {
        // 移除console
        drop_console: true,
        // 移除debugger
        drop_debugger: true,
      },
    },

    // CSS代码分割
    cssCodeSplit: true,
  },

  // 开发服务器配置
  server: {
    // 端口号
    port: 5173,

    // 自动打开浏览器
    open: true,
  },

  // 预览服务器配置
  preview: {
    port: 4173,
    open: true,
  },

  // 依赖优化配置
  optimizeDeps: {
    // 预构建包含的依赖
    include: [
      "react",
      "react-dom",
      "react-router",
      "@tanstack/react-query",
      "styled-components",
      "react-hot-toast",
      "recharts",
      "date-fns",
    ],
  },

  // CSS配置
  css: {
    // CSS模块化配置
    modules: false,

    // PostCSS配置
    postcss: {},

    // CSS预处理器配置
    preprocessorOptions: {},
  },
});
