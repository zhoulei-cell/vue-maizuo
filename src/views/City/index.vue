<template>
  <div class="city-wrapper">
    <common-header title="当前城市" :left="true" left-icon="icon-X" @leftClick="$router.back()"/>
    <city-search v-model="search_val" @cancel="clearVal()"/>

    <scroll ref="scroll" :key="city.length">
      <city-list :city-list="cityList" :city-hot="cityHot" :alphabet="alphabet" ref="city_list" v-if="!search_val"/>
      <city-search-list :search-list="searchList" v-else/>
    </scroll>
    <alphabet-index v-if="!search_val" :alphabet="alphabet" @toElement="toElement"/>
  </div>
</template>

<script>
import CommonHeader from '@/components/content/CommonHeader'
import CitySearch from './ChildComps/CitySearch'
import CityList from './ChildComps/CityList'
import CitySearchList from './ChildComps/CitySearchList'
import AlphabetIndex from '@/components/content/AlphabetIndex'

import Scroll from '@/components/common/Scroll'

import request from '@/network/request'

import offset from '@/utils/offset'
export default {
  name: 'City',
  components: {
    CommonHeader,
    CitySearch,
    CityList,
    CitySearchList,
    AlphabetIndex,
    Scroll
  },
  data() {
    return {
      cityHot: [],
      cityList: {},
      alphabet: [],
      city: [],
      cities: [],
      searchList: [],
      search_val: ''
    }
  },
  methods: {
    getCityList() {
      let cityList
      if (localStorage.getItem('cities')) {
        cityList = localStorage.getItem('cities')
        cityList = JSON.parse(cityList)
        this.cities = cityList
        this.handleCity(cityList)
      } else {
        request.getCityList().then(res => {
          cityList = res.data.data.cities
          this.cities = cityList
          localStorage.setItem('cities', JSON.stringify(cityList))
          this.handleCity(cityList)
        })
      }
    },
    handleCity(cities) {
      let cityHot = cities.filter(item => item.isHot === 1)
      let cityList = {}
      let alphabet = []
      cities.forEach(item => {
        let key = item.pinyin.slice(0, 1).toUpperCase()
        if (!cityList[key]) {
          cityList[key] = []
          alphabet.push(key)
        }
        cityList[key].push(item)
      })
      this.cityHot = cityHot
      this.city = cityHot
      this.cityList = cityList
      this.alphabet = alphabet.sort()
    },
    clearVal() {
      this.search_val = ''
    },
    toElement(index) {
      this.$refs.scroll.scrollToElement(this.$refs.city_list.$refs.city_node[index])
    }
  },
  watch: {
    search_val() {
      let arr = this.cities.filter(item => item.name.startsWith(this.search_val) || item.pinyin.startsWith(this.search_val))
      this.searchList = arr
      this.city = arr
    }
  },
  created() {
    this.getCityList()
  },
  mounted() {
    let children = this.$refs.city_list.$refs.city_node
    let arr = []
    Array.prototype.forEach.call(children, item => {
      arr.push(offset(item, this.$refs.scroll.$el))
    })
  }
}
</script>

<style lang="scss">
  .city-wrapper{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
