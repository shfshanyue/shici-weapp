<template>
  <div>
    <title :name="poem.title || '诗词'"></title>
    <div class="container" :style="{ 'padding-top': paddingTop + 'px' }">
      <div class="text">
        <div class="p" v-for="p in poem.paragraphs" v-text="p" :key="p"></div>
      </div>
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
      // 如果是 iphone X，加导航栏，加内边距
      paddingTop: wx.getStorageSync('startBarHeight') + 48 + 20
    }
  },
  mounted () {
    this.$apollo.addSmartQuery('poem', {
      query: POEM,
      update ({ poem }) {
        return poem
      },
      variables: {
        uuid: this.$mp.query.uuid || '1ufm4pj18qo'
      }
    })
  }
}
</script>

<style scoped>
.container {
  padding: 68Px 20Px 0;
}

.text {
  font-size: 18Px;
  line-height: 1.6em;
}

.p {
  margin-bottom: 0.8em;
}
</style>
