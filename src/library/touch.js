/**
 * @原生js封装移动端自定义dom事件
 *
 * 原理: 利用事件委托给内层元素分派事件， 然后通过事件冒泡传播到外层已经添加监听的元素上
 * **/

(function (global, factory) {
  let Touch = factory()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Touch
  // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef
    define(function () { return Touch })
  } else {
    global.Touch = Touch
  }
}(this, function () {
  function Touch(el, options) {
    this.$el = el
    this.$options = options
    this.dblEndTime = 0
    this._init()
  }

  Touch.prototype._init = function () {
    this._initEvent()
    this._initEventConfig()
  }

  Touch.prototype._initEvent = function () {
    this.$el.addEventListener('touchstart', this, false)
    this.$el.addEventListener('touchmove', this, false)
    this.$el.addEventListener('touchend', this, false)
  }

  Touch.prototype._initEventConfig = function () {
    this.$options = this.$options || { tap: true }
    this.$config = {
      tap: '_isTap',
      langTap: '_isLangTap',
      doubleTap: '_isDoubleTap',
      swipe: '_isSwipe'
    }
  }

  Touch.prototype.handleEvent = function (e) {
    e = e || event
    switch (e.type) {
      case 'touchstart':
        this._touchStart(e)
        break
      case 'touchmove':
        this._touchMove(e)
        break
      case 'touchend':
        this._touchEnd(e)
        break
    }
  }

  Touch.prototype._touchStart = function (e) {
    var point = e.changedTouches[0]
    this.startX = point.pageX
    this.startY = point.pageY
    this.startTime = Date.now()
    this.startTarget = e.target
  }

  Touch.prototype._touchMove = function (e) {
    var point = e.changedTouches[0]
    this.moveX = point.pageX
    this.moveY = point.pageY
    this.moveTarget = e.target
    this.isMove = true
  }

  Touch.prototype._touchEnd = function (e) {
    var point = e.changedTouches[0]
    this.endTarget = e.target
    if (this.startTarget === this.endTarget) {
      this.endX = point.pageX
      this.endY = point.pageY
      this.endTime = Date.now()

      this.distX = this.endX - this.startX
      this.distY = this.endY - this.startY

      this.absDistX = Math.abs(this.distX)
      this.absDistY = Math.abs(this.distY)

      this.distTime = this.endTime - this.startTime

      this.$event = e

      this._handleEventType()

      this.dblEndTime = Date.now() // 判断完事件以后在更新时间
    }
  }

  // 全部事件的判断在这个函数里调用
  Touch.prototype._handleEventType = function () {
    for (var key in this.$options) {
      if (this.$options[key]) {
        this[this.$config[key]] && this[this.$config[key]]()
      }
    }
  }

  // tap事件的判断
  Touch.prototype._isTap = function () {
    // 如果时间大于350ms, 则判断为长按事件, tap事件不触发
    if (this.absDistX < 15 && this.absDistY < 15 && this.distTime < 350) {
      var touchEvent = this._touchEvent('tap')
      this.$event.target.dispatchEvent(touchEvent)
    }
  }

  // longTap事件的判断
  Touch.prototype._isLangTap = function () {
    // 时间大于350ms并且没有移动过则判断为长按事件
    if (this.distTime > 350 && !this.isMove) {
      var touchEvent = this._touchEvent('longTap')
      this.$event.target.dispatchEvent(touchEvent)
    }
  }

  // doubleTap事件的判断
  Touch.prototype._isDoubleTap = function () {
    var distTime = this.startTime - this.dblEndTime
    // 两次点击的时间间隔大于0且小于等于250ms
    if (distTime > 0 && distTime <= 250) {
      var touchEvent = this._touchEvent('doubleTap')
      this.$event.target.dispatchEvent(touchEvent)
    }
  }

  // swipe事件的判断
  Touch.prototype._isSwipe = function () {
    if (this.absDistX > 15 || this.absDistY > 15) {
      var detail = { startX: this.startX, startY: this.startY, endX: this.endX, endY: this.endY, distX: this.distX, distY: this.distY, direction: this._swipeDirection() }
      var ev = this._customEvent('swipe', detail)
      this.$event.target.dispatchEvent(ev)
    }
  }

  Touch.prototype._swipeDirection = function () {
    return this.absDistX > this.absDistY ? (this.distX > 0 ? 'right' : 'left') : (this.distY > 0 ? 'down' : 'up')
  }

  Touch.prototype._touchEvent = function (type, detail) {
    var initTouchEvent = {
      bubbles: true, // 事件是否会冒泡
      cancelable: true, // 事件是否可以被取消
      touches: this.$event.touches,
      targetTouches: this.$event.targetTouches,
      changedTouches: this.$event.changedTouches
    }
    var touchEvent = new TouchEvent(type, initTouchEvent)
    return touchEvent
  }

  Touch.prototype._customEvent = function (type, detail) {
    // 创建事件对象：
    var ev = document.createEvent('CustomEvent')
    // 初始化事件对象：
    ev.initCustomEvent(type, true, true, detail)
    return ev
  }

  return Touch
}))
