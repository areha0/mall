import { post } from "./request"

export function loginData(params) {
  return post({
    url: '/login',
    data: {
      params
    }
  })
}