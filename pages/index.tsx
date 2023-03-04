import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/Hero'
import { PageProps } from '../types/PageProps'

export default function Home({ token, showLogin, showSignup }: PageProps) {
  if (token) return null

  return (
    <>
      <AppHead title='ChatsApp' />
      <Hero showLogin={showLogin} showSignup={showSignup} />
    </>
  )
}
