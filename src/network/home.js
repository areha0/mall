import { request, post } from "./request";

export function homeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

export function homegoods(type, page) {
  return request({
    url: "home/data",
    params: {
      type,
      page
    }
  })
}

export function homeSearch(key) {
  return post({
    url: "home/search",
    data: {
      key
    }
  })
}