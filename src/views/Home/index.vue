<template>
  <div class="home">
    <router-view/>
    <tab-bar>
      <tab-bar-item v-for="item in navList" :key="item.id" :path="item.path">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import { TabBar, TabBarItem } from '@/components/common/TabBar'
export default {
  name: 'Home',
  data() {
    return {
      navList: [
        {
          id: 1,
          name: '电影',
          icon: 'icon-dianying',
          path: '/films'
        },
        {
          id: 2,
          name: '影院',
          icon: 'icon-yingyuan',
          path: '/cinemas'
        },
        {
          id: 3,
          name: '我的',
          icon: 'icon-wode',
          path: '/center'
        }
      ]
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  .home{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
