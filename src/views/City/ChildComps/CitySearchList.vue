<template>
  <div class="search-wrap">
    <ul v-if="searchList.length !== 0" class="city-search-list">
      <li class="city-list-item" v-for="item in searchList" :key="item.cityId">{{item.name}}</li>
    </ul>
    <div v-else class="no-city">没有匹配到该城市</div>
  </div>
</template>

<script>
export default {
  name: 'CitySearchList',
  props: {
    searchList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  .city-search-list{
    .city-list-item{
      height: 45px;
      padding-left: 20px;
      border-bottom: 1px solid #ededed;
      font-size: 14px;
      line-height: 45px;
    }
  }
  .no-city{
    height: 200px;
    color: #999;
    font-size: 25px;
    text-align: center;
    line-height: 200px;
  }
</style>
