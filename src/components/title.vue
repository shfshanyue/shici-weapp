<template>
  <div class="title">
    <div class="start-bar" :style="{ height: startBarHeight + 'Px' }"></div>
    <div class="title-bar" v-text="name">
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      startBarHeight: wx.getStorageSync('startBarHeight')
    }
  },
  props: ['name']
}
</script>

<style scoped>
.title {
  position: fixed;
  width: 100%;
  background: #fff;
}

.title-bar {
  /* 所有机型的状态栏高度都是 44 px */
  height: 48Px;
  line-height: 48Px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20Px;
  font-size: 20Px;
}
</style>
