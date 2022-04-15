import { post } from "./request"

export function postShop(params) {
  return post({
    url: '/shopcart',
    data: {
      params
    }
  })
}