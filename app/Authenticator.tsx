'use client'
import type { PropsWithChildren } from 'react'
import type { AuthenticatorProps as AmplifyAuthenticatorProps } from '@aws-amplify/ui-react'
import { Authenticator as AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from '@/amplifyconfiguration.json'

Amplify.configure(
  {
    // ...config,
    Auth: {
      Cognito: {
        userPoolId: config.aws_user_pools_id,
        userPoolClientId: config.aws_user_pools_web_client_id,
        identityPoolId: config.aws_cognito_identity_pool_id,
        allowGuestAccess: true,
        passwordFormat: {
          minLength:
            config.aws_cognito_password_protection_settings
              .passwordPolicyMinLength,
          // below are all defaults, for the sake of the demo
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
          requireUppercase: true,
        },
        userAttributes: {
          email: {
            required: true,
          },
        },
        signUpVerificationMethod: 'code',
        // userPoolEndpoint:
        loginWith: {
          oauth: {
            redirectSignIn: [
              'http://localhost:3000/',
              'https://www.example.com/',
            ],
            redirectSignOut: [
              'http://localhost:3000/',
              'https://www.example.com/',
            ],
            domain: '766-josefai.auth.us-east-1.amazoncognito.com',
            responseType: 'code',
            scopes: ['email', 'openid'],
          },
        },
      },
    },
  },
  { ssr: true }
)

export function Authenticator({
  children,
}: PropsWithChildren<AmplifyAuthenticatorProps>) {
  return (
    <AmplifyAuthenticator.Provider>{children}</AmplifyAuthenticator.Provider>
  )
}
