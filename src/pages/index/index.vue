<template>
  <div class="container" @tap="tap">
    <div class="card" @touchstart="touchstart" @touchend="touchend">
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
      return this.phrase.phrase.split(/[,，.。!！、;；？?“”""]/)
    }
  },
  onPullDownRefresh () {
    this.$apollo.queries.phrase.refetch({ random: true }).then(() => {
      wx.stopPullDownRefresh()
    })
  },
  methods: {
    tap (e) {
      const { windowHeight, windowWidth } = wx.getSystemInfoSync()

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
  font-family: "楷体", "BiauKai","DFKai-SB","FZShouJinShu-S10S","FZJianZhi-M23S";
  font-size: 1.5em;
  writing-mode: vertical-rl;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
}

.text {
}

.title {
  align-self: flex-end;
}
</style>
