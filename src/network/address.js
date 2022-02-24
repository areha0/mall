import { post } from "./request"

export function postaddress(username, addressArr) {
  return post({
    url: "/login/address",
    data: {
      username,
      addressArr
    }
  })
}