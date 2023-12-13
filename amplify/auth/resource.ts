import { defineAuth, secret } from '@aws-amplify/backend'
import * as cognito from 'aws-cdk-lib/aws-cognito'

// const metadataContentResponse = await fetch('https://nexus.microsoftonline-p.com/federationmetadata/saml20/federationmetadata.xml', {
//   headers: {
//     'content-type': 'text/xml'
//   }
// })
// const metadataContent = await metadataContentResponse.text()

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // add social providers
    externalProviders: {
      /**
       * first, create your secrets using `amplify sandbox secret`
       * then, import `secret` from `@aws-amplify/backend`
       * @see https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/features/#setting-secrets
       */
      // loginWithAmazon: {
      //   clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
      //   clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET'),
      // }
      oidc: {
        name: 'MicrosoftEntraID',
        clientId: secret('MICROSOFT_ENTRA_ID_CLIENT_ID'),
        clientSecret: secret('MICROSOFT_ENTRA_ID_CLIENT_SECRET'),
        // issuerUrl: secret('MICROSOFT_ENTRA_ID_ISSUER_URL'),
        issuerUrl:
          'https://login.microsoftonline.com/dbba9e2b-e369-4935-8ec6-33e193509c0b/v2.0',
        scopes: ['openid', 'email'],
        attributeMapping: {
          email: {
            attributeName: 'email',
          },
        },
      },
      saml: {
        metadata: {
          metadataContent:
            'https://login.microsoftonline.com/dbba9e2b-e369-4935-8ec6-33e193509c0b/federationmetadata/2007-06/federationmetadata.xml?appid=b278502c-b4b7-4ad5-92a2-09739e87e791',
          // metadataContent: secret('MICROSOFT_ENTRA_ID_SAML_METADATA'),
          metadataType: cognito.UserPoolIdentityProviderSamlMetadataType.URL,
        },
        attributeMapping: {
          email: {
            attributeName: 'emailaddress',
          },
        },
        name: 'MicrosoftEntraIDSAML',
      },
      logoutUrls: ['http://localhost:3000/'],
      callbackUrls: ['http://localhost:3000/'],
    },
  },
  /**
   * enable multifactor authentication
   * @see https://docs.amplify.aws/gen2/build-a-backend/auth/manage-mfa
   */
  // multifactor: {
  //   mode: 'OPTIONAL',
  //   sms: {
  //     smsMessage: (code) => `Your verification code is ${code}`,
  //   },
  // },
  userAttributes: {
    /** request additional attributes for your app's users */
    // profilePicture: {
    //   mutable: true,
    //   required: false,
    // },
  },
})
