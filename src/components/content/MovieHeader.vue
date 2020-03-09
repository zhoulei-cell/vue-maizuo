<template>
  <header-bar class="movie-header">
    <span>{{title}}</span>
    <div slot="left" class="city" v-if="left">
      <span v-if="city">{{city}}</span>
      <i class="iconfont icon-arrow-left"></i>
    </div>
    <i slot="right" class="iconfont icon-sousuo" v-if="right"></i>
  </header-bar>
</template>

<script>
import HeaderBar from '@/components/common/HeaderBar'
export default {
  name: 'MovieHeader',
  props: {
    left: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ' '
    },
    city: {
      type: String,
      default: ''
    }
  },
  components: {
    HeaderBar
  }
}
</script>

<style lang="scss">
  .movie-header .city{
    font-size: 16px;
    .iconfont{
      vertical-align: bottom;
    }
  }
  .movie-header .right .iconfont{
    font-size: 20px;
  }
</style>
