export default {
  login(username, password) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          reslove(username + Date.now())
        } else {
          reject('登陆失败了')
        }
      }, 1000)
    })
  }, 
  setItem(key,value){
    localStorage.setItem(key,value)
  },
  getItem(key){
    return localStorage.getItem(key)
  }
}
