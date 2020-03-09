/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
;(function (global, factory) {
  // eslint-disable-next-line no-undef
  typeof module === 'object' && module.exports ? module.exports = factory() : typeof define === 'function' && define.amd ? define(function () { return factory() }) : global.Rem = factory()
})(this, function () {
  function Rem(options) {
    this.scale = 1
    this.options = options
    this.bodyEl = document.body
    this.htmlEl = document.documentElement
    this.metaEl = document.querySelector('meta[name="viewport"]')
    this.init()
  }

  Rem.prototype.init = function () {
	  this.setDpr()
	  this.setMeta()
	  this.resize()
	  this.event()
  }

  Rem.prototype.setDpr = function () {
	  this.dpr = Math.round(window.devicePixelRatio)

	  if (this.options.scale) {
      this.scale = 1 / this.dpr
	  }
	  this.htmlEl.setAttribute('data-dpr', this.dpr)
  }

  Rem.prototype.setMeta = function () {
	  let content = 'width=device-width, initial-scale=' + this.scale + ',maximum-scale=' + this.scale + ',minimum-scale=' + this.scale + ',user-scalable=no'
	  if (this.metaEl) {
      this.metaEl.setAttribute('content', content)
	  } else {
      this.metaEl = document.createElement('meta')
      this.metaEl.setAttribute('name', 'viewport')
      this.metaEl.setAttribute('content', content)
      document.head.appendChild(this.metaEl)
	  }
  }

  Rem.prototype.resize = function () {
	  let width = this.htmlEl.getBoundingClientRect().width
	  let rem = width / 10 // 把屏幕分成10份
	  /* if (this.options.scale) {
		rem = width * this.dpr / 10
	  } */
	  this.rem = rem
	  this.htmlEl.style.fontSize = rem + 'px'
	  this.bodyEl.style.fontSize = 12 + 'px'
  }

  Rem.prototype.px2rem = function (px, designWidth) {
	  return parseFloat(px, 10) / designWidth * 10
  }

  Rem.prototype.rem2px = function (rem, designWidth) {
	  return parseFloat(rem, 10) * designWidth / 10
  }

  Rem.prototype.event = function () {
	  window.addEventListener('load', this.resize.bind(this))
	  window.addEventListener('resize', this.resize.bind(this))
  }

  return Rem
})
