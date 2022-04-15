import axios from "axios"
import router from "../router/index"
import { Notify } from 'vant';

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
    instance1.interceptors.request.use(
        (config) => {
            if (!localStorage.getItem("userInfo")) {
                localStorage.setItem("userInfo", "{}")
            };
            let token = JSON.parse(localStorage.getItem("userInfo")).token;
            if (token) config.headers.Authorization = `Bearer ${token}`
            return config
        }
    );
    instance1.interceptors.response.use(
        response => response,
        error => {
            console.dir(error);
            let { status, data } = error.response;
            if (status == 401) {
                Notify({ type: "danger", message: data });
                router.push("/login");

            }
        }
    )

    return instance1(config)
}