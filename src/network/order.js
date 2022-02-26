import { post } from "./request"

export function postOrder(params) {
  return post({
    url: "/order",
    data: {
      params
    }
  })
}