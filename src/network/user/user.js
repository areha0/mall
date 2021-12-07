import axios from "axios"

export function user(config) {
  const instance1 = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
  });

  return instance1(config)
}