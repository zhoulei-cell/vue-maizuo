<template>
  <swiper :key="banners.length">
    <swiper-item v-for="item in banners" :key="item.bannerId">
      <img :src="item.imgUrl">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/Swiper'
export default {
  name: 'MovieSwipe',
  props: ['banners'],
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="scss">
  /*.swiper-container .swiper-wrapper .swiper-slide img{
    height: px2rem(210);
  }*/
  .swiper-container .swiper-pagination{
    text-align: right;
  }
  .swiper-container .swiper-pagination .swiper-pagination-item:last-child{
    margin-right: 20px;
  }
</style>
