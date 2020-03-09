<template>
  <div class="city-content">
    <div class="city-hot-list-wrap">
      <div class="city-hot-title">热门城市</div>
      <ul class="city-hot-list">
        <li class="city-hot-list-item" v-for="hot in cityHot" :key="hot.cityId">{{hot.name}}</li>
      </ul>
    </div>
    <ul class="city-list-group">
      <li class="city-list-section" v-for="(key, index) in alphabet" :key="index" ref="city_node">
        <div class="city-list-title">{{key}}</div>
        <ul class="city-list">
          <li class="city-list-item" v-for="city in cityList[key]" :key="city.cityId">{{city.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityList',
  props: {
    cityList: {
      type: Object,
      default() {
        return {}
      }
    },
    cityHot: {
      type: Array,
      default() {
        return []
      }
    },
    alphabet: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  .city-content{
    font-size: 14px;
    .city-hot-list-wrap{
      padding: 10px 30px 10px 20px;
      .city-hot-title{
        height: 30px;
        color: #797d82;
        line-height: 30px;
      }
      .city-hot-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .city-hot-list-item{
          width: 30%;
          height: 30px;
          margin-bottom: 13px;
          border-radius: 5px;
          background-color: #ededed;
          line-height: 30px;
          text-align: center;
        }
      }
    }

    .city-list-group{
      .city-list-section{
        .city-list-title{
          height: 35px;
          padding-left: 20px;
          background-color: #f4f4f4;
          font-size: 20px;
          line-height: 35px;
        }
        .city-list{
          padding: 10px 30px 10px 20px;
          .city-list-item{
            height: 45px;
            border-bottom: 1px solid #ededed;
            line-height: 45px;
          }
        }
      }
    }
  }
</style>
