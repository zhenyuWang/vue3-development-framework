import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  // 处理使用import.meta.env jest 测试报错问题
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        // 环境变量添加process.env
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );

  // 生产环境
  // const proxyTarget = "https://xxx.com";
  // 测试环境
  const proxyTarget = "http://xxx.com";
  return {
    base: "./",
    server: {
      open: true,
      port: 3000,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
    plugins: [vue()],
    define: envWithProcessPrefix,
  };
};
