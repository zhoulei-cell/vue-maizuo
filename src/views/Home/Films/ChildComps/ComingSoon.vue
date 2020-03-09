<template>
  <ul class="coming-soon-list">
    <li class="coming-soon-list-item" v-for="item in dataList" :key="item.filmId" @tap="goMovieInfo(item.filmId, $event)">
      <div class="coming-soon-img">
        <img :src="item.poster" alt="" @load="imgLoad()">
      </div>
      <div class="coming-soon-info">
        <p class="movie-info-name">
          <span class="name">{{item.name}}</span>
          <span class="item">{{item.filmType.name}}</span>
        </p>
        <p class="movie-info-category">类型: {{item.category}}</p>
        <p class="movie-info-actors">主演: {{item.actors | actor}}</p>
      </div>
      <div class="coming-soon-order">
        <span class="pre-order" v-show="item.isPresale">预购</span>
      </div>
    </li>
  </ul>
</template>

<script>
import debounce from '@/utils/debounce'
export default {
  name: 'ComingSoon',
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
  .coming-soon-list{
    .coming-soon-list-item{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;

      .coming-soon-img{
        width: 66px;
        height: 94px;
        img{
          display: block;
          width: 100%;
          height: 100%
        }
      }

      .coming-soon-info{
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

        .movie-info-category,.movie-info-actors{
          @include textOverflow();
          margin-top: 5px;
          color: #929d9f;
          font-size: 13px;
        }
      }

      .coming-soon-order{
        span{
          display: block;
          width: 50px;
          height: 25px;
          border: 1px solid orangered;
          border-radius: 4px;
          color: orangered;
          font-size: 14px;
          text-align: center;
          line-height: 25px;
        }
      }

    }
  }
</style>
