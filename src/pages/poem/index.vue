<template>
  <div class="container" @tap="tap">
    <div class="card" @touchstart="touchstart" @touchend="touchend">
      <!-- <picker class="calendar" mode="date" :value="date" start="2018-11-11" end="2018-11-18" @change="changeDate"> -->
      <!--   <div class="date" v-text="day">14</div> -->
      <!--   <div class="day" v-text="format">Nov.Thursday</div> -->
      <!-- </picker> -->
      <div class="texts">
        <div class="text" v-for="p in phrases" v-if="p" :key="p">
          {{ p }}
        </div>
      </div>
      <div class="title">
        {{ phrase.title.length < 20 ? phrase.title : '' }} {{ phrase.title.length < 20 && phrase.author ? ' · ' : '' }} {{ phrase.author ? phrase.author : '' }}
      </div>
    </div>
  </div>
</template>

<script>
import { PHRASE } from '@/query.gql'

export default {
  data () {
    return {
      phrase: {
        title: '静夜思',
        author: '李白',
        phrase: '举头望明月，低头思故乡。'
      }
    }
  },
  apollo: {
    phrase: {
      query: PHRASE
    }
  },
  computed: {
    phrases () {
      return this.phrase.phrase.split(/[,，.。!！、;；？?“”"":：]/)
    }
  },
  onPullDownRefresh () {
    this.$apollo.queries.phrase.refetch({ random: true }).then(() => {
      wx.stopPullDownRefresh()
    })
  },
  mounted () {
    wx.loadFontFace({
      family: '台湾新细明体',
      source: 'url("https://oss.xiange.tech/font/%E8%87%BA%E7%81%A3%E6%96%B0%E7%B4%B0%E6%98%8E%E9%AB%94.ttf")',
      success (e) {
        console.log('加载成功', e)
      }
    })
  },
  methods: {
    tap (e) {
      const { windowWidth } = wx.getSystemInfoSync()

      // 右划
      if (e.pageX < windowWidth && e.pageX > windowWidth * 0.66) {
        console.log('hello, world')
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 60rpx 60rpx 180rpx;
}

.card {
  background-color: #fff;
  font-family: "台湾新细明体", "BiauKai","DFKai-SB","FZShouJinShu-S10S","FZJianZhi-M23S";
  font-size: 1.5em;
  line-height: 1.2em;
  writing-mode: vertical-rl;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  position: relative;
}

.text {
}

.title {
  align-self: flex-end;
}

.calendar {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
