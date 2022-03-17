import axios from "axios"

export function request(config) {
    const instance = axios.create({
        // baseURL: "http://152.136.185.210:7878/api/hy66",
        // 开始使用自己的api接口
        // baseURL: "http://localhost:3000",
        baseURL: "/api",
        timeout: 5000
    });

    return instance(config)
}

export function post(config) {
    const instance1 = axios.create({
        // baseURL: "http://localhost:3000",
        baseURL: "/api",
        timeout: 5000,
        // 不使用methods时默认是get请求
        method: "post"
    });

    return instance1(config)
}