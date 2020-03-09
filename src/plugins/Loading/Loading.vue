<template>
  <div class="loading" v-if="isLoading">
    <div class="point-box">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
  }
  .loading .point-box{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
  }
  .loading .point-box span{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
  }
  .loading .point-box span{
    animation: load 1.30s ease infinite;
  }
  .loading .point-box span:nth-child(1){
    top: 0;
    left: 50%;
    margin-left: -5px;
    animation-delay: 0.15s;
  }
  .loading .point-box span:nth-child(2){
    top: 8px;
    right: 8px;
    animation-delay: 0.30s;
  }
  .loading .point-box span:nth-child(3){
    top: 50%;
    right: 0;
    margin-top: -5px;
    animation-delay: 0.45s;
  }
  .loading .point-box span:nth-child(4){
    bottom: 8px;
    right: 8px;
    margin-top: -5px;
    animation-delay: 0.60s;
  }
  .loading .point-box span:nth-child(5){
    bottom: 0;
    left: 50%;
    margin-left: -5px;
    animation-delay: 0.75s;
  }
  .loading .point-box span:nth-child(6){
    bottom: 8px;
    left: 8px;
    animation-delay:0.90s;
  }
  .loading .point-box span:nth-child(7){
    top: 50%;
    left: 0;
    margin-top: -5px;
    animation-delay: 1.15s;
  }
  .loading .point-box span:nth-child(8){
    top: 8px;
    left: 8px;
    animation-delay:1.30s;
  }
  @keyframes load{
    from{
      opacity: 1.0;
    }
    to{
      opacity: .3;
    }
  }
</style>
