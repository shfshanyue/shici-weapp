import Vue from 'vue'
import App from './index'
import VueApollo from 'vue-apollo'
import apolloProvider from '@/apollo'

Vue.use(VueApollo)

const app = new Vue({
  ...App,
  apolloProvider
})

app.$mount()
