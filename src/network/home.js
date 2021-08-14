import { request } from "./request";

export function homeMultidata() {
    return request({
        url: "/home/multidata"
    })
}