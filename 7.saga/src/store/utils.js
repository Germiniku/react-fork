export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = Math.random()
      if (result > 0.5) {
        resolve({ code: 0, data: result })
      } else {
        resolve({ code: 1, error: '发生了错误' })
      }
    }, ms)
  })
}

export const readFile = (filename, callback) => {
  return setTimeout(() => {
    callback(null, (filename = "'s content'"))
  }, 1000)
}
