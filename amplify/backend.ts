import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource.js'
import { data } from './data/resource.js'

const backend = defineBackend({
  auth,
  data,
})

const whoami = backend.resources.auth.node.tryGetContext('amplify-backend-name')
const namespace = backend.resources.auth.node.tryGetContext(
  'amplify-backend-namespace'
)

backend.resources.auth.resources.userPool.addDomain('CognitoDomain', {
  cognitoDomain: {
    domainPrefix: `${namespace}-${whoami}`, // change this
  },
})
