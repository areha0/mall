import { user } from "./user"

export function postShop(params) {
  return user({
    url: '/shopcart',
    data: {
      params
    }
  })
}