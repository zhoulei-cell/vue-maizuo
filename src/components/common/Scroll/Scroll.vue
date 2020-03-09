<template>
  <div class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Scroll from '@/library/scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    refresh() {
      this.scroll.refresh()
    },
    onScroll() {
      this.scroll.on('scroll', (point) => {
        this.$emit('scroll', point)
      })
    },
    pullingUp() {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    scrollToElement(el) {
      console.log(el)
      this.scroll.scrollToElement(el)
    }
  },
  mounted() {
    this.scroll = new Scroll(this.$el, {
      probeType: this.probeType
    })

    this.probeType && this.onScroll()

    this.pullUpLoad && this.pullingUp()
  }
}
</script>

<style>
  .scroll-wrapper{
    position: relative;
    overflow: hidden;
    flex: 1;
    width: 100%;
  }
</style>
