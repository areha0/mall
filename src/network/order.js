import { post, request } from "./request"

export function postOrder(params) {
  return post({
    url: "/order",
    data: {
      params
    }
  })
};

export function getorders(username) {
  return request({
    url: "order/allorders",
    params: {
      username
    }
  })
}