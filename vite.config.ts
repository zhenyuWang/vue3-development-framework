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
  // const proxyTarget = "https://zhgt.yuanzhiyijiantong.com";
  // 测试环境
  // const proxyTarget = "http://10.1.69.118:8814";
  // 仝康本地
  const proxyTarget = "http://10.2.53.60:8811";
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
