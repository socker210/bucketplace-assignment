const listener = {}

export const on = (event, func) => {
  listener[event] = func
}

export const emit = (event, ...args) => {
  listener[event](...args)
}