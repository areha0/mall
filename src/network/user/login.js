import { user } from "./user"

export function loginData() {
  return user({
    url: '/login'
  })
}