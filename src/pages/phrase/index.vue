<template>
  <div class="container">
    <bar :date="date" @change-date="changeDate"></bar>
    <div class="card-container">
      <navigator hover-class="none" :url="'/pages/poem/main?uuid=' + poemId">
        <div class="card" @touchstart="touchstart" @touchend="touchend">
          <div class="texts">
            <div class="text" v-for="p in phrases" v-if="p" :key="p">
              {{ p }}
            </div>
          </div>
          <div class="title">
            {{ title.length < 20 ? title : '' }} {{ title.length < 20 && authorName ? ' · ' : '' }} {{ authorName }}
          </div>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import { PHRASE } from '@/query.gql'
import bar from '@/components/bar'

export default {
  components: {
    bar
  },
  data () {
    return {
      phrase: '举头望明月，低头思故乡。',
      title: '静夜思',
      authorName: '李白',
      date: new Date(),
      poemId: 'qs710eeut78'
    }
  },
  apollo: {
    phrase: {
      query: PHRASE,
      result ({ data }) {
        this.phrase = _.get(data, 'phrase.phrase')
        this.title = _.get(data, 'phrase.poem.title')
        this.authorName = _.get(data, 'phrase.poem.author.name')
        this.poemId = _.get(data, 'phrase.poem.uuid')
      }
    }
  },
  computed: {
    phrases () {
      return this.phrase.split(/[,，.。!！、;；？?“”"":：]/)
    }
  },
  onPullDownRefresh () {
    this.$apollo.queries.phrase.refetch({ random: true }).then(() => {
      wx.stopPullDownRefresh()
    })
  },
  mounted () {
    //  wx.loadFontFace({
    //    family: '台湾新细明体',
    //    source: 'url("https://oss.xiange.tech/font/%E8%87%BA%E7%81%A3%E6%96%B0%E7%B4%B0%E6%98%8E%E9%AB%94.ttf")',
    //    success (e) {
    //      console.log('加载成功', e)
    //    }
    //  })
  },
  methods: {
    tap (e) {
      const { windowWidth } = wx.getSystemInfoSync()

      // 右划
      if (e.pageX < windowWidth && e.pageX > windowWidth * 0.66) {
        console.log('hello, world')
      }
    },
    changeDate (e) {
      this.date = e
      this.$apollo.queries.phrase.refetch({ date: new Date(e) })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.card-container {
  padding: 120Px 30Px 0;
  height: 100%;
}

.card {
  background-color: #fff;
  font-family: "台湾新细明体", "BiauKai","DFKai-SB","FZShouJinShu-S10S","FZJianZhi-M23S";
  font-size: 1.5em;
  line-height: 1.2em;
  writing-mode: vertical-rl;
  width: 100%;
  height: 85%;
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

@font-face {
  font-family: "台湾新细明体";
  src: url("https://oss.xiange.tech/font/%E8%87%BA%E7%81%A3%E6%96%B0%E7%B4%B0%E6%98%8E%E9%AB%94.ttf") format('truetype');
}
</style>
