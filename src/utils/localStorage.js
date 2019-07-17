export const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const find = (key, defaultValue) => {
  const value = window.localStorage.getItem(key)

  return value ? JSON.parse(value) : defaultValue
}