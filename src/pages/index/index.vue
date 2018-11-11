<template>
  <div class="container">
    <div class="phrase">
      <div class="texts">
        <div class="text" v-for="p in phrases" v-if="p" :key="p">
          {{ p }}
        </div>
      </div>
      <div class="title">
        {{ phrase.title }} {{ phrase.author ? '· ' + phrase.author : '' }}
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
      return this.phrase.phrase.split(/[,，.。!！、;；]/)
    }
  },
  onPullDownRefresh () {
    this.$apollo.queries.phrase.refetch({ random: true })
  }
}
</script>

<style scoped>
.container {
  margin: 50rpx 30rpx;
}

.phrase {
  font-family: "楷体", "BiauKai","DFKai-SB","FZShouJinShu-S10S","FZJianZhi-M23S";
  font-size: 1.5em;
  writing-mode: vertical-rl;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
}

.text {
  border-left: 1px solid #fec;
}

.title {
  align-self: flex-end;
}
</style>
