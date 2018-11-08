<template>
  <div class="container">
    {{ ping }}
  </div>
</template>

<script>
import { PING } from '@/query.gql'

export default {
  data () {
    return {
      ping: ''
    }
  },
  apollo: {
    ping: {
      query: PING
    }
  }
}
</script>

