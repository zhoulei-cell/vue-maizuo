<template>
  <header-bar class="common-header">
    <span>{{title}}</span>
    <div slot="left" class="left" v-if="left" @tap="$emit('leftClick')">
      <span v-if="leftText">{{leftText}}</span>
      <i class="iconfont" :class="leftIcon" v-if="leftIcon"></i>
    </div>
    <div slot="right" class="right" v-if="right" @tap="$emit('rightClick')">
      <span v-if="rightText">{{rightText}}</span>
      <i class="iconfont" :class="rightIcon" v-if="rightIcon"></i>
    </div>
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
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
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
  .common-header .left,.common-header .right{
    font-size: 14px;
    .iconfont{
      font-size: 20px;
      vertical-align: bottom;
    }
  }
</style>
