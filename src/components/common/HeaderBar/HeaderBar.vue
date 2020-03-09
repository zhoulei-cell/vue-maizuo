<template>
  <div class="header-bar">
    <div class="left-wrapper">
      <slot name="left"></slot>
    </div>
    <div class="center-wrapper">
      <slot></slot>
    </div>
    <div class="right-wrapper">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>

<style lang="scss">
  .header-bar{
    position: relative;
    height: 44px;
    border-bottom: 1px solid #ededed;
  }
  .header-bar .left-wrapper,.header-bar .right-wrapper{
    position: absolute;
    top: 0;
    height: 44px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 44px;
  }
  .header-bar .left-wrapper{
    left: 0;
  }
  .header-bar .center-wrapper{
    height: 44px;
    font-size: 18px;
    text-align: center;
    line-height: 44px;
  }
  .header-bar .right-wrapper{
    right: 0;
  }
</style>
