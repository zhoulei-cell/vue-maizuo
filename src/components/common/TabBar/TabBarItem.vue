<template>
  <router-link tag="div" class="tab-bar-item" :to="path">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String
  }
}
</script>

<style lang="scss">
  .tab-bar-item{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 49px;
    font-size: 14px;

    .iconfont{
      font-size: 20px;
    }
    &.active{
      color: orange;
    }
  }
</style>
