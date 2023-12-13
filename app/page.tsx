'use client'
import { useRouter } from 'next/navigation'
import { useAuthenticator } from '@aws-amplify/ui-react'

export default function Home() {
  const router = useRouter()
  const { user, signOut } = useAuthenticator((context) => [context.user])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Hello</h1>
        {user ? (
          <div>
            <p>{user.username}</p>
            <button onClick={() => signOut()}>sign out</button>
          </div>
        ) : (
          <div>
            <button onClick={() => router.push('/login')}>sign in</button>
          </div>
        )}
      </div>
    </main>
  )
}
