function fetch (url, {
  method,
  headers,
  body
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      header: headers,
      data: body,
      dataType: 'text',
      success ({ data, statusCode, header }) {
        resolve({
          body: data,
          status: statusCode,
          headers: header,
          json () {
            return JSON.parse(data)
          },
          text () {
            return Promise.resolve(data)
          }
        })
      },
      fail (e) {
        reject(e)
      }
    })
  })
}

export default fetch
