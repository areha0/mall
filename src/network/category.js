import { request } from "./request"

export function categoryList() {
    return request({
        url: '/category'
    })
}