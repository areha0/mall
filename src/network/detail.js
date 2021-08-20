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

export class Particular {
    constructor(detailInfo) {
        this.name = detailInfo.desc;
        this.imgList = detailInfo.detailImage
    }
}

export class Params {
    constructor(info, rule) {
        this.table = rule.tables;
        this.set = info.set;
        this.image = info.images ? info.images[0] : ""
    }
}

export class Comment {
    constructor(rate) {
        this.userImg = rate.list[0].user.avatar;
        this.name = rate.list[0].user.uname;
        this.content = rate.list[0].content;
        this.time = rate.list[0].created;
        this.style = rate.list[0].style;
        this.imgs = rate.list[0].images ? rate.list[0].images : ""
    }
}

// 详情页推荐数据
export function recommend() {
    return request({
        url: "recommend"
    })
}