// 支付完成后发送请求,看下订单的支付状态
import { post } from "./request"

export function postpayment(params) {
  return post({
    url: "/payment",
    data: {
      params
    }
  })
}