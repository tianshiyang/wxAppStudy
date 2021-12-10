class HTTP {
  constructor(options = {}) {
    this.config = {
      base_url = "",
      app_key = ""
    }
    // get请求是否加user_id
    if (options.method
      && options.method.toLowerCaase() === "get"
      && localStorage.getItem("user_id")) {
      // 将user_id添加到data中
      options.data.user_id = localStorage.getItem("user_id")
    }
    // 自动执行request方法
    this.request(options.url, options.method, options.data)
  }
  request(url, method = "get", data = {}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }
  _request(url, resolve, reject, method = "get", data = {}) {
    wx.request({
      url: this.config.base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json",
        "appKey": this.config.app_key
      },
      timeout: 10000,
      success: (res) => {
        const result_code = res.statusCode.toString()
        if(result_code.startsWith(2)) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: () => {
        reject()
        wx.showToast({
          title: "服务器错误"
        })
      },
    })
  }
}
export { HTTP }