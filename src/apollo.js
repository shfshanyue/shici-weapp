import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import fetch from './fetch'

const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: isProduction ? 'https://oneday.xiange.tech/graphql' : 'http://localhost:5000/graphql',
    fetch (uri, options) {
      const body = JSON.parse(options.body)
      // 方便调试
      return fetch(`${uri}?query=${body.operationName || ''}`, options)
    }
  })
})

export default apolloProvider
