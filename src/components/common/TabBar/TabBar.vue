<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
  .tab-bar{
    display: flex;
    flex-direction: row;
    width: 100%;
    border-top: 1px solid #ccc;
  }
</style>
