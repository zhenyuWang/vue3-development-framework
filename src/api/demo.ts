import request from "../utils/request";
import { Method } from "@/types/request";
const curryRequest = (
  url: string,
  method: Method,
  data?: Record<string, unknown> | any
) => {
  return request(`/demo/${url}`, method, data);
};

// request demo
export function apiDemo(): Promise<any> {
  return curryRequest("demo", "get");
}
