<template>
  <div class="city-search-wrapper">
    <div class="city-search">
      <i class="iconfont icon-sousuo"></i>
      <input class="search" type="text" placeholder="输入城市名或者拼音" :value="value" @input="$emit('input', $event.target.value)">
    </div>
    <div class="city-cancel" v-if="value" @tap="cancel()">取消</div>
  </div>
</template>

<script>
export default {
  name: 'CitySearch',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
  .city-search-wrapper{
    display: flex;
    padding: 10px 20px;
    background-color: #efefef;
    color: #ccc;
    .city-search{
      flex: 1;
      display: flex;
      width: 100%;
      padding: 5px 0;
      border-radius: 4px;
      background-color: #fff;
      .iconfont{
        line-height: 20px;
        padding: 0 10px;
      }
      .search{
        flex: 1;
        height: 20px;
      }
    }
    .city-cancel{
      height: 20px;
      padding: 5px 0 5px 20px;
      color: #444;
      font-size: 15px;
      line-height: 20px;
    }
  }
</style>
