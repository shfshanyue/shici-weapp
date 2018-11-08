import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import fetch from './fetch'

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    fetch (uri, options) {
      const body = JSON.parse(options.body)
      // 方便调试
      return fetch(`${uri}?query=${body.operationName || ''}`, options)
    }
  })
})

export default apolloProvider
