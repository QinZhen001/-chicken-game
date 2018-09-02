// 变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor() {
    this.map = new Map()
  }

  put(key, value) {
    //如果传入值是一个函数，就去执行它
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    //为了链式调用
    return this
  }

  delete(key) {
    this.map.delete(key)
  }

  get(key) {
    return this.map.get(key)
  }

  destroy() {
    for (let value of this.map.values()) {
      value = null
    }
  }
}