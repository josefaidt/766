import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Amplify } from 'aws-amplify'
import { Authenticator } from './Authenticator'
import config from '@/amplifyconfiguration.json'
import '@aws-amplify/ui-react/styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
            domain: 'https://766-josefai.auth.us-east-1.amazoncognito.com',
            responseType: 'code',
            scopes: ['email', 'openid'],
          },
        },
      },
    },
  },
  { ssr: true }
)

export const metadata: Metadata = {
  title: 'Amplify OIDC + SAML demo',
  description:
    'Demonstration of using OIDC and SAML login with AWS Amplify and Microsoft Entra ID',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator>{children}</Authenticator>
      </body>
    </html>
  )
}
