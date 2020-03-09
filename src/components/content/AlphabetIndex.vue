<template>
  <ul class="alphabet-list">
    <li class="alphabet-list-item" v-for="(item, index) in alphabet" :key="index"  @tap="$emit('toElement', index)">{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'AlphabetIndex',
  props: {
    alphabet: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  .alphabet-list{
    position: fixed;
    right: 0px;
    top: 50%;
    transform: translateY(-45%);
    .alphabet-list-item{
      width: 20px;
      height: 18px;
      color: #666;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      line-height: 18px;
    }
  }
</style>
