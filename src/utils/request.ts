import axios from "axios";
import { Method } from "@/types/request";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VITE_BASE_API?.toString(),
  timeout: 10000,
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // const token = store.getters.userInfo.token;
    // if (token) config.headers["X-Token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 接口未成功
    if (res.header.code !== 0) {
      console.log(res.header.msg || "Error");
      return Promise.reject(res.header.msg || "Error");
    }
    return res;
  },
  (error) => {
    console.log(error.message || "Error");
    return Promise.reject(error);
  }
);
/**
 * 封装接口请求方法
 * @param url 域名后需补齐的接口地址
 * @param method 接口请求方式
 * @param trModuleCode data.header下的交易模块编号
 * @param data 请求数据体
 */
const request = (
  url: string,
  method: Method,
  data: Record<string, unknown>
  // url,
  // method,
  // data
) => {
  // 处理get请求参数拼接
  if ((method === "get" || method === "GET") && data) {
    url += "?";
    for (const key in data) {
      if (!url.endsWith("?")) url += "&&";
      url += `${key}=${data[key]}`;
    }
  }
  return service({
    url,
    method,
    data,
  });
};
export default request;
