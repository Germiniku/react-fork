export function take(actionType) {
  return {
    type: 'TAKE',
    actionType,
  }
}

export function put(action) {
  return {
    type: 'PUT',
    action,
  }
}

export function fork(task) {
  return {
    type: 'FORK',
    task,
  }
}

export function call(fn, ...args) {
  return {
    type: 'CALL',
    fn,
    args,
  }
}

export function delay(...args) {
  return call(innerDelay, args)
}

const innerDelay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })

// takeEvery相当于要开启一个新的子进程 单独监听actionType
// 当动作发生的时候去执行迭代器
export function* takeEvery(actionType, generator) {
  yield fork(function* () {
    while (true) {
      yield take(actionType) // ASYNC_INCREMENT
      yield generator() // increment
    }
  })
}

export function* cps(fn, ...args) {
  return {
    type: 'CPS',
    fn,
    args,
  }
}
export function all(fns) {
  return {
    type: 'ALL',
    fns,
  }
}

export function cancel(task) {
  return {
    type: 'CANCEL',
    task,
  }
}
