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

export function cateGoods(miniWallkey, type) {
    return request({
        url: "/subcategory/detail",
        params: {
            miniWallkey,
            type
        }
    })
}