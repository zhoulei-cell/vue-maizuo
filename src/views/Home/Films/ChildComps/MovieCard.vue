<template>
  <li class="movie-card">
    <div class="movie-img">
      <img :src="item.poster" alt="">
    </div>
    <div class="movie-info">
      <div class="movie-name">
        <span class="name">{{item.name}}</span>
        <span class="film-type">{{item.filmType.name}}</span>
      </div>
      <div class="movie-grade" v-if="prop === 'nowPlaying'">
        <span class="label">观众评分</span>
        <span class="grade">{{item.grade}}</span>
      </div>
      <div class="movie-actors">主演: {{actor}}</div>
      <div class="movie-type" v-if="currentType === 'comingSoon'">{{item.nation}}: {{item.category}}</div>
      <div class="movie-detail" v-if="currentType === 'nowPlaying'">{{item.nation}} | {{item.runtime}}</div>
      <div class="movie-desc" v-if="currentType === 'comingSoon'">描述: {{item.synopsis}}</div>
    </div>
    <div class="movie-buy">
      <span class="buy" v-show="item.isPresale" v-if="currentType === 'nowPlaying'">购票</span>
      <span class="pre-order" v-show="item.isPresale" v-if="currentType === 'comingSoon'">预购</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    currentType: {
      type: String
    }
  },
  computed: {
    actor() {
      let arr = this.item.actors.map(item => {
        return item.name
      })
      return arr.join(' ')
    }
  }
}
</script>

<style lang="scss">
  .movie-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    .movie-img{
      width: 66px;
      height: 96px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .movie-info{
      overflow: hidden;
      flex: 1;
      padding: 0 10px;
      .movie-name{
        @include textOverflow();
        width: 100%;
        height: 22px;
        color: #191a1b;
        font-size: 16px;
        line-height: 22px;
        .name{
          margin-right: 5px;
        }
        .film-type{
          padding: 0 2px;
          border-radius: 2px;
          background-color: #d2d6dc;
          color: #fff;
          font-size: 9px;
          vertical-align: top;
        }
      }
      .movie-grade,.movie-actors,.movie-detail,.movie-type,.movie-desc{
        @include textOverflow();
        width: 100%;
        color: #797d82;
        font-size: 13px;
        margin-top: 4px;
      }
      .movie-grade .grade{
        margin-left: 5px;
        color: orange;
      }
    }
    .movie-buy .buy, .movie-buy .pre-order{
      display: block;
      width: 50px;
      height: 25px;
      color: orange;
      border: 1px solid orange;
      border-radius: 2px;
      text-align: center;
      line-height: 25px;
    }
    .movie-buy .pre-order{
      color: orangered;
      border: 1px solid orangered;
    }
  }
</style>
