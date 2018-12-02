<template>
  <div>
    <div class="start-bar" :style="{ height: startBarHeight + 'Px' }"></div>
    <div class="bar">
      <picker class="calendar" mode="date" :value="date" start="2018-11-11" :end="today" @change="$emit('change-date', $event.target.value)">
        <div class="day" v-text="format"></div>
      </picker>
    </div> 
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      startBarHeight: 20,
      today: new Date()
    }
  },
  props: ['date'],
  computed: {
    format () {
      // TODO: 如果外边传过来的是 dayjs，则会一直刷新...
      return dayjs(this.date).format('MMM.dddd')
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
