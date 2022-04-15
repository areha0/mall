import { post } from "./request"

export function registerData(params) {
  return post({
    url: '/register',
    data: {
      params
    },
  })
}