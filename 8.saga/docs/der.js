// let arr = [1,2,3]
// let it = arr[Symbol.iterator]();

let obj = {
  name: 'anglebaby',
  age: 20,
  [Symbol.iterator]() {
    let that = this
    let values = Object.values(obj)
    let index = 0
    next = () => {
      return {
        value: values[index++],
        done: index > values.length,
      }
    }
  },
}
