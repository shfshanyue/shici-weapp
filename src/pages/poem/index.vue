<template>
  <div>
    <title :name="poem.title || '诗词'"></title>
    <div class="container" :style="{ 'padding-top': paddingTop + 'px' }">
      <div class="section" v-if="active === 'poem'">
        <div :class="['p', { shi: poem.kind === '诗'}]" v-for="p in poem.paragraphs" v-text="p" :key="p"></div>
      </div>
      <div class="section" v-show="active === 'intro'">
        <div class="p" v-for="p in poem.intro" v-text="p" :key="p"></div>
      </div>
      <div class="section" v-show="active === 'translation'">
        <div class="p" v-for="p in poem.translation" v-text="p" :key="p"></div>
      </div>
      <div class="section" v-show="active === 'appreciation'">
        <div class="p" v-for="p in poem.appreciation" v-text="p" :key="p"></div>
      </div>
    </div>
    <div class="feature">
      <div :class="['feature-item', { active: active === 'poem'}]" @click="setActive('poem')">诗词</div>  
      <div :class="['feature-item', { active: active === 'intro'}]" @click="setActive('intro')" v-if="poem.intro">简介</div>  
      <div :class="['feature-item', { active: active === 'translation'}]" @click="setActive('translation')" v-if="poem.translation">翻译</div>  
      <div :class="['feature-item', { active: active === 'appreciation'}]" @click="setActive('appreciation')" v-if="poem.appreciation">鉴赏</div>  
    </div>
  </div>
</template>

<script>
import { POEM } from '@/query.gql'
import title from '@/components/title'

export default {
  components: {
    title
  },
  data () {
    return {
      poem: {

      },
      active: 'poem',
      // 如果是 iphone X，加导航栏，加内边距
      paddingTop: wx.getStorageSync('startBarHeight') + 48
    }
  },
  mounted () {
    this.$apollo.addSmartQuery('poem', {
      query: POEM,
      update ({ poem }) {
        return poem
      },
      variables: {
        uuid: this.$mp.query.uuid || 'fc1togorju'
      }
    })
  },
  onUnload () {
    this.poem = {}
    this.active = 'poem'
  },
  methods: {
    setActive (type) {
      this.active = type
    }
  }
}
</script>

<style scoped>
.container {
  padding: 68Px 0 0;
  background-color: #fff;
  padding-bottom: 50Px;
}

.section {
  font-size: 20Px;
  line-height: 1.6em;
  padding: 15Px;
}

.p {
  margin-bottom: 0.8em;
  text-indent: 2em;
}

.p.shi {
  text-indent: 0;
}

.feature {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50Px;
  background-color: #fff;
}

.feature-item {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1Px solid #c8c8c8;
  border-top: 1Px solid #c8c8c8;
  color: #888;
}

.feature-item:first-child {
  border-left: none;
}

.feature-item.active {
  color: #111;
  background-color: #fff;
}

h2 {
  font-size: 30px;
}
</style>
