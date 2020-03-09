<template>
  <div class="tab-control-wrap">
    <ul class="tab-nav">
      <li class="tab-nav-item" v-for="(item, index) in data" :key="index" @tap="checkList(index)" :class="{active: index === isTranslate}">{{item}}</li>
    </ul>
    <div class="tab-ink-bar-wrapper" ref="ink" :class="{translate: isTranslate}">
      <span class="tab-ink-bar"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    isTranslate: {
      type: Number,
      default: 0
    }
  },
  methods: {
    checkList(index) {
      this.$emit('checkList', index)
    }
  }
}
</script>

<style lang="scss">
  .tab-control-wrap{
    position: relative;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .tab-nav{
      display: flex;
      flex-direction: row;
      height: 100%;
      .tab-nav-item{
        flex: 1;
        height: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 48px;
        &.active{
          color: orange;
        }
      }
    }
    .tab-ink-bar-wrapper{
      position: absolute;
      width: 50%;
      left: 0;
      bottom: 0;
      transform: translate3d(0, 0, 0);
      transition: transform .2s cubic-bezier(.35,0,.25,1);
      &.translate{
        transform: translate3d(100%, 0, 0);
      }
      .tab-ink-bar{
        display: block;
        width: 65px;
        margin: 0 auto;
        border-bottom: 2px solid orange;
      }
    }
  }
</style>
