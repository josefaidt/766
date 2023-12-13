'use client'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { signInWithRedirect } from 'aws-amplify/auth'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  const { user } = useAuthenticator((s) => [s.user])
  if (user) return redirect('/')
  return (
    <>
      <p>Login</p>
      <button
        onClick={() =>
          signInWithRedirect({ provider: { custom: 'MicrosoftEntraID' } })
        }
      >
        OIDC
      </button>
      <button
        onClick={() =>
          signInWithRedirect({ provider: { custom: 'MicrosoftEntraIDSAML' } })
        }
      >
        SAML
      </button>
    </>
  )
}
