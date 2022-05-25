import axios from "axios";
import { Method } from "@/types/request";

const service = axios.create({
  baseURL: process.env.VITE_BASE_API?.toString(),
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
 * @param data 请求数据体
 */
const request = (
  url: string,
  method: Method,
  data: Record<string, unknown>
) => {
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
