<template>
  <div class="cinemas">
    <common-header title="影院" :left="true" :left-text="city" left-icon="icon-arrow-left" :right="true" right-icon="icon-sousuo"/>
    <cinema-tab-bar/>
  </div>
</template>

<script>
import CommonHeader from '@/components/content/CommonHeader'
import CinemaTabBar from './ChildComps/CinemaTabBar'
export default {
  name: 'Cinemas',
  components: {
    CommonHeader,
    CinemaTabBar
  },
  data() {
    return {
      city: '泸州'
    }
  }
}
</script>

<style lang="scss">
  .cinemas{
    flex: 1;
  }
</style>
