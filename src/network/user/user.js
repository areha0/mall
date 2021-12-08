import axios from "axios"

export function user(config) {
  const instance1 = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    // 不使用methods时默认是get请求
    method: "post"
  });

  return instance1(config)
}