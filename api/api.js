import { HTTP as request } from "../utils/http.js"
const API = {
  testApi(params) {
    return new request({
      url: "test",
      method: "get",
      data: params
    })
  }
}
export { API }