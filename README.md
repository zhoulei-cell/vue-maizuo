# maizuo

# 项目使用技术
```
框架: 
  vue + vue-router + vuex
技术点:
  样式初始化: normalize.css
  scroll: 根据i-scroll自写的一个scroll滚动库
  tap等事件: 根据DOM自定义事件自写移动端事件库(主要为了解决移动端的click事件的300ms延迟)
  ajax请求: 自己封装一个ajax请求库
  移动端布局解决: 自写rem布局js库
  此项目没有使用第三方ui组件库，所有用到的组件全部自己封装
    利用vue实现移动端swiper
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
