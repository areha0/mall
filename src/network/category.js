import { request } from "./request"

export function categoryList() {
    return request({
        url: '/category'
    })
}

export function cateSubIcon(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}