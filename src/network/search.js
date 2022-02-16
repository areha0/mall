import { request } from "./request";

export function homeSearch(key, page) {
  return request({
    url: "home/search",
    params: {
      key,
      page
    }
  })
}