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
  return post({
    url: "order/allorders",
    data: {
      username
    }
  })
}