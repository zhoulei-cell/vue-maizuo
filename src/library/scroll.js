
(function (global, factory) {
  let Scroll = factory()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Scroll
  // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef
    define(function () { return Scroll })
  } else {
    global.Scroll = Scroll
  }
}(this, function () {
  const utils = {
    offset: function (el, parentEl) {
      let top = el.offsetTop
      let topBorderWidth = el.clientTop
      let left = el.offsetLeft
      let leftBorderWidth = el.clientLeft
      // eslint-disable-next-line no-cond-assign
      while (el = el.offsetParent) {
        if (el === parentEl) {
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
  }
  function Scroll(el, options) {
    this.x = 0
    this.y = 0
    this.startX = 0
    this.startY = 0

    this.$el = el
    this.$options = options
    this.$scrollElement = el.firstElementChild

    this.isInTransition = false

    this._events = {}

    this.isPullingDown = true
    this.isPullingUp = true
    this.isScroll = false

    this.init()
  }

  Scroll.prototype.init = function () {
    this._initEvent()
    this.refresh()
    this._initTransition()
  }

  Scroll.prototype.refresh = function () {
    this.elWidth = this.$el.clientWidth
    this.elHeight = this.$el.clientHeight
    this.scrollWidth = this.$scrollElement.offsetWidth
    this.scrollHieght = this.$scrollElement.offsetHeight

    this.maxScrollX = this.elWidth - this.scrollWidth
    this.maxScrollY = this.elHeight - this.scrollHieght
  }

  Scroll.prototype._initEvent = function () {
    this.$el.addEventListener('touchstart', this, false)
    this.$el.addEventListener('touchmove', this, false)
    this.$el.addEventListener('touchend', this, false)
    this.$scrollElement.addEventListener('transitionend', this, false)
  }

  Scroll.prototype.handleEvent = function (e) {
    e = e || event
    switch (e.type) {
      case 'touchstart':
        this._touchStart(e)
        break
      case 'touchmove':
        e.preventDefault()
        this._touchMove(e)
        break
      case 'touchend':
        this._touchEnd(e)
        break
      case 'transitionend':
        this._transitionEnd(e)
        break
    }
  }

  Scroll.prototype._touchStart = function (e) {
    let point = e.changedTouches[0]
    this.startX = this.x
    this.startY = this.y
    this.pointX = point.pageX
    this.pointY = point.pageY
    this.startTime = Date.now()
    this.moved = false

    if (this.isInTransition) {
      this.isInTransition = false
      let pos = this.getComputedPosition()
      this._transitionDuration(0)
      this.scrollTo(pos.x, pos.y)
      if (!this._checkPoint()) {
        this.emit('scrollEnd', this.getComputedPosition())
      }
    }
  }

  Scroll.prototype._touchMove = function (e) {
    let point = e.changedTouches[0]
    let moveTime = Date.now()
    let distX = point.pageX - this.pointX
    let distY = point.pageY - this.pointY

    this.pointX = point.pageX
    this.pointY = point.pageY

    let newX = this.x + distX
    let newY = this.y + distY

    if (Math.abs(newX) > Math.abs(newY)) {
      newY = 0
      if (this.elWidth >= this.scrollWidth) {
        this.x = 0
        this.isScroll = true
        return null
      }
    } else {
      newX = 0
      if (this.elHeight >= this.scrollHieght) {
        this.y = 0
        this.isScroll = true
        return null
      }
    }

    if (newX > 0 || newX < this.maxScrollX) {
      newX = this.x + distX / 4
    }

    if (newY > 0 || newY < this.maxScrollY) {
      newY = this.y + distY / 4
    }

    if (!this.moved) {
      this.emit('scrollStart', this.getComputedPosition())
    }
    this.moved = true

    this.scrollTo(newX, newY)

    if (moveTime - this.startTime > 300) {
      this.startTime = moveTime
      this.startX = this.x
      this.startY = this.y
    }

    if (this.$options.probeType > 1) {
      this.emit('scroll', this.getComputedPosition()) // 实时监听滚动...
    }
  }

  Scroll.prototype._touchEnd = function (e) {
    let duration = Date.now() - this.startTime

    let newX = this.x
    let newY = this.y

    if (this.isScroll) {
      this.isScroll = false
      return null
    }

    this.scrollTo(newX, newY)

    if (this._checkPoint()) {
      return null
    }

    if (duration < 300) {
      this.isInTransition = true
      let momentumX = this.momentum(this.x, this.startX, duration, this.maxScrollX, 0, 0.0006)
      let momentumY = this.momentum(this.y, this.startY, duration, this.maxScrollY, 0, 0.0006)
      newX = momentumX.destination
      newY = momentumY.destination
      let time = Math.max(momentumX.duration, momentumY.duration)
      this.scrollTo(newX, newY, time, 'cubic-bezier(0.23, 1, 0.32, 1)')
      this.getPoint() // 触发监听动画函数
    }

    if (!this.isInTransition) {
      this.emit('scrollEnd', this.getComputedPosition())
    }
  }

  Scroll.prototype._transitionEnd = function (e) {
    e = e || event
    if (e.propertyName === 'transform') {
      this.isInTransition = false
      this._transitionDuration(0)
    }
  }

  Scroll.prototype.scrollTo = function (x, y, time, ease) {
    time = time || 0
    this._transitionDuration(time)
    ease && this._transitionTimingFunction(ease)
    this._translate(x, y)
  }

  Scroll.prototype.scrollToElement = function (el, time, ease) {
    let offset = utils.offset(el, this.$el)
    this.scrollTo(0, -offset.top, time, ease)
  }

  Scroll.prototype._initTransition = function () {
    this.$scrollElement.style.transitionProperty = 'transform'
  }

  Scroll.prototype._translate = function (x, y) {
    this.x = x
    this.y = y
    this.$scrollElement.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  Scroll.prototype._transitionDuration = function (time) {
    this.$scrollElement.style.transitionDuration = time + 'ms'
  }

  Scroll.prototype._transitionTimingFunction = function (ease) {
    this.$scrollElement.style.transitionTimingFunction = ease
  }

  Scroll.prototype._checkPoint = function () {
    let x = this.x
    let y = this.y

    if (x > 0) {
      x = 0
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX
    }

    if (y > 0) {
      y = 0
      if (this.isPullingDown) {
        this.emit('pullingDown')
        this.isPullingDown = false
      }
    } else if (y < this.maxScrollY) {
      y = this.maxScrollY
      if (this.isPullingUp) {
        this.emit('pullingUp')
        this.isPullingUp = false
      }
    }

    if (x === this.x && y === this.y) {
      return false
    }
    this.isInTransition = true
    this.scrollTo(0, y, 800, 'cubic-bezier(0.165, 0.84, 0.44, 1)')
    this.getPoint()
    return true
  }

  Scroll.prototype.getComputedPosition = function () {
    let matrix = window.getComputedStyle(this.$scrollElement, null)
    let x; let y
    matrix = matrix['transform'].split(')')[0].split(', ')
    x = +(matrix[12] || matrix[4])
    y = +(matrix[13] || matrix[5])

    return { x: x, y: y }
  }

  Scroll.prototype.getPoint = function () {
    let timer = 0
    let _this = this;
    (function fn() {
      _this.emit('scroll', _this.getComputedPosition())
      if (_this.isInTransition) {
        window.cancelAnimationFrame(timer)
        timer = window.requestAnimationFrame(fn)
      } else {
        _this.emit('scrollEnd', _this.getComputedPosition())
        window.cancelAnimationFrame(timer)
      }
    }())
  }

  Scroll.prototype.finishPullDown = function () {
    this.isPullingDown = true
  }

  Scroll.prototype.finishPullUp = function () {
    this.isPullingUp = true
  }

  Scroll.prototype.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
    // current为当前位置, start为开始位置, distance就是开始走了多少距离,
    var distance = current - start // 当前的速度
    var speed = Math.abs(distance) / time
    var destination
    var duration

    deceleration = deceleration === undefined ? 0.0006 : deceleration

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1)
    duration = speed / deceleration

    if (destination < lowerMargin) {
      destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin
      distance = Math.abs(destination - current)
      duration = distance / speed
    } else if (destination > 0) {
      destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0
      distance = Math.abs(current) + destination
      duration = distance / speed
    }

    return {
      destination: Math.round(destination),
      duration: duration
    }
  }

  Scroll.prototype.on = function (type, handler) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    this._events[type].push(handler)
  }

  Scroll.prototype.emit = function (type, ...arg) {
    let event = this._events[type] || []
    if (event.length < 1) {
      return null
    }
    event.forEach(item => {
      item.call(this, ...arg)
    })
  }

  Scroll.prototype.remove = function (type, handler) {
    let event = this._events[type] || []
    if (event.length < 1) {
      return null
    }
    this._events[type] = event.filter(item => {
      if (item !== handler) {
        return handler
      }
    })
  }

  return Scroll
}))
