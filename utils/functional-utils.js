export function curry(cb, ...args) {
  return (...args2) => {
    return cb(...args2, ...args);
  }
}