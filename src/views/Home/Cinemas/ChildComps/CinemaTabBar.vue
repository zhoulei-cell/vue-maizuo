<template>
  <div class="cinema-tab-bar">
    <ul class="tab-bar-list">
      <li class="tab-bar-list-item">
        <span>全城</span>
        <i class="iconfont icon-arrow-left"></i>
      </li>
      <li class="tab-bar-list-item">
        <span>APP订票</span>
        <i class="iconfont icon-arrow-left"></i>
      </li>
      <li class="tab-bar-list-item">
        <span>最近去过</span>
        <i class="iconfont icon-arrow-left"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CinameTabBar'
}
</script>

<style lang="scss">
  .cinema-tab-bar{
    .tab-bar-list{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-bottom: 1px solid #ededed;
      .tab-bar-list-item{
        height: 49px;
        font-size: 14px;
        text-align: center;
        line-height: 49px;
      }
    }
  }
</style>
