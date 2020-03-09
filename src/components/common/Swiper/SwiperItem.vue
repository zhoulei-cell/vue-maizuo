<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem'
}
</script>

<style>
  .swiper-slide{
    flex-shrink: 0;
    width: 100%;
  }
  .swiper-slide img{
    width: 100%;
  }
</style>
