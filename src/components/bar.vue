<template>
  <div>
    <div class="start-bar" :style="{ height: startBarHeight + 'Px' }"></div>
    <div class="bar">
      Home
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      startBarHeight: 20
    }
  },
  created () {
    const { model } = wx.getSystemInfoSync()
    if (model === 'iPhone X') {
      this.startBarHeight = 44
    }
  }
}
</script>

<style scoped>
.bar {
  /* 所有机型的状态栏高度都是 44 px */
  height: 48Px;
  line-height: 48Px;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20Px;
}
</style>
