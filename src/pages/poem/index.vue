<template>
  <div>
    <title :name="poem.title || '诗词'"></title>
    <div class="container">
      <div class="text">
        <div class="p" v-for="p in poem.paragraphs" v-text="p"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import { POEM } from '@/query.gql'
import title from '@/components/title'

export default {
  components: {
    title
  },
  data () {
    return {
      poem: {
      
      }
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
  padding: 20px;
}

.text {
  font-size: 18Px;
  line-height: 1.6em;
}

.p {
  margin-bottom: 0.8em;
}
</style>
