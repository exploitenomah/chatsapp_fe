import AppHead from '@components/Custom/Head'
import Hero from '@components/Custom/Hero'

export default function Home({ token }: { token: string }) {
  if (token) return null

  return (
    <>
      <AppHead title='ChatsApp' />
      <Hero />
    </>
  )
}
