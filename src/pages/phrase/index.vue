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
      <div class="buttons">
        <div class="svg svg-left" @click="changeDate(date - 24 * 60 * 60 * 1000)"></div>
        <div class="svg svg-random" @click="random"></div>
        <div class="svg svg-share"></div>
      </div>
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
    const id = _.get(this, '$mp.query.id')
    console.log(this.$mp, id)
    return {
      id: undefined,
      phrase: '举头望明月，低头思故乡。',
      title: '静夜思',
      authorName: '李白',
      date: new Date(),
      poemId: '4vl92j3n86o'
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
  onShareAppMessage () {
    return {
      title: this.phrase,
      path: `/pages/phrase/main?id=${this.id}`
    }
  },
  mounted () {
    this.$apollo.addSmartQuery('phrase', {
      query: PHRASE,
      result ({ data }) {
        this.id = _.get(data, 'phrase.id')
        this.phrase = _.get(data, 'phrase.phrase')
        this.title = _.get(data, 'phrase.poem.title')
        this.authorName = _.get(data, 'phrase.poem.author.name')
        this.poemId = _.get(data, 'phrase.poem.uuid')
      },
      variables: {
        id: this.$mp.query.id
      }
    })
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
      }
    },
    changeDate (e) {
      this.date = new Date(e)
      this.$apollo.queries.phrase.setVariables({ date: this.date })
      this.$apollo.queries.phrase.refetch()
    },
    random () {
      this.$apollo.queries.phrase.setVariables({ random: true })
      this.$apollo.queries.phrase.refetch()
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

.buttons {
  display: flex;
  justify-content: space-around;
  margin: 20Px 0;
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

.svg-left {
  background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='64 64 896 896' class='' data-icon='left' width='1em' height='1em' fill='#888' aria-hidden='true'%3E%3Cpath d='M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z'%3E%3C/path%3E%3C/svg%3E ");
}

.svg-random {
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath fill='#888' d='M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z'/%3E%3C/svg%3E");
}

.svg-share {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath fill='#888' d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z'/%3E%3C/svg%3E");
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
