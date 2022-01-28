import axios from "axios"

export function request(config) {
    const instance = axios.create({
        // baseURL: "http://152.136.185.210:7878/api/hy66",
        // 开始使用自己的api接口
        baseURL: "http://localhost:3000",
        timeout: 5000
    });

    return instance(config)
}