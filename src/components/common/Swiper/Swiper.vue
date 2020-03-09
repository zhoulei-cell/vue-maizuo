<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" @transitionend="transitionEnd($event)">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination">
      <span v-for="(item, index) in pageCount" :key="index" class="swiper-pagination-item" :class="{active: index === currentIndex - 1}"></span>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button swiper-button-prev iconfont icon-xiangzuoanniu" v-if="navigation" @click="prev()"></div>
    <div class="swiper-button swiper-button-next iconfont icon-zuo" v-if="navigation" @click="next()"></div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    autoplay: { // 是否自动轮播
      type: Boolean,
      default: true
    },
    interval: { // 多少毫秒轮播一次
      type: Number,
      default: 3000
    },
    duration: { // 滑块滑动的过渡时间
      type: Number,
      default: 300
    },
    moveRadio: { // 滑动的比例
      type: Number,
      default: 0.3
    },
    pagination: {
      type: Boolean,
      default: true
    },
    navigation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 1, // 当前显示哪一个滑块
      startX: 0, // 开始拖动时的位置
      swiper: null, // swiper元素
      slideCount: 0, // 滑块的个数
      pageCount: 0, // 分页器个数
      scrolling: false, // 是否在滚动
      timer: 0 // 定时器
    }
  },
  methods: {
    touchStart(e) {
      if (this.scrolling) { // 如果还在滚动，就不允许拖动
        return null
      }
      // 拖动的时候停止定时器
      this.stopTimer()
      // 保存开始拖动时的位置
      this.startX = e.changedTouches[0].pageX
    },
    touchMove(e) {
      if (this.scrolling) { // 如果还在滚动，就不允许拖动
        return null
      }
      // 保存拖动时的位置
      let moveX = e.changedTouches[0].pageX
      // 计算拖动的距离
      let distance = moveX - this.startX
      // 计算当前的元素位置
      let currentPosition = -this.currentIndex * this.slideWidth
      // 计算拖动后的位置
      let movePosition = currentPosition + distance
      this.setTransform(movePosition)
    },
    touchEnd(e) {
      if (this.scrolling) { // 如果还在滚动，就不允许拖动
        return null
      }
      // 保存拖动结束时的位置
      let endX = e.changedTouches[0].pageX
      // 计算拖动的距离
      let distance = endX - this.startX
      // 计算拖动到多少滑动到下一张
      let isSlide = Math.abs(distance) >= this.slideWidth * this.moveRadio
      if (distance === 0) { // 等于0直接退出此函数，不进行任何操作
        return null
      } else if (distance > 0 && isSlide) { // 如果distance大于0则向右滑动
        this.currentIndex--
      } else if (distance < 0 && isSlide) { // 如果distance小于0则向左滑动
        this.currentIndex++
      }
      // 滑动处理
      this.slideHandler()
    },
    transitionEnd(e) {
      if (e.propertyName === 'transform') {
        this.checkPosition() // 动画完成后校验位置是否超出边界
        this.startTimer() // 拖动完成后重新开启定时器
      }
    },
    handleDom() {
      let children = this.$children
      this.slideCount = children.length // 获取当前滑块的个数
      this.pageCount = this.slideCount // 获取当前分页器的个数
      this.swiper = this.$el.firstElementChild // 获取拖动的swiper元素
      if (this.slideCount > 0) {
        let first = children[0].$el
        // this.swiper = this.$el.firstElementChild // 获取拖动的swiper元素
        // console.log(this.swiper)
        this.slideWidth = first.offsetWidth // 获取一个滑块的宽度
        let cloneFirst = first.cloneNode(true) // 克隆第一个滑块
        let cloneLast = children[this.slideCount - 1].$el.cloneNode(true) // 克隆最后一个滑块

        this.swiper.appendChild(cloneFirst) // 将第一个的克隆滑块添加到swiper元素内的最后
        this.swiper.insertBefore(cloneLast, first) // 将最后一个的克隆滑块添加到swiper元素内的最前
        this.slideCount = this.slideCount + 2 // 重新计算滑块的个数
        this.setTransform(-this.currentIndex * this.slideWidth) // 设置位置
      }
    },
    setTransform(position) {
      this.swiper.style.transform = `translate3d(${position}px, 0, 0)`
      this.swiper.style['-webkit-transform'] = `translate3d(${position}px, 0, 0)`
      this.swiper.style['-ms-transform'] = `translate3d(${position}px, 0, 0)`
      this.swiper.style['-moz-transform'] = `translate3d(${position}px, 0, 0)`
      this.swiper.style['-o-transform'] = `translate3d(${position}px, 0, 0)`
    },
    checkPosition() {
      if (this.currentIndex === 0) { // 如果等于0就说明划到最后一个了
        this.currentIndex = this.slideCount - 1 - 1 // 重新设置到用户能看到的最后元素对应的index上
      } else if (this.currentIndex === this.slideCount - 1) { // 如果小于slideCount -1 就说明划到第一个了
        this.currentIndex = 1 // 重新设置到用户能看到的第一个元素的index上
      }
      this.swiper.style.transition = `transform 0ms`
      this.setTransform(-this.currentIndex * this.slideWidth) // 不需要动画，得立刻跳到对应index的元素
      this.scrolling = false // 滚动结束
    },
    slideHandler() {
      this.scrolling = true // 正在滚动中...
      this.swiper.style.transition = `transform ${this.duration}ms`
      // 设置元素位置
      this.setTransform(-this.currentIndex * this.slideWidth)
      // 校验位置是否超出边界
      // this.checkPosition() //需要等动画完成后才能调用此函数
    },
    changed(num) { // 改变滑块
      // 移除定时器
      this.stopTimer()
      this.currentIndex += num
      this.slideHandler()
    },
    prev() { // 上一个滑块
      this.changed(-1)
    },
    next() { // 下一个滑块
      this.changed(1)
    },
    startTimer() { // 开启自动轮播
      this.timer = window.setInterval(() => {
        this.next()
      }, this.interval)
    },
    stopTimer() { // 关闭自动轮播
      window.clearInterval(this.timer)
    }
  },
  mounted() {
    this.handleDom()
    if (this.autoplay) {
      this.startTimer()
    }
  }
}
</script>

<style>
  @import './css/swiper.css';
  .swiper-container{
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .swiper-container .swiper-wrapper{
    display: flex;
    flex-wrap: nowrap;
  }
  .swiper-container .swiper-pagination{
    position: absolute;
    width: 100%;
    bottom: 5px;
    text-align: center;
  }
  .swiper-container .swiper-pagination .swiper-pagination-item{
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #fff;
  }
  .swiper-container .swiper-pagination .swiper-pagination-item.active{
    background-color: red;
  }
  .swiper-container .swiper-button{
    position: absolute;
    top: 50%;
    padding: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
  .swiper-container .swiper-button.swiper-button-prev{
    left: 0;
  }
  .swiper-container .swiper-button.swiper-button-next{
    right: 0;
  }
</style>
