
function debounce(fn, delay) {
  let timer
  return function (...arg) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

export default debounce
