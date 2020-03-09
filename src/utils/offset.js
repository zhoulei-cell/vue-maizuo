function offset(el, parent) {
  let top = el.offsetTop
  let topBorderWidth = el.clientTop
  let left = el.offsetLeft
  let leftBorderWidth = el.clientLeft

  // eslint-disable-next-line no-cond-assign
  while (el = el.offsetParent) {
    if (el === parent) {
      break
    }
    top += el.offsetTop
    topBorderWidth += el.clientTop
    left += el.offsetLeft
    leftBorderWidth += el.clientLeft
  }

  top += topBorderWidth
  left += leftBorderWidth

  return {
    top,
    left
  }
}

export default offset
