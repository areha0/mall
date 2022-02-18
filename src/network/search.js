import { request, post } from "./request";

export function homeSearch(key, page) {
  return request({
    url: "home/search",
    params: {
      key,
      page
    }
  })
}

export function historyKeys(username, key) {
  return post({
    url: "/login/keys",
    data: {
      username,
      key,
    }
  })
}