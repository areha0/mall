import { user } from "./user"

export function loginData(params) {
  return user({
    url: '/login',
    data: {
      params
    }
  })
}