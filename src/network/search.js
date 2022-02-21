import { request, post } from "./request";

export function homeSearch(key, page, type, state) {
  return request({
    url: "home/search",
    params: {
      key,
      page,
      type,
      state
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