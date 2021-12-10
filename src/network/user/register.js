import { user } from "./user"

export function registerData(params) {
  return user({
    url: '/register',
    data: {
      params
    },
  })
}