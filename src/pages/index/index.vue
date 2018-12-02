<template>
  <div class="container">
    <picker class="calendar" mode="date" :value="date" start="2018-11-11" end="2018-11-18" @change="changeDate">
      <div class="date" v-text="day"></div>
      <div class="day" v-text="format"></div>
    </picker>
    <div class="text">遇见你，是我这辈子最幸运的事。</div>
    <div class="footer">
      <navigator url="/pages/phrase/main" size="mini" class="button">开始阅读</navigator>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      date: dayjs()
    }
  },
  computed: {
    day () {
      return this.date.date()
    },
    format () {
      return this.date.format('MMM.dddd')
    }
  },
  methods: {
    changeDate (e) {
      this.date = dayjs(e.target.value)
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  padding: 70px 20px 20px 20px;
}

.date {
  font-size: 58px; 
  display: inline-block;
}

.day {
  font-style: oblique;
  color: #8c8c8c;
  display: inline-block;
  padding: 0 18px;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 40px;
  left: 0;
}

.button {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #8c8c8c;
}

.text {
  font-size: 36rpx;
  font-style: oblique;
}
</style>
