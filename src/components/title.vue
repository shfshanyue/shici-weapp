<template>
  <div>
    <div class="start-bar" :style="{ height: startBarHeight + 'Px' }"></div>
    <div class="title" v-text="name">
    </div> 
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      startBarHeight: 20,
    }
  },
  props: ['name'],
  created () {
    const { model } = wx.getSystemInfoSync()
    if (model === 'iPhone X') {
      this.startBarHeight = 44
    }
  }
}
</script>

<style scoped>
.title {
  /* 所有机型的状态栏高度都是 44 px */
  height: 48Px;
  line-height: 48Px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20Px;
  font-size: 20Px;
}
</style>
