<template>
  <scroll ref="scroll" :probe-type="2" @scroll="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
    <div class="films">
      <common-header title="电影" :left="true" :left-text="city" left-icon="icon-arrow-left" @leftClick="$router.push('/city')"/>

      <movie-swipe :banners="bannerList"/>

      <tab-control :data="['正在热映', '即将上映']" :isTranslate="isTranslate" @checkList="checkList" ref="tabControl"/>
      <!-- <ul class="movie-list">
        <movie-card v-for="item in movieList[currentType].list" :key="item.filmId" :item="item" :currentType="currentType"></movie-card>
      </ul> -->
      <now-playing :dataList="movieList[currentType].list" v-if="currentType === 'nowPlaying'" @imgLoad="refresh()"/>
      <coming-soon :dataList="movieList[currentType].list" v-if="currentType === 'comingSoon'" @imgLoad="refresh()"/>
    </div>
    <tab-control :data="['正在热映', '即将上映']" :isTranslate="isTranslate" @checkList="checkList" class="fixed" v-if="isFixed"/>
  </scroll>
</template>

<script>
import Scroll from '@/components/common/Scroll'
import CommonHeader from '@/components/content/CommonHeader'
import MovieSwipe from './ChildComps/MovieSwipe'
import TabControl from './ChildComps/TabControl'
// import MovieCard from './ChildComps/MovieCard'
import NowPlaying from './ChildComps/NowPlaying'
import ComingSoon from './ChildComps/ComingSoon'

import request from '@/network/request/index'
export default {
  name: 'Films',
  components: {
    Scroll,
    CommonHeader,
    MovieSwipe,
    TabControl,
    // MovieCard
    NowPlaying,
    ComingSoon
  },
  data() {
    return {
      bannerList: [],
      movieList: {
        nowPlaying: {
          total: 0,
          page: 1,
          list: []
        },
        comingSoon: {
          total: 0,
          page: 1,
          list: []
        }
      },
      type: 1,
      isTranslate: 0,
      city: '泸州',
      isFixed: false
    }
  },
  methods: {
    getBannerList() {
      request.getBannerList().then(res => {
        this.bannerList = res.data.data || []
      })
    },
    getMovieList() {
      let pageNum = this.movieList[this.currentType].page
      request.getMovieList(pageNum, this.type).then(res => {
        let data = res.data.data
        this.movieList[this.currentType].total = data.total
        this.movieList[this.currentType].list.push(...data.films)
        this.movieList[this.currentType].page += 1
        this.finishPullUp()
      })
    },
    checkList(index) {
      this.type = index + 1
      this.isTranslate = index
      if (this.movieList[this.currentType].list.length <= 0) {
        this.getMovieList()
      }
    },
    refresh() {
      this.$refs.scroll.refresh()
    },
    scroll(point) {
      let offsetTop = this.$refs.tabControl.$el.offsetTop
      if (Math.abs(point.y) >= offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    pullingUp() {
      if (this.movieList[this.currentType].total > this.movieList[this.currentType].list.length) {
        this.getMovieList()
      }
    },
    finishPullUp() {
      this.$refs.scroll.finishPullUp()
    }
  },
  computed: {
    currentType() {
      let currentType
      if (this.type === 1) {
        currentType = 'nowPlaying'
      } else if (this.type === 2) {
        currentType = 'comingSoon'
      }
      return currentType
    }
  },
  created() {
    this.getBannerList()
    this.getMovieList()
  }
}
</script>

<style lang="scss">
  .films{
    min-height: 100%;
  }
  .fixed{
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
  }
</style>
