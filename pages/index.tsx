import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/Hero'

export default function Home({
  token,
  showLogin,
  showSignup,
}: {
  token: string
  showLogin: () => void
  showSignup: () => void
}) {
  if (token) return null

  return (
    <>
      <AppHead title='ChatsApp' />
      <Hero showLogin={showLogin} showSignup={showSignup} />
    </>
  )
}
