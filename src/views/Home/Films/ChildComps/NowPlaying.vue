<template>
  <ul class="now-playing-list">
    <li class="now-playing-list-item" v-for="item in dataList" :key="item.filmId" @tap="goMovieInfo(item.filmId, $event)">
      <div class="now-playing-img">
        <img :src="item.poster" alt="" @load="imgLoad()">
      </div>
      <div class="now-playing-info">
        <p class="movie-info-name">
          <span class="name">{{item.name}}</span>
          <span class="item">{{item.filmType.name}}</span>
        </p>
        <p class="movie-info-grade">
          <span>观众评分: </span>
          <span class="grade">{{item.grade}}</span>
        </p>
        <p class="movie-info-actors">
          <span>主演: {{item.actors | actor}}</span>
        </p>
        <p class="movie-info-detail">
          <span>{{item.nation}} | {{item.runtime}} 分钟</span>
        </p>
      </div>
      <div class="now-playing-buy">
        <span class="buy" v-show="item.isPresale">购票</span>
      </div>
    </li>
  </ul>
</template>

<script>
import debounce from '@/utils/debounce'
export default {
  name: 'NowPlaying',
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad: debounce(function () {
      this.$emit('imgLoad')
    }, 500),
    goMovieInfo(id, event) {
      this.$router.push('/filmInfo/' + id)
    }
  },
  filters: {
    actor(data) {
      return data.map(item => item.name).join(' ')
    }
  }
}
</script>

<style lang="scss">
  .now-playing-list{

    .now-playing-list-item{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      .now-playing-img{
        width: 66px;
        height: 94px;
        img{
          display: block;
          width: 100%;
          height: 100%
        }
      }

      .now-playing-info{
        overflow: hidden;
        flex: 1;
        padding: 0 10px;
        .movie-info-name{
          @include textOverflow();
          font-size: 16px;
          span{
            display: inline-block;
            height: 22px;
            line-height: 22px;
            vertical-align: top;
            color: #191a1b;
          }
          .item{
            height: 14px;
            padding: 0 3px;
            margin-top: 4px;
            margin-left: 10px;
            border-radius: 2px;
            background-color: #d2d6dc;
            color: #fff;
            font-size: 8px;
            line-height: 14px;
          }
        }
        .movie-info-grade,.movie-info-actors,.movie-info-detail{
          @include textOverflow();
          margin-top: 5px;
          color: #929d9f;
          font-size: 13px;
        }
        .movie-info-grade .grade{
          color:orange;
        }
      }

      .now-playing-buy{
        span{
          display: block;
          width: 50px;
          height: 25px;
          border: 1px solid orange;
          border-radius: 4px;
          color: orange;
          font-size: 14px;
          text-align: center;
          line-height: 25px;
        }
      }
    }
  }
</style>
