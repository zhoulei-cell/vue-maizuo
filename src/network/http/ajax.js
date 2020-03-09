;(function anonymous(global, factory) {
  // eslint-disable-next-line no-undef
  typeof module === 'object' && module.exports ? module.exports = factory() : typeof define === 'function' && define.amd ? define(function () { return factory() }) : global.ajax = factory()
})(this, function () {
  'use strict'

  let toString = Object.prototype.toString
  function isObject(obj) {
    return toString.call(obj) === '[object Object]'
  }

  function Ajax(options) {
    // eslint-disable-next-line new-cap
    return new Ajax.fn.init(options)
  }

  Ajax.fn = Ajax.prototype = {
    constructor: Ajax,
    init: function (options) {
      this._initOptions(options)

      this._beforeRequest(options)

      this._transformUrl()
      this._transformParams()

      return this.xhr()
    },
    xhr: function () {
      let _this = this
      return new Promise((resolve, reject) => {
        this.xhr = new XMLHttpRequest()

        if (this.options.responseType) {
          // 设置响应类型
          this.xhr.responseType = this.options.responseType
        }

        if (this.options.timeout) {
          this.xhr.timeout = this.options.timeout
        }

        this.xhr.open(this.options.method.toUpperCase(), this.options.url, true)

        this.xhr.onerror = function () {
          reject(new Error('** An error occurred during the transaction!'))
        }

        this.xhr.ontimeout = function () {
          reject(new Error('request timeout!'))
        }

        this.xhr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status >= 200 && this.status <= 300) {
            let responseData = _this.responseType !== 'text' ? this.response : this.responseText
            responseData = _this._parse(responseData)

            let responseHeaders = this.getAllResponseHeaders()
            _this.response = {
              data: responseData,
              status: this.status,
              statusText: this.statusText,
              headers: responseHeaders,
              config: _this.options,
              request: this
            }

            _this._afterResponse(_this.response)

            resolve(_this.response)
          }
        }

        // 设置请求头
        Object.keys(this.options.headers).forEach(key => {
          this.xhr.setRequestHeader(key, this.options.headers[key])
        })

        this.xhr.send(this.options.data)
      })
    },
    _initOptions: function (options) {
      this.options = this.options || options
      this.options.method = this.options.method || 'GET'
      this.options.headers = this.options.headers || {}
      this.options.data = this.options.data || null
    },
    _transformUrl: function () {
      if (!this.options.params) {
        return
      }
      if (isObject(this.options.params)) {
        let arr = Object.keys(this.options.params).map(key => {
          return key + '=' + this.options.params[key]
        })
        let keyValue = arr.join('&')
        let indexOf = this.options.url.indexOf('#')
        if (indexOf !== -1) {
          this.options.url = this.options.url.slice(0, indexOf)
        }
        this.options.url += this.options.url.indexOf('?') !== -1 ? '&' + keyValue : '?' + keyValue
      }
    },
    _transformParams: function () {
      if (isObject(this.options.data)) {
        this.options.data = JSON.stringify(this.options.data)
      }
    },
    _parse: function (data) {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (e) {
          // do some
        }
      }
      return data
    },
    _beforeRequest: function (options) {
      if (Ajax.request) {
        this.options = Ajax.request(options) // 请求之前调用
      }
    },
    _afterResponse: function (response) {
      if (Ajax.response) { // 请求之后调用
        this.response = Ajax.response(response)
      }
    }
  }

  Ajax.fn.init.prototype = Ajax.fn

  return Ajax
})
