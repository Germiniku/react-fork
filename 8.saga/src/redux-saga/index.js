export default function createSagaMiddleware() {
  function createChannel() {
    let observer = {}
    publish = (action) => {
      if (observer[action.type]) {
        let next = observer[action.type]
        delete observer[action.type]
        next(action)
      }
    }
    subscribe = (actionType, callback) => {
      observer[actionType] = callback
    }
    return { publish, subscribe }
  }
  let channel = createChannel()
  function sagaMiddleware({ dispatch, getState }) {
    function run(generator, callback) {
      console.log('开始自动执行这个generator')
      let it =
        typeof generator[Symbol.iterator] == 'function'
          ? generator
          : generator()
      function next(nextValue) {
        let { value: effect, done } = it.next(nextValue)
        if (!done) {
          if (typeof effect[Symbol.iterator] == 'function') {
            run(effect)
            next()
          } else if (typeof effect.then == 'function') {
            effect.then(next())
          } else {
            switch (effect.type) {
              case 'TAKE': // take的意思监听某个动作,当动作发生当时候执行下一个动作
                channel.subscribe(effect.actionType, next)
                break
              case 'PUT': // 向仓库派发动作 {type: "PUT",action:increment}
                dispatch(effect.action)
                next()
                break
              case 'FORK':
                let newTask = run(effect.task) // 如果是fork的话就开启一个新的子进程去执行
                run(newTask)
                next(newTask) // 自己的saga会立刻继续执行 而不会再次等待
                break

              case 'CANCEL':
                  effect.task.return('任务直接结束')
                break
              case 'CALL':
                effect.fn(...effect.args).then(next())
                break
              case 'CPS':
                effect.fn(...effect.args, next)
                break
              case 'ALL':
                function times(callback, length) {
                  let count = 0
                  return function () {
                    if (++count == length) {
                      callback()
                    }
                  }
                }
                let fns = effect.fns
                let done = times(next, fns.length)
                effect.fns.forEach((fn) => run(fn, done))
                next()
                break
              default:
                break
            }
          }
        } else {
          callback && callback()
        }
      }
      next()
    }
    sagaMiddleware.run = run
    return function (next) {
      return function (action) {
        channel.publish(action)
        next(action)
      }
    }
  }
  return sagaMiddleware
}
