import { request } from "./request";

export function detailData(iid) {
    return request({
        url: "/detail",
        params: {
            iid,
        }
    })
}

// 详情页商品信息
export class GoodsInfo {
    constructor(itemInfo, shopInfo, columns) {
        this.title = itemInfo.title;
        this.price = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice; //注意: 有的商品没有oldPrice
        this.discountDesc = itemInfo.discountDesc;
        this.discountBgColor = itemInfo.discountBgColor;
        this.services = shopInfo.services;
        this.columns = columns
    }
}

export class Shop {
    constructor(shopInfo) {
        this.name = shopInfo.name;
        this.logo = shopInfo.shopLogo;
        this.cSells = shopInfo.cSells;
        this.cGoods = shopInfo.cGoods;
        this.score = shopInfo.score;
        this.shopUrl = shopInfo.shopUrl
    }
}